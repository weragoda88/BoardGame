import { IPipeUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { LadderType, PipeType } from "../Enums/PipeEnum";
import { Pipe } from "./Pipe";
export class Ladder extends Pipe {
    private ladderType: LadderType;
    constructor(id: string, name: string, fromIndex: number, toIndex: number, ladderType: LadderType,
                pipeUIBuilder: IPipeUIBuilder) {
        super(id, name, fromIndex, toIndex, PipeType.Ladder, pipeUIBuilder);
        this.validateIndex(fromIndex, toIndex);
        this.ladderType = ladderType;
    }
    public draw(): void {
        super.draw();
    }
    public move(fromIndex: number, toIndex: number): void {
        this.validateIndex(fromIndex, toIndex);
        super.move(fromIndex, toIndex);
    }
    private validateIndex(fromIndex: number, toIndex: number) {
        if (fromIndex > toIndex) {
            throw new Error("toIndex have to be larger than fromIndex");
        }
    }
}
