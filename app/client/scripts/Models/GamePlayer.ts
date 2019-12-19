import { IGamePlayerUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { Color } from "../Enums/ColorEnum";
import { Base } from "./BaseModel";
import { Pipe } from "./Pipe";
import { Player } from "./Player";

export class GamePlayer extends Base {
    public color: Color;
    private player: Player;
    private score: number;

    private gamePlayerUIBuilder: IGamePlayerUIBuilder;
    constructor(id: string, title: string, player: Player, color: Color, score: number,
                gamePlayerUIBuilder: IGamePlayerUIBuilder) {
        super(id, title);
        this.player = player;
        this.color = color;
        this.score = score;
        this.gamePlayerUIBuilder = gamePlayerUIBuilder;
    }
    public getScore(): number {
        return this.score;
    }
    public setScore(score: number): void {
        this.score = score;
        this.gamePlayerUIBuilder.updateScore(this);
    }
    public move(score: number): void {
        this.gamePlayerUIBuilder.move(score, this);
    }
    public moveWithPipe(score: number, pipe: Pipe): void {
        this.gamePlayerUIBuilder.moveWithPipe(score, this, pipe);
    }
}
