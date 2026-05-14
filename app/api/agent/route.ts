import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: "Signal Chef Orchestrator",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Signal Chef",
    version: "1.0.0"
  });
}
