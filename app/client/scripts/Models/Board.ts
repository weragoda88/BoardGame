import { IBoardUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { Base } from "./BaseModel";
import { Pipe } from "./Pipe";

export class Board extends Base {
    private width: number;
    private height: number;
    private pipes: Pipe[];
    private boardUIBuilder: IBoardUIBuilder;
    constructor(id: string, title: string, boardUIBuilder: IBoardUIBuilder) {
        super(id, title);
        this.boardUIBuilder = boardUIBuilder;
    }
    public getWidth(): number {
        return this.width;
    }
    public getHeight(): number {
        return this.height;
    }
    public setSize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
    public setPipes(pipes: Pipe[]) {
        this.pipes = pipes;
    }
    public draw() {
        this.drawBoard();
        this.drawPipes();
    }
    public getMatchingPipe(index: number): Pipe {
        return this.pipes.find((p) => p.isFromIndex(index));
    }
    public getCellColor(): string {
        const num = Math.floor(Math.random() * 10) + 1;
        switch (num) {
            case 1: return "color1";
            case 2: return "color2";
            case 3: return "color3";
            case 4: return "color4";
            case 5: return "color5";
            case 6: return "color6";
            case 7: return "color7";
            case 8: return "color8";
            case 9: return "color9";
            default:
                return "color10";
        }
    }
    private drawBoard() {
        this.boardUIBuilder.drawBoard(this);
    }
    private drawPipes() {
        this.pipes.forEach((pipe: Pipe) => {
            pipe.draw();
        });
    }
}
