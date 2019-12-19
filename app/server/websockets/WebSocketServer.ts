import WebSocket from "ws";

export interface IExtWebSocket extends WebSocket {
    isAlive: boolean;
}
export class WebSocketServer extends WebSocket.Server {
    public groups: Map<string, Set<IExtWebSocket>>;
    public users: Map<string, Set<IExtWebSocket>>;

    constructor(options: WebSocket.ServerOptions) {
        super(options);
        this.listen();
        this.startCleanup();
    }
    public removeUser(userId: string): void {
        const user = this.getUser(userId);
        user.forEach((client: IExtWebSocket) => {
            client.terminate();
        });
        this.users.delete(userId);
    }
    public sendToGroup(event: string, name: string, data: any): void {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.forEach((client: IExtWebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    public sendToGroupExcept(event: string, name: string, data: any, except: IExtWebSocket): void {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.forEach((client: IExtWebSocket) => {
            if (client !== except && client.readyState === WebSocket.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    public sendToAll(event: string, data: any): void {
        this.clients.forEach((client: IExtWebSocket) => {
            if (client.readyState === WebSocket.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    public sendToOthers(event: string, data: any, except: IExtWebSocket): void {
        this.clients.forEach((client: IExtWebSocket) => {
            if (client !== except && client.readyState === WebSocket.OPEN) {
                this.send(event, data, client);
            }
        });
    }
    public send(event: string, data: any, client: IExtWebSocket): void {
        client.send(JSON.stringify({event, data}));
    }

    private startCleanup(): void {
        setInterval(() => {
            if (!this.clients) {
                return;
            }
            this.clients.forEach((client: IExtWebSocket) => {
                if (!client.isAlive) {
                    return client.terminate();
                }
                client.isAlive = false;
                client.ping();
            });
        }, 10000);
    }
    private getGroups(client: IExtWebSocket): Set<string> {
        const groupNames: Set<string> = new Set<string>();
        if (!this.groups) {
            return groupNames;
        }
        this.groups.forEach((values: Set<IExtWebSocket>, key: string) => {
            if (values.has(client)) {
                groupNames.add(key);
            }
        });
        return groupNames;
    }
    private listen() {
        this.on("connection", (ws: IExtWebSocket, request: any) => {
            const userId = request.session ? request.session.userId : null;
            let user: any = null;
            if (userId) {
                user = this.getUser(userId);
                if (!user) {
                    this.users.set(userId, new Set<IExtWebSocket>());
                }
                user.add(ws);
            }
            ws.isAlive = true;
            ws.on("pong", () => {
                ws.isAlive = true;
            });
            ws.on("joinGroup", (name: string) => {
                const group = this.getGroup(name);
                if (!group) {
                    this.groups.set(name, new Set<IExtWebSocket>());
                }
                group.add(ws);
            });
            ws.on("leaveGroup", (name: string) => {
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
    private leaveGroups(client: IExtWebSocket) {
        this.getGroups(client).forEach((groupName: string) => {
            this.leaveGroup(groupName, client);
        });
    }
    private leaveGroup(name: string, client: IExtWebSocket) {
        const group = this.getGroup(name);
        if (!group) {
            return;
        }
        group.delete(client);
    }
    private getGroup(name: string): Set<IExtWebSocket> {
        return this.groups.has(name) ? this.groups.get(name) : null;
    }
    private getUser(id: string): Set<IExtWebSocket> {
        return this.users.has(id) ? this.users.get(id) : null;
    }
}
