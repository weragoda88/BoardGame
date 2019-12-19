import { IPipeUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { PipeType } from "../Enums/PipeEnum";
import { Base } from "./BaseModel";

export class Pipe extends Base {
    protected fromIndex: number;
    protected toIndex: number;
    protected pripeType: PipeType;
    private pipeUIBuilder: IPipeUIBuilder;
    constructor(id: string, title: string, fromIndex: number, toIndex: number, pripeType: PipeType,
                pipeUIBuilder: IPipeUIBuilder) {
        super(id, title);
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.pripeType = pripeType;
        this.pipeUIBuilder = pipeUIBuilder;
    }
    public isFromIndex(index: number): boolean {
        return this.fromIndex === index;
    }
    public getToIndex(index: number): number {
        if (this.isFromIndex(index)) {
            return this.toIndex;
        }
        return 0;
    }
    public draw(): void {
        this.pipeUIBuilder.drawPipe(this);
    }
    public move(fromIndex: number, toIndex: number): void {
        this.fromIndex = fromIndex;
        this.toIndex = toIndex;
        this.pipeUIBuilder.movePipe(this.id, fromIndex, toIndex);

    }
}
