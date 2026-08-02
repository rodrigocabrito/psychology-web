import { z } from "zod";

export const PERIODS = ["manha", "tarde", "noite"] as const;

export const appointmentSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indique o seu nome.")
    .max(100, "Nome demasiado longo."),
  email: z.email("Indique um email válido."),
  phone: z.string().trim().max(40, "Telefone demasiado longo.").optional(),
  periods: z.array(z.enum(PERIODS)).optional().default([]),
  message: z.string().trim().max(2000, "Mensagem demasiado longa.").optional(),
  consent: z
    .boolean()
    .refine((v) => v === true, "É necessário aceitar a política de privacidade."),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;
