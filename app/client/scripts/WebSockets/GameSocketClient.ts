import { IUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { _ } from "../helper";
import { Player } from "../Models/Player";
import { WebSocketClient } from "./WebSocketClient";

export class GameSocketClient extends WebSocketClient {
    public uiBuilder: IUIBuilder;
    constructor(url: string) {
        super(url);
        this.initMethods();
    }
    private initMethods(): void {
        this.methods = {
            sendMsg(data: any) {
                _.lg("sendMsg", data);
            },
            playerJoined(player: Player) {
                this.uiBuilder.playerJoined();
                _.lg("playerJoined", player);
            },
            startGame() {
                this.uiBuilder.startGame();
                _.lg("startGame");
            },
            nextPlayer(player: Player) {
                this.uiBuilder.nextPlayer();
                _.lg("nextPlayer", player);
            },
            startPlaying(player: Player) {
                this.uiBuilder.startPlaying();
                _.lg("startPlaying", player);
            },
            startRolling(player: Player) {
                this.uiBuilder.startRolling();
                _.lg("startRolling", player);
            },
            endRolling(player: Player) {
                this.uiBuilder.endRolling();
                _.lg("endRolling", player);
            },
            movePlayer(player: Player) {
                this.uiBuilder.movePlayer();
                _.lg("movePlayer", player);
            },
            movePlayerWithPipe(player: Player) {
                this.uiBuilder.movePlayerWithPipe();
                _.lg("movePlayerWithPipe", player);
            },
            setScore(player: Player) {
                this.uiBuilder.setScore();
                _.lg("setScore", player);
            },
            endGame(winner: Player) {
                this.uiBuilder.endGame();
                _.lg("endGame", winner);
            }
        };
    }
}
