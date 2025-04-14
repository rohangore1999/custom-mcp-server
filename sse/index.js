import express from "express";
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

const app = express();

const server = new McpServer(
  {
    name: "example-server",
    version: "1.0.0",
  },
  {
    capabilities: {},
  }
);

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

let transport = null;

app.get("/sse", (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  server.connect(transport);
});

app.post("/messages", (req, res) => {
  if (transport) {
    transport.handlePostMessage(req, res);
  }
});

app.listen(3000);
