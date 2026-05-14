# Signal Chef - Cosmic Kitchen & Mixed Frequencies

Signal Chef is a fun, colorful, and satisfying cooking + signal mixing game built on the Base Mainnet.

You are a **Signal Chef** who runs a cosmic kitchen. Collect different signals (radio waves, data streams, memes, frequencies) and combine them in creative recipes to cook powerful "Signal Dishes" that spread across the universe.

## Core Features
1. **Signal Fusion Gameplay**: Drag & drop various signals (WiFi, 5G, Meme, Quantum, Ancient Radio) to mix and cook them.
2. **On-Chain Components**: Real Web3 integration (Wagmi + Viem + Base).
3. **ERC-8021 Attribution**: Full build attribution via ERC-8021 using builder code.
4. **ERC-8004 Trustless Agents / MCP Integration**: This platform natively features a built-in Agent via `public/.well-known/agent-card.json` and Model Context Protocol (MCP) APIs located under `/api/mcp` and `/api/agent`.

## Web3 Configuration / Sensitive Information
- The game targets the **Base** chain (Chain Validation, SIWE, and Attributions).
- Agent Wallet Address: `0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6`
- Agent capabilities involve `signal-cooking`, `recipe-creation`, `multi-signal-orchestration`, and `mcp-command-execution`.
- Builder Code: `bc_gt6nfpi5`

## Agent Documentation (AI / MCP APIs)

The Signal Chef Orchestrator Agent APIs are hosted directly on this platform to allow interoperability.

### 1. Agent Discovery (.well-known)
File: `public/.well-known/agent-card.json`
Endpoint: `GET /.well-known/agent-card.json`
Standard ERC-8004 definition of the Signal Chef Orchestrator, its capabilities, and active wallets.

### 2. General Agent API
File: `app/api/agent/route.ts`
Endpoint: `GET /api/agent`
Returns the status, wallet, and basic identification information of the Agent.

### 3. MCP API
File: `app/api/mcp/route.ts`
Endpoint: `GET /api/mcp` - Returns Agent's MCP capability descriptions.
Endpoint: `POST /api/mcp` - Executes MCP commands on behalf of the agent (e.g. `action: "execute"`, `command: "Quantum Singularity"`).

## Running The Project

```bash
# Start development server
npm run dev

# Build for production
npm run build
npm run start
```
