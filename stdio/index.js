import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Weather Data Fetcher",
  version: "1.0.0",
});

async function getWeatherDataByCityName(city = "") {
  if (city.toLowerCase() === "mumbai") {
    return { temp: "30C", forecast: "Possibilities of Rain" };
  }

  if (city.toLowerCase() === "bangalore") {
    return { temp: "20C", forecast: "Cold" };
  }

  return { temp: null, error: "unable to fetch data" };
}

// tool
server.tool(
  "getWeatherDataByCityName",
  { city: z.string() }, // input
  async ({ city }) => {
    // API will happen here
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(await getWeatherDataByCityName(city)),
        },
      ],
    };
  }
);

async function init() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

init();
