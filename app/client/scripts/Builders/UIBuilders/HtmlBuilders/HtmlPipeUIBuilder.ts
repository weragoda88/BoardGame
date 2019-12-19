import { _ } from "../../../helper";
import { Pipe } from "../../../Models/Pipe";
import { IPipeUIBuilder } from "../IUIBuilders";

export class HtmlPipeUIBuilder implements IPipeUIBuilder {
    public drawPipe(pipe: Pipe): void {
        _.lg("Drawing pipe ", pipe);
    }
    public movePipe(id: string, fromIndex: number, toIndex: number): void {
        _.lg(`Moveing ${id} to ${fromIndex} ${toIndex}`);
    }
}
