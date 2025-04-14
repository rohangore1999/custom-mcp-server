# MCP Weather Data Fetcher - STDIO Implementation

This directory contains a weather data fetcher implemented using the Model Context Protocol (MCP) with STDIO transport.

## Overview

The STDIO implementation uses standard input/output streams for communication, making it suitable for integration with applications that can spawn child processes and communicate via stdin/stdout.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Run the server:
   ```
   node index.js
   ```

## MCP Configuration

In your MCP configuration file (`~/.cursor/mcp.json`), add the following:

```json
"weather-data-fetcher": {
  "command": "node",
  "args": ["/absolute/path/to/mcp/stdio/index.js"]
}
```

Replace `/absolute/path/to/mcp/stdio/index.js` with the actual path to your `index.js` file.

## Implementation Details

The server is implemented using the `@modelcontextprotocol/sdk` package and provides a tool to fetch weather data:

- Tool: `getWeatherDataByCityName`
- Parameter: `city` (string)
- Returns: Weather information in JSON format

Currently supported cities:

- Mumbai: Returns temperature and forecast data
- Bangalore: Returns temperature and forecast data
- Other cities: Returns an error message

## Usage Example

When properly configured, an MCP client can invoke the tool:

```javascript
const result = await client.invokeFunction("getWeatherDataByCityName", {
  city: "Mumbai",
});
// Returns: { temp: "30C", forecast: "Possibilities of Rain" }
```
