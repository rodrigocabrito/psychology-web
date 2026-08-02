import { NextResponse } from "next/server";
import { Resend } from "resend";
import { FieldValue } from "firebase-admin/firestore";
import { appointmentSchema } from "@/lib/schema";
import { getDb } from "@/lib/firebaseAdmin";
import { buildAppointmentEmail } from "@/lib/appointmentEmail";

export const runtime = "nodejs";

export async function POST(req: Request) {
  // 1. Parse and validate the request body.
  let data;
  try {
    const parsed = appointmentSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos.", issues: parsed.error.flatten() },
        { status: 400 },
      );
    }
    data = parsed.data;
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }

  let stored = false;
  let emailed = false;

  // 2. Store the request in Firestore (if configured).
  const db = getDb();
  if (db) {
    try {
      await db.collection("appointments").add({
        name: data.name,
        email: data.email,
        phone: data.phone ?? "",
        modality: data.modality,
        preferredTime: data.preferredTime ?? "",
        message: data.message ?? "",
        createdAt: FieldValue.serverTimestamp(),
      });
      stored = true;
    } catch (err) {
      console.error("[appointment] Firestore error:", err);
    }
  }

  // 3. Send the notification email (if configured).
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL;
  const fromEmail = process.env.FROM_EMAIL ?? "onboarding@resend.dev";
  if (resendKey && toEmail) {
    try {
      const resend = new Resend(resendKey);
      const { subject, html, text } = buildAppointmentEmail(data);
      await resend.emails.send({
        from: `Website <${fromEmail}>`,
        to: toEmail,
        replyTo: data.email,
        subject,
        html,
        text,
      });
      emailed = true;
    } catch (err) {
      console.error("[appointment] Resend error:", err);
    }
  }

  // 4. If nothing was configured/worked, report a server error.
  if (!stored && !emailed) {
    return NextResponse.json(
      {
        error:
          "Não foi possível processar o pedido. Tente novamente mais tarde.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
