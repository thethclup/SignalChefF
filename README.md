# Signal Chef - Cosmic Kitchen & Mixed Frequencies

Signal Chef Orchestrator is a High-performance AI Agent specialized in signal cooking mechanics, real-time recipe automation, multi-frequency management, competitive optimization, and cosmic ecosystem coordination on the Base blockchain.

## Project Overview

You are a **Signal Chef** who runs a cosmic kitchen. Collect different signals (radio waves, data streams, memes, frequencies) and combine them in creative recipes to cook powerful "Signal Dishes" that spread across the universe.

## Tech Stack
- Frontend: React + Vite + Tailwind CSS
- Blockchain: Wagmi + Viem
- Agent Capabilities: Model Context Protocol (MCP) + ERC-8004 + ERC-8021
- Backend API Integration: App Router Serverless endpoints (Deployable to Vercel)

## Skills & Capabilities
- **Signal Cooking**: Real-time signal mixing and fusion mechanics, speed optimization and competitive recipe management.
- **Multi-Frequency Orchestration**: Manage and synchronize multiple signal instances and cooking stations simultaneously.
- **Flavor Optimization**: Analyze and optimize cooking performance, timing and creative strategy in real-time.

Additional capabilities: `real-time-automation`, `competitive-orchestration`, `ecosystem-coordination`

## Agent Registration Info

This project fully supports ERC-8004 Trustless Agents via the standard `agent-card.json` specification:

- **Supported Chains**: `eip155:8453` (Base Mainnet)
- **Agent Card URL**: `https://signalchef.vercel.app/.well-known/agent-card.json`

## Model Context Protocol (MCP) Connection Guide

The Signal Chef Orchestrator integrates the Model Context Protocol (MCP) allowing deep tool usage, execution, and inspection.

- **MCP Endpoint**: `POST /api/mcp` and `GET /api/mcp`
- **Agent Control API**: `GET /api/agent` and `POST /api/agent`
- **Capabilities provided over MCP**: Tools, Actions, Executions, and Environment reading.

The API exposes an App Router compatible endpoint natively to integrate with Next.js or Vercel edge/serverless functions.

## How to Run Locally

If you clone this repository and want to run it on your local environment:

```bash
# 1. Install dependencies
npm install

# 2. Start development server (runs both Vite and local API proxy)
npm run dev

# 3. Build for production
npm run build
npm run start
```

