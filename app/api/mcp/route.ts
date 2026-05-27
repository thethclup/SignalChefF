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
    protocol: "MCP",
    version: "1.0.0",
    name: "Signal Chef MCP Endpoint",
    status: "active",
    description: "Active MCP server for Signal Chef Orchestrator Agent",
    tools: [
      {
        name: "get_race_status",
        description: "Get the current status of the warp race.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "start_race",
        description: "Start a new warp race.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "get_leaderboard",
        description: "Get the current leaderboard of the race track.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "optimize_speed",
        description: "Optimize speed for the current race.",
        inputSchema: { type: "object", properties: {}, required: [] }
      },
      {
        name: "get_track_info",
        description: "Get information about the current race track.",
        inputSchema: { type: "object", properties: {}, required: [] }
      }
    ],
    prompts: [
      { name: "daily_special", description: "Request the daily special signal recipe." },
      { name: "kitchen_status", description: "Review current open tickets and station status." }
    ],
    resources: [
      { uri: "signal://kitchen/status", name: "Kitchen Status", description: "Current status of the cosmic kitchen and active stations" }
    ],
    capabilities: ["signal-cooking", "real-time-automation", "multi-frequency-management", "flavor-optimization", "competitive-orchestration", "ecosystem-coordination"],
    timestamp: new Date().toISOString()
  }, {
    headers: corsHeaders()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    const { jsonrpc, id, method, params } = body;

    // Handle MCP protocol initialization and tool listing
    if (jsonrpc === "2.0" || method) {
      if (method === "initialize") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            protocolVersion: "2024-11-05",
            capabilities: {
              tools: {},
              prompts: {},
              resources: {}
            },
            serverInfo: {
              name: "Signal Chef Orchestrator",
              version: "1.0.0"
            }
          }
        }, { headers: corsHeaders() });
      }

      if (method === "tools/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            tools: [
              {
                name: "get_race_status",
                description: "Get the current status of the warp race.",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "start_race",
                description: "Start a new warp race.",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "get_leaderboard",
                description: "Get the current leaderboard of the race track.",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "optimize_speed",
                description: "Optimize speed for the current race.",
                inputSchema: { type: "object", properties: {}, required: [] }
              },
              {
                name: "get_track_info",
                description: "Get information about the current race track.",
                inputSchema: { type: "object", properties: {}, required: [] }
              }
            ]
          }
        }, { headers: corsHeaders() });
      }

      if (method === "prompts/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            prompts: [
              { name: "daily_special", "description": "Request the daily special signal recipe." },
              { name: "kitchen_status", "description": "Review current open tickets and station status." }
            ]
          }
        }, { headers: corsHeaders() });
      }

      if (method === "resources/list") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            resources: [
              { uri: "signal://kitchen/status", name: "Kitchen Status", description: "Current status of the cosmic kitchen and active stations" }
            ]
          }
        }, { headers: corsHeaders() });
      }

      if (method === "tools/call") {
        return NextResponse.json({
          jsonrpc: "2.0",
          id,
          result: {
            content: [
              { type: "text", text: `Tool ${params?.name || 'unknown'} executed successfully.` }
            ]
          }
        }, { headers: corsHeaders() });
      }
    }

    // Fallback for direct agent API requests
    const { action, command, params: fallbackParams } = body || {};
    let result: any = {};

    switch (action || command) {
      case "status":
      case "ping":
        result = { 
          status: "online", 
          agent: "Signal Chef Orchestrator",
          message: "Kitchen is hot - Ready to cook signals!" 
        };
        break;

      case "execute":
        result = {
          success: true,
          recipe: command || fallbackParams,
          executedAt: new Date().toISOString(),
          message: "Signal recipe cooked successfully"
        };
        break;

      case "get_info":
        result = {
          name: "Signal Chef Orchestrator",
          wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
          platform: "Base",
          version: "1.0.0"
        };
        break;

      default:
        result = {
          success: true,
          message: "Command received by Signal Chef",
          data: body
        };
    }

    return NextResponse.json({
      status: "success",
      agent: "Signal Chef Orchestrator",
      response: result,
      receivedAt: new Date().toISOString()
    }, { headers: corsHeaders() });

  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "Failed to process MCP command"
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
