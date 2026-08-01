# psychology-web

Website da prática de psicologia — página **Sobre mim** e formulário para
**Marcar consulta**. Construído com Next.js, alojado na Vercel, com Firebase
(Firestore) para guardar os pedidos e Resend para enviar o email de aviso.

## Stack

- **Next.js** (App Router, TypeScript)
- **Tailwind CSS** (estilos)
- **Firebase Admin / Firestore** (guarda os pedidos de consulta)
- **Resend** (envia o email de notificação)
- **Vercel** (alojamento)

## Desenvolvimento

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Variáveis de ambiente

Copia `.env.example` para `.env.local` e preenche os valores. As mesmas
variáveis têm de ser adicionadas no painel da Vercel (Project → Settings →
Environment Variables).

| Variável | Para quê |
| --- | --- |
| `RESEND_API_KEY` | Chave da API do Resend |
| `CONTACT_EMAIL` | Email que recebe os pedidos |
| `FROM_EMAIL` | Remetente (`onboarding@resend.dev` para testes) |
| `FIREBASE_PROJECT_ID` | Projeto Firebase |
| `FIREBASE_CLIENT_EMAIL` | Email da service account |
| `FIREBASE_PRIVATE_KEY` | Chave privada da service account |

## Estrutura

- `src/config/site.ts` — nome, contactos e textos base (editar aqui).
- `src/app/page.tsx` — página inicial / Sobre mim.
- `src/app/marcar-consulta/` — página com o formulário.
- `src/app/api/appointment/route.ts` — recebe o formulário, guarda no
  Firestore e envia o email.
