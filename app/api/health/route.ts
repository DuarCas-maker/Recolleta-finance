export const dynamic = "force-static";

export function GET() {
  return Response.json({
    ok: true,
    app: "recolleta-financial",
    status: "healthy"
  });
}
