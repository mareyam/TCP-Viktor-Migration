import { NextResponse } from "next/server";
import { handleDailyRequest } from "@/lib/uspto/handlers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const result = handleDailyRequest({
    authorization: request.headers.get("authorization"),
    now: new Date().toISOString(),
  });
  return NextResponse.json(result.body, { status: result.status });
}
