import { NextResponse } from "next/server";
import { usptoFlags } from "@/lib/uspto/flags";
import { handleLookupRequest } from "@/lib/uspto/handlers";
import { getServerTenantId } from "@/lib/uspto/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const result = await handleLookupRequest({
    flags: usptoFlags(),
    tenantId: await getServerTenantId(),
    body,
  });
  return NextResponse.json(result.body, { status: result.status });
}
