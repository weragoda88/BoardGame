import { IGameUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { _ } from "../helper";
import { Base } from "./BaseModel";
import { Board } from "./Board";
import { Dice } from "./Dice";
import { GamePlayer } from "./GamePlayer";

export class Game extends Base {
    private board: Board;
    private players: GamePlayer[];
    private dice: Dice;
    private nextPlayerIndex: number;
    private gameBuilder: IGameUIBuilder;
    constructor(id: string, title: string, board: Board, dice: Dice, palyers: GamePlayer[],
                gameBuilder: IGameUIBuilder) {
        super(id, title);
        this.players = palyers;
        this.board = board;
        this.dice = dice;
        this.nextPlayerIndex = -1;
        this.gameBuilder = gameBuilder;
    }
    public getBoard(): Board {
        return this.board;
    }
    public getDice(): Dice {
        return this.dice;
    }
    public getPlayers(): GamePlayer[] {
        return this.players;
    }
    public start(): void {
        this.gameBuilder.drawGame(this);
    }
    public addPlayer(player: GamePlayer): void {
        this.players.push(player);
    }
    public setNextPlayer(nextPlayerId: string) {
        const player = this.getPlayer(nextPlayerId);
        if (!player) {
            throw Error(`No player with this id: ${nextPlayerId}`);
        }
        this.nextPlayerIndex = this.players.indexOf(player);
    }
    public play(): void {
        if (this.nextPlayerIndex < 0) {
            throw Error("Next player not set");
        }
        const player = this.players[this.nextPlayerIndex];
        const diceValue = this.dice.roll();
        let tempScore = player.getScore() + diceValue;
        if (tempScore > 100) {
            return;
        } else if (tempScore === 100) {
            alert(`${player.getTitle()} won.`);
        }
        _.lg("Playing", player);
        player.move(tempScore);
        const pipe = this.board.getMatchingPipe(tempScore);
        if (pipe) {
            tempScore = pipe.getToIndex(tempScore);
            player.moveWithPipe(tempScore, pipe);
        }
        player.setScore(tempScore);
    }
    public setNextPlayerIndex(): GamePlayer {
        this.nextPlayerIndex++;
        if (this.nextPlayerIndex === this.players.length) {
            this.nextPlayerIndex = 0;
        }
        return this.players[this.nextPlayerIndex];
    }
    private getPlayer(id: string): GamePlayer {
        return this.players.find((p) => p.getId() === id);
    }
}
