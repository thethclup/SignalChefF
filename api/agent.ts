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
      name: "Signal Chef Orchestrator",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Signal Chef",
      version: "1.0.0"
    });
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {};
      return res.status(200).json({
        status: "success",
        message: "Agent received payload",
        data: body
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: "Invalid payload"
      });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default allowCors(handler);
