import { _ } from "../../../helper";
import { Dice } from "../../../Models/Dice";
import { IDiceUIBuilder } from "../IUIBuilders";

export class HtmlDiceUIBuilder implements IDiceUIBuilder {
    public drawDice(dice: Dice): void {
        _.lg("Drawing dice", dice);
        const container = _.el(_.getDiceHolderElementId());
        const html = _.create(`<span class="dice" title="Dice"
         id="${_.getDiceElementId(dice.getId())}">1</span>`);
        container.prepend(html);
    }
    public startRollingDice(dice: Dice): void {
        _.lg("Dice rolling", dice);
    }
    public endRollingDice(dice: Dice, value: number): void {
        _.lg("Dice rolling ended", dice);
        const diceSpan = _.el(_.getDiceElementId(dice.getId()));
        diceSpan.innerHTML = `${value}`;
    }
}
