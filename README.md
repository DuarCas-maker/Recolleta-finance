# RECOLLETA FINANCIAL Website

Independent Next.js App Router site for RECOLLETA FINANCIAL, built with TypeScript, Tailwind CSS, standalone output, and Docker deployment support.

## Scope

- App path: `apps/Recolectta`
- Brand data: `data/site.ts`
- Brand assets: `public/`
- Environment example: `.env.example`
- Health check: `/api/health`

Sensitive application data is kept in React state only. The application does not write funding application details to persistent browser storage.

## Environment

Copy `.env.example` into the deployment environment and set values there.

- `NEXT_PUBLIC_SITE_URL`: production website URL.
- `NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE`: required for calculator estimates. The app does not invent a fallback rate.
- `NEXT_PUBLIC_WEBHOOK_URL`: browser submission endpoint for the direct `no-cors` webhook request.
- `COMMERCIAL_NAME`: commercial routing name mirrored into the JSON v2 payload.
- `COMMERCIAL_EMAIL`: commercial routing email mirrored into the JSON v2 payload.
- `COMMERCIAL_IDENTIFIER`: commercial routing identifier mirrored into the JSON v2 payload.

## Coolify

Use Docker deployment from this app folder.

1. Set build context to `apps/Recolectta` if deploying this app alone.
2. Use the included `Dockerfile`.
3. Configure environment variables in Coolify.
4. Expose port `3000`.
5. Use `/api/health` as the health check path.

The Docker image runs Next.js standalone output with `node server.js`, `PORT=3000`, and `HOSTNAME=0.0.0.0` so Coolify health checks can reach the app inside the container.

## Webhook

Application submissions post directly from the browser to `NEXT_PUBLIC_WEBHOOK_URL`:

`https://n8n.srv939555.hstgr.cloud/webhook/submit-forms-curated`

The webhook request uses:

- `method: "POST"`
- `mode: "no-cors"`
- `Content-Type: text/plain;charset=UTF-8`

Payload settings are `RF-001`, `company: "recolleta"`, `source: "recolleta-financial-web"`, `action: "create"`, `payloadFormat: "json-v2"`, and `status: "New"`.

## Local Commands

From the monorepo root:

```bash
pnpm install
pnpm --filter @santi/recolectta dev
pnpm --filter @santi/recolectta typecheck
pnpm --filter @santi/recolectta build
node tools/check-brand-boundaries.mjs
```

## Production Notes

- Legal pages are draft copy and display `DRAFT — FOR LEGAL REVIEW BEFORE PRODUCTION.`
- Testimonials are sample placeholders and are visibly marked `Sample`.
- Calculator values are illustrative estimates only.
- Form fields follow the attached JSON v2 webhook contract.
