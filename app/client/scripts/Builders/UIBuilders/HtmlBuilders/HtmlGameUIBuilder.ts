import { Color } from "../../../Enums/ColorEnum";
import { _ } from "../../../helper";
import { Board } from "../../../Models/Board";
import { Dice } from "../../../Models/Dice";
import { Game } from "../../../Models/Game";
import { GamePlayer } from "../../../Models/GamePlayer";
import { IGameUIBuilder } from "../IUIBuilders";
export class HtmlGameUIBuilder implements IGameUIBuilder {
    private container: Element;
    constructor(container: Element) {
        this.container = container;
    }
    public drawGame(game: Game): void {
        _.lg("Drawing game", game);
        this.drawBoard(game.getBoard());
        this.drawSideBar(game);
        this.drawDice(game.getDice());
        this.drawPlayers(game.getPlayers());
    }
    private drawBoard(board: Board) {
        this.container.append(_.create(`<div id="${_.getBoardElementId(board.getId())}"></div>`));
        board.draw();
    }
    private drawSideBar(game: Game) {
        const diceHolderId = _.getDiceHolderElementId();
        const sidePanel = _.create(`<div id="sidePanel"><div id="${diceHolderId}">
        <input type="button" value="Play"/></div><div><h1>Players</h1><div id="${_.getPlayerHolderElementId()}"></div></div></div>`);
        this.container.append(sidePanel);
        _.listen(_.el(diceHolderId), "click", (e: Event) => { game.play(); game.setNextPlayerIndex(); });

    }
    private drawDice(dice: Dice) {
        dice.draw();
    }
    private drawPlayers(payers: GamePlayer[]) {
        const playerHolder = _.el(_.getPlayerHolderElementId());
        let html = "<ul>";
        payers.forEach((player) => {
            _.lg(player);
            const playerScore = player.getScore();
            const playerId = player.getId();
            html += `<li class="player ${Color[player.color]}">${player.getTitle()} :
             <span id="${_.getPlayerScoreElementId(playerId)}">${playerScore}</span></li>`;
            if (playerScore > 0) {
                player.move(playerScore);
            }
        });
        html += "</ul>";
        playerHolder.append(_.create(html));

    }
}
