import { NextResponse } from 'next/server';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, HEAD',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };
}

export async function GET() {
  return NextResponse.json({
    name: "Signal Chef Orchestrator",
    status: "active",
    wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
    platform: "Signal Chef",
    version: "1.0.0"
  }, {
    headers: corsHeaders()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    return NextResponse.json({
      status: "success",
      message: "Agent received payload",
      data: body
    }, {
      headers: corsHeaders()
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Invalid payload"
    }, { 
      status: 400,
      headers: corsHeaders()
    });
  }
}

export async function HEAD() {
  return new Response(null, {
    status: 200,
    headers: corsHeaders()
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: corsHeaders()
  });
}
