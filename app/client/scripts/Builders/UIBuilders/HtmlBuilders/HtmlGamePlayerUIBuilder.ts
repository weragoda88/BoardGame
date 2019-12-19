import { Color } from "../../../Enums/ColorEnum";
import { _ } from "../../../helper";
import { GamePlayer } from "../../../Models/GamePlayer";
import { Pipe } from "../../../Models/Pipe";
import { IGamePlayerUIBuilder } from "../IUIBuilders";

export class HtmlGamePlayerUIBuilder implements IGamePlayerUIBuilder {
    public updateScore(player: GamePlayer): void {
        _.lg("UpdateScore ", player);
        const scoreSpan = _.el(_.getPlayerScoreElementId(player.getId()));
        scoreSpan.innerHTML = `${player.getScore()}`;
    }
    public move(score: number, player: GamePlayer): void {
        _.lg("Moving player ", player);
        const toCell = _.el(_.getCellElementId(score));
        let playerElement = _.el(_.getPlayerElementId(player.getId()));
        if (!playerElement) {
            playerElement = this.createPlayerElement(player);
        } else {
            //
            playerElement.remove();
        }
        toCell.appendChild(playerElement);
    }
    public moveWithPipe(score: number, player: GamePlayer, pipe: Pipe): void {
        _.lg("moveWithPipe");
    }
    private createPlayerElement(player: GamePlayer): Element {
        return _.create(`<span class="player avatar ${Color[player.color]}" id="${_.getPlayerElementId(player.getId())}"></span>`);
    }
}
