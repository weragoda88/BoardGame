
import WebSocket from "ws";

import { IExtWebSocket, WebSocketServer } from "./WebSocketServer";

export class BoardWebSocket extends WebSocketServer {
  constructor(options: WebSocket.ServerOptions) {
    super(options);
  }
  public start(): void {
    this.on("connection", (client: IExtWebSocket) => {
      client.on("message", (message: string) => {
        this.sendToOthers("sendMsg", { val : `Hello, you sent -> ${message}`}, client);
      });
    });
  }
}
