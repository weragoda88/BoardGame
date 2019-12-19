import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import uuid from "uuid";

import * as http from "http";
import path from "path";
import * as sessionAuth from "./middleware/sessionAuth";
import * as routes from "./routes";
import { BoardWebSocket } from "./websockets/boardSocket";
// initialize configuration
dotenv.config();
// port is now available to the Node.js runtime
// as if it were an environment variable
const allowGuests = true;
const port = process.env.SERVER_PORT;
const app = express();
//
// We need the same instance of the session parser in express and
// WebSocket server.
//
const sessionParser = session({
  resave: false,
  saveUninitialized: false,
  secret: "$eCuRiTy"
});

// Configure Express to use static files
app.use(express.static(path.join(__dirname, "client"), {
  etag: false
}));
app.use(sessionParser);
const server = http.createServer(app);
const webSocketServer = new BoardWebSocket({ clientTracking: true, noServer: true });
app.post("/login", (req, res) => {
  console.log("login");
  //
  // "Log in" user and set userId to session.
  //
  const id = uuid.v4();
  console.log(`Updating session for user ${id}`);
  req.session.userId = id;
  res.send({ result: "OK", message: "Session updated" });
});

app.delete("/logout", (request, response) => {
  console.log("Destroying session");
  request.session.destroy(() => {
    webSocketServer.removeUser(request.session.userId);
    response.send({ result: "OK", message: "Session destroyed" });
  });
});

server.on("upgrade", (request, socket, head) => {
  console.log("Parsing session from request...");
  request.res = {};
  sessionParser(request, request.res , () => {
    if (!allowGuests && !request.session.userId) {
      socket.destroy();
      return;
    }
    console.log("Session is parsed!");
    webSocketServer.handleUpgrade(request, socket, head, (ws) => {
      webSocketServer.emit("connection", ws, request);
    });
  });
});

// Configure Express to use EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Configure session auth
sessionAuth.register(app);

// Configure routes
routes.register(app);
webSocketServer.start();
// start the express server
server.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${port}`);
});
