"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
class WebSocketServer extends ws_1.default.Server {
    constructor(options) {
        super(options);
        this.listen();
        this.startCleanup();
    }
    removeUser(userId) {
        const user = this.getUser(userId);
        user.forEach((client) => {
            client.terminate();
        });
        this.users.delete(userId);
    }
    sendToGroup(event, name, data) {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    sendToGroupExcept(event, name, data, except) {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.forEach((client) => {
            if (client !== except && client.readyState === ws_1.default.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    sendToAll(event, data) {
        this.clients.forEach((client) => {
            if (client.readyState === ws_1.default.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    sendToOthers(event, data, except) {
        this.clients.forEach((client) => {
            if (client !== except && client.readyState === ws_1.default.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    send(event, data, client) {
        client.send(JSON.stringify({ event, data }));
    }
    startCleanup() {
        setInterval(() => {
            if (!this.clients) {
                return;
            }
            this.clients.forEach((client) => {
                if (!client.isAlive) {
                    return client.terminate();
                }
                client.isAlive = false;
                client.ping();
            });
        }, 10000);
    }
    getGroups(client) {
        const groupNames = new Set();
        if (!this.groups) {
            return groupNames;
        }
        this.groups.forEach((values, key) => {
            if (values.has(client)) {
                groupNames.add(key);
            }
        });
        return groupNames;
    }
    listen() {
        this.on("connection", (ws, request) => {
            const userId = request.session ? request.session.userId : null;
            let user = null;
            if (userId) {
                user = this.getUser(userId);
                if (!user) {
                    this.users.set(userId, new Set());
                }
                user.add(ws);
            }
            ws.isAlive = true;
            ws.on("pong", () => {
                ws.isAlive = true;
            });
            ws.on("joinGroup", (name) => {
                const group = this.getGroup(name);
                if (!group) {
                    this.groups.set(name, new Set());
                }
                group.add(ws);
            });
            ws.on("leaveGroup", (name) => {
                this.leaveGroup(name, ws);
            });
            ws.on("close", () => {
                this.leaveGroups(ws);
                if (user) {
                    user.delete(ws);
                }
            });
        });
    }
    leaveGroups(client) {
        this.getGroups(client).forEach((groupName) => {
            this.leaveGroup(groupName, client);
        });
    }
    leaveGroup(name, client) {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.delete(client);
    }
    getGroup(name) {
        return this.groups.has(name) ? this.groups.get(name) : null;
    }
    getUser(id) {
        return this.users.has(id) ? this.users.get(id) : null;
    }
}
exports.WebSocketServer = WebSocketServer;
//# sourceMappingURL=WebSocketServer.js.map