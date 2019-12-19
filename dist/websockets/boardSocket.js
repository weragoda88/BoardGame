"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebSocketServer_1 = require("./WebSocketServer");
class BoardWebSocket extends WebSocketServer_1.WebSocketServer {
    constructor(options) {
        super(options);
    }
    start() {
        this.on("connection", (client) => {
            client.on("message", (message) => {
                this.sendToOthers("sendMsg", { val: `Hello, you sent -> ${message}` }, client);
            });
        });
    }
}
exports.BoardWebSocket = BoardWebSocket;
//# sourceMappingURL=boardSocket.js.map