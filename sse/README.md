# MCP Weather Data Fetcher - SSE Implementation

This directory contains a weather data fetcher implemented using the Model Context Protocol (MCP) with Server-Sent Events (SSE) transport.

## Overview

The SSE implementation provides weather data through a web server using Server-Sent Events, making it suitable for web-based applications and services that can connect via HTTP.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Run the server:

   ```
   node index.js
   ```

3. The server will start on port 3000 and expose the SSE endpoint at `http://localhost:3000/sse`

## MCP Configuration

In your MCP configuration file (`~/.cursor/mcp.json`), add the following:

```json
"weather-data-fetcher-sse": {
  "url": "http://localhost:3000/sse"
}
```

## Implementation Details

The server is implemented using Express.js and the `@modelcontextprotocol/sdk` package. It provides a tool to fetch weather data:

- Tool: `getWeatherDataByCityName`
- Parameter: `city` (string)
- Returns: Weather information in JSON format

Currently supported cities:

- Mumbai: Returns temperature and forecast data
- Bangalore: Returns temperature and forecast data
- Other cities: Returns an error message

## How It Works

1. The Express server exposes two endpoints:

   - GET `/sse`: Establishes an SSE connection
   - POST `/messages`: Handles incoming messages from clients

2. When a client connects to the SSE endpoint, the server initializes an SSE transport and connects it to the MCP server.

3. Clients can then send requests to the MCP server through the POST endpoint.

## Usage Example

When properly configured, an MCP client can invoke the tool:

```javascript
const result = await client.invokeFunction("getWeatherDataByCityName", {
  city: "Mumbai",
});
// Returns: { temp: "30C", forecast: "Possibilities of Rain" }
```
