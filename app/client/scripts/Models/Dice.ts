import { IDiceUIBuilder } from "../Builders/UIBuilders/IUIBuilders";
import { Base } from "./BaseModel";

export class Dice extends Base {
    private max: number;
    private diceUiBuilder: IDiceUIBuilder;
    constructor(id: string, title: string, max: number, diceUiBuilder: IDiceUIBuilder) {
        super(id, title);
        this.max = max;
        this.diceUiBuilder = diceUiBuilder;
    }
    public draw(): void {
        this.diceUiBuilder.drawDice(this);
    }
    public roll(): number {
        this.diceUiBuilder.startRollingDice(this);
        let value = Math.floor(Math.random() * Math.floor(this.max));
        if (value === 0) {
            value = 1;
        }
        this.diceUiBuilder.endRollingDice(this, value);
        return value;
    }
}
