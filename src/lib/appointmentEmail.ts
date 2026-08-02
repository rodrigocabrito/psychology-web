import { site } from "@/config/site";

const MODALITY_LABELS: Record<string, string> = {
  presencial: "Presencial",
  online: "Online",
  indiferente: "Indiferente",
};

export type AppointmentEmailData = {
  name: string;
  email: string;
  phone?: string;
  modality: string;
  preferredTime?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function detailRow(label: string, valueHtml: string): string {
  return `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #ece6da;font-size:13px;color:#6f6658;width:150px;vertical-align:top;">${label}</td>
        <td style="padding:12px 0;border-bottom:1px solid #ece6da;font-size:15px;color:#3b3730;vertical-align:top;">${valueHtml}</td>
      </tr>`;
}

/**
 * Builds the notification email (HTML + plain-text fallback) sent to the
 * practitioner when someone requests an appointment.
 */
export function buildAppointmentEmail(data: AppointmentEmailData) {
  const modality = MODALITY_LABELS[data.modality] ?? data.modality;
  const firstName = data.name.split(" ")[0] || data.name;
  const dateStr = new Intl.DateTimeFormat("pt-PT", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "Europe/Lisbon",
  }).format(new Date());

  const subject = `Novo pedido de consulta — ${data.name}`;

  // Plain-text fallback (for clients that don't render HTML).
  const text = [
    `Novo pedido de consulta`,
    ``,
    `Nome: ${data.name}`,
    `Email: ${data.email}`,
    `Telefone: ${data.phone || "—"}`,
    `Modalidade: ${modality}`,
    `Preferência de horário: ${data.preferredTime || "—"}`,
    ``,
    `Mensagem:`,
    data.message || "—",
    ``,
    `Recebido em ${dateStr}`,
  ].join("\n");

  const rows = [
    detailRow(
      "Email",
      `<a href="mailto:${encodeURIComponent(data.email)}" style="color:#566e53;text-decoration:none;">${escapeHtml(data.email)}</a>`,
    ),
    data.phone
      ? detailRow(
          "Telefone",
          `<a href="tel:${escapeHtml(data.phone.replace(/\s/g, ""))}" style="color:#566e53;text-decoration:none;">${escapeHtml(data.phone)}</a>`,
        )
      : "",
    detailRow("Modalidade", escapeHtml(modality)),
    data.preferredTime
      ? detailRow("Preferência de horário", escapeHtml(data.preferredTime))
      : "",
  ].join("");

  const messageBlock = data.message
    ? `
        <tr>
          <td colspan="2" style="padding-top:20px;">
            <div style="font-size:13px;color:#6f6658;margin-bottom:8px;">Mensagem</div>
            <div style="background:#faf8f4;border:1px solid #ece6da;border-radius:10px;padding:16px 18px;font-size:15px;color:#3b3730;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
              data.message,
            )}</div>
          </td>
        </tr>`
    : "";

  const replySubject = encodeURIComponent("Re: o seu pedido de consulta");

  const html = `<!doctype html>
<html lang="pt">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(subject)}</title>
  </head>
  <body style="margin:0;padding:0;background:#f4f1ea;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f1ea;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="width:560px;max-width:100%;background:#ffffff;border:1px solid #ece6da;border-radius:16px;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
            <tr>
              <td style="background:#6f8a6b;padding:28px 32px;">
                <div style="font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#eaf0e8;">${escapeHtml(
                  site.practitionerName,
                )}</div>
                <div style="font-family:Georgia,'Times New Roman',serif;font-size:24px;color:#ffffff;margin-top:6px;">Novo pedido de consulta</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 4px;font-size:15px;color:#6f6658;">Recebeu um novo pedido de</p>
                <p style="margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:22px;color:#3b3730;">${escapeHtml(
                  data.name,
                )}</p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows}
                  ${messageBlock}
                </table>
                <div style="margin-top:28px;text-align:center;">
                  <a href="mailto:${encodeURIComponent(
                    data.email,
                  )}?subject=${replySubject}" style="display:inline-block;background:#6f8a6b;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:13px 24px;border-radius:999px;">Responder a ${escapeHtml(
                    firstName,
                  )}</a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;border-top:1px solid #ece6da;background:#faf8f4;">
                <p style="margin:0;font-size:12px;color:#9a9285;">Recebido em ${escapeHtml(
                  dateStr,
                )} · enviado automaticamente a partir do site de ${escapeHtml(
                  site.practitionerName,
                )}.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return { subject, html, text };
}
