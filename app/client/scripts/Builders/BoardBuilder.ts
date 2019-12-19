
import { Board } from "../Models/Board";
import { Pipe } from "../Models/Pipe";
import { IBoardUIBuilder } from "./UIBuilders/IUIBuilders";

export class BoardBuilder {
    private board: Board;
    constructor(id: string, title: string, boardUIBuilder: IBoardUIBuilder) {
        this.board = new Board(id, title, boardUIBuilder);
    }
    public setSize(width: number, height: number): BoardBuilder {
        this.board.setSize(width, height);
        return this;
    }
    public setPipes(pipes: Pipe[]): BoardBuilder {
        this.board.setPipes(pipes);
        return this;
    }
    public get(): Board {
        return this.board;
    }
}
