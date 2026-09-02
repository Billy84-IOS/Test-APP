import "dotenv/config";
import { createServer } from "node:http";
import { loadEnv } from "./env.js";
import { createApp } from "./app.js";
import { createSocketServer } from "./socket.js";

const env = loadEnv();
const app = createApp(env);
const httpServer = createServer(app);
createSocketServer(httpServer, env);

httpServer.listen(env.PORT, () => {
  console.log(`[server] écoute sur le port ${env.PORT} (${env.NODE_ENV})`);
});
