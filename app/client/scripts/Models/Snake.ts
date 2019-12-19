import { IPipeUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { PipeType, SnakeType } from "../Enums/PipeEnum";
import { Pipe } from "./Pipe";

export class Snake extends Pipe {
    private snakeType: SnakeType;
    constructor(id: string, name: string, fromIndex: number, toIndex: number, snakeType: SnakeType,
                pipeUIBuilder: IPipeUIBuilder) {
        super(id, name, fromIndex, toIndex, PipeType.Snake, pipeUIBuilder);
        this.validateIndex(fromIndex, toIndex);
        this.snakeType = snakeType;
    }
    public draw(): void {
        super.draw();
    }
    public move(fromIndex: number, toIndex: number): void {
        this.validateIndex(fromIndex, toIndex);
        super.move(fromIndex, toIndex);
    }
    private validateIndex(fromIndex: number, toIndex: number) {
        if (fromIndex < toIndex) {
            throw new Error("fromIndex have to be larger than toIndex");
        }
    }
}
