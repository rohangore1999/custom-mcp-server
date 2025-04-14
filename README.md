- `stdio/`: Weather data fetcher using STDIO transport
- `sse/`: Weather data fetcher using Server-Sent Events (SSE) transport

## MCP Configuration

The global MCP configuration is stored in `~/.cursor/mcp.json` and includes:

```json
// stdio
"weather-data-fetcher": {
  "command": "node",
  "args": ["/path/to/mcp/stdio/index.js"]
},

// sse
"weather-data-fetcher-sse": {
  "url": "http://localhost:3000/sse"
}
```
