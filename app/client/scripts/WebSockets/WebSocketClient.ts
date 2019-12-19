import { _ } from "../helper";
export interface IWebSocketMsg {
    event: string;
    data: any;
}
export class WebSocketClient {
    protected connection: WebSocket;
    protected methods: any;
    constructor(url: string) {
        this.connection = new WebSocket(url);
        this.listen();
    }
    protected listen(): void {
        this.connection.onmessage =  (ev: MessageEvent) => {
            const object = JSON.parse(ev.data) as IWebSocketMsg;
            if (object) {
                this.methods[object.event](object.data);
            }
        };
    }
    protected send(): void {
        _.lg("send");

    }
}
