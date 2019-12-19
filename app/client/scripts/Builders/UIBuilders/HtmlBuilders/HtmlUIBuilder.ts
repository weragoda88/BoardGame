import { Color } from "../../../Enums/ColorEnum";
import { LadderType, SnakeType } from "../../../Enums/PipeEnum";
import { _ } from "../../../helper";
import { Dice } from "../../../Models/Dice";
import { Game } from "../../../Models/Game";
import { GamePlayer } from "../../../Models/GamePlayer";
import { Ladder } from "../../../Models/Ladder";
import { Pipe } from "../../../Models/Pipe";
import { Player } from "../../../Models/Player";
import { Snake } from "../../../Models/Snake";
import { GameSocketClient } from "../../../WebSockets/GameSocketClient";
import { BoardBuilder } from "../../BoardBuilder";
import { IBoardUIBuilder, IDiceUIBuilder, IGamePlayerUIBuilder, IGameUIBuilder, IPipeUIBuilder, IUIBuilder } from "../IUIBuilders";
import { HtmlBoardUIBuilder } from "./HtmlBoardUIBuilder";
import { HtmlDiceUIBuilder } from "./HtmlDiceUIBuilder";
import { HtmlGamePlayerUIBuilder } from "./HtmlGamePlayerUIBuilder";
import { HtmlGameUIBuilder } from "./HtmlGameUIBuilder";
import { HtmlPipeUIBuilder } from "./HtmlPipeUIBuilder";
export class HtmlUIBuilder implements IUIBuilder {
    private gameSocketClient: GameSocketClient;
    private currentUserId: string;
    private gameUIBuilder: IGameUIBuilder;
    private boardUIBuilder: IBoardUIBuilder;
    private pipeUIBuilder: IPipeUIBuilder;
    private diceUIBuilder: IDiceUIBuilder;
    private gamePlayerUIBuilder: IGamePlayerUIBuilder;

    private game: Game;

    constructor(gameSocketClient: GameSocketClient, currentUserId: string, container: Element) {
        gameSocketClient.uiBuilder = this;
        this.gameSocketClient = gameSocketClient;
        this.currentUserId = currentUserId;
        this.gameUIBuilder = new HtmlGameUIBuilder(container);
        this.boardUIBuilder = new HtmlBoardUIBuilder();
        this.pipeUIBuilder = new HtmlPipeUIBuilder();
        this.diceUIBuilder = new HtmlDiceUIBuilder();
        this.gamePlayerUIBuilder = new HtmlGamePlayerUIBuilder();
    }
    public buildGame(gameId: string, players: GamePlayer[]): void {
        this.game = new Game(gameId, "test Game", new BoardBuilder("1", "test", this.boardUIBuilder).setSize(10, 10)
        .setPipes(this.getPipes()).get(), new Dice("1", "1", 6, this.diceUIBuilder),
        players.length > 0 ? players : this.getPlayers(), this.gameUIBuilder);
        this.game.start();
        this.game.setNextPlayer(this.currentUserId);
    }
    public getPlayer(id: string, color: Color): GamePlayer {
        return new GamePlayer(id, `Player ${id}`, new Player(id, `Player ${id}`), color, 0, this.gamePlayerUIBuilder);
    }
    public playerJoined(): void {
        _.lg("playerJoined");
    }
    public startGame(): void {
        _.lg("startGame");
    }
    public nextPlayer(): void {
        _.lg("nextPlayer");
    }
    public startPlaying(): void {
        _.lg("startPlaying");
    }
    public startRolling(): void {
        _.lg("startRolling");
    }
    public endRolling(): void {
        _.lg("endRolling");
    }
    public movePlayer(): void {
        _.lg("movePlayer");
    }
    public movePlayerWithPipe(): void {
        _.lg("movePlayerWithPipe");
    }
    public setScore(): void {
        _.lg("setScore");
    }
    public endGame(): void {
        _.lg("endGame");
    }

    private getPipes(): Pipe[] {
        const pipes: Pipe[] = [];
        const pipeBuilder = this.pipeUIBuilder;
        pipes.push(new Snake("1", "Snake 1", 10, 3, SnakeType.Snake1, pipeBuilder));
        pipes.push(new Snake("2", "Snake 2", 35, 7, SnakeType.Snake2, pipeBuilder));
        pipes.push(new Ladder("3", "Ladder 1", 7, 9, LadderType.Ladder1, pipeBuilder));
        return pipes;
    }
    private getPlayers(): GamePlayer[] {
        const players: GamePlayer[] = [];
        players.push(this.getPlayer("1", Color.Red));
        players.push(this.getPlayer("2", Color.Blue));
        return players;
    }

}
