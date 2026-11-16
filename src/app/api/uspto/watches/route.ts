import { NextResponse } from "next/server";
import { usptoFlags } from "@/lib/uspto/flags";
import { handleWatchRequest } from "@/lib/uspto/handlers";
import { getServerTenantId } from "@/lib/uspto/session";
import { getStore } from "@/lib/uspto/watch-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function respond(request: Request, method: "GET" | "POST" | "PATCH" | "DELETE") {
  const body = method === "GET" ? null : await request.json().catch(() => null);
  const result = await handleWatchRequest({
    flags: usptoFlags(),
    tenantId: await getServerTenantId(),
    method,
    body,
    store: getStore(),
  });
  return NextResponse.json(result.body, { status: result.status });
}

export function GET(request: Request) {
  return respond(request, "GET");
}

export function POST(request: Request) {
  return respond(request, "POST");
}

export function PATCH(request: Request) {
  return respond(request, "PATCH");
}

export function DELETE(request: Request) {
  return respond(request, "DELETE");
}
