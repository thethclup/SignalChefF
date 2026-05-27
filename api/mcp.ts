import type { VercelRequest, VercelResponse } from '@vercel/node';

const allowCors = (fn: any) => async (req: VercelRequest, res: VercelResponse) => {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT,HEAD');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS' || req.method === 'HEAD') {
    res.status(200).end();
    return;
  }

  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  if (req.method === 'GET') {
    return res.status(200).json({
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
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      const { jsonrpc, id, method, params } = body;

      // Handle MCP protocol initialization and tool listing
      if (jsonrpc === "2.0" || method) {
        if (method === "initialize") {
          return res.status(200).json({
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
          });
        }

        if (method === "tools/list") {
          return res.status(200).json({
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
          });
        }

        if (method === "prompts/list") {
          return res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              prompts: [
                { name: "daily_special", description: "Request the daily special signal recipe." },
                { name: "kitchen_status", description: "Review current open tickets and station status." }
              ]
            }
          });
        }

        if (method === "resources/list") {
          return res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              resources: [
                { uri: "signal://kitchen/status", name: "Kitchen Status", description: "Current status of the cosmic kitchen and active stations" }
              ]
            }
          });
        }

        if (method === "tools/call") {
          return res.status(200).json({
            jsonrpc: "2.0",
            id,
            result: {
              content: [
                { type: "text", text: `Tool ${params?.name || 'unknown'} executed successfully.` }
              ]
            }
          });
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

      return res.status(200).json({
        status: "success",
        agent: "Signal Chef Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });

    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Failed to process MCP command"
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default allowCors(handler);
