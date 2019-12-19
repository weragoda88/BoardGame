import { BoardBuilder } from "./Builders/BoardBuilder";
import { HtmlBoardUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlBoardUIBuilder";
import { HtmlDiceUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlDiceUIBuilder";
import { HtmlGamePlayerUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlGamePlayerUIBuilder";
import { HtmlGameUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlGameUIBuilder";
import { HtmlPipeUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlPipeUIBuilder";
import { HtmlUIBuilder } from "./Builders/UIBuilders/HtmlBuilders/HtmlUIBuilder";
import { Color } from "./Enums/ColorEnum";
import { LadderType, SnakeType } from "./Enums/PipeEnum";
import { _ } from "./helper";
import { Dice } from "./Models/Dice";
import { Game } from "./Models/Game";
import { GamePlayer } from "./Models/GamePlayer";
import { Ladder } from "./Models/Ladder";
import { Pipe } from "./Models/Pipe";
import { Player } from "./Models/Player";
import { Snake } from "./Models/Snake";
import { GameSocketClient } from "./WebSockets/GameSocketClient";

function buildGame(game: Game) {
    game.start();
    game.setNextPlayer("1");
}
function getHtmlUIBuilder(userId: string): HtmlUIBuilder {
    const gameSocketClient = new GameSocketClient("ws://localhost:8080/");
    return new HtmlUIBuilder(gameSocketClient, userId, _.el("container"));
}
function start(gameId: string, uiBuilder: HtmlUIBuilder, players: GamePlayer[]) {
    uiBuilder.buildGame(gameId, players);
}
function join(id: string, userId: string) {
    _.lg(id);
    const uiBuilder = getHtmlUIBuilder(userId);
    start(id, uiBuilder, [uiBuilder.getPlayer(userId, Color.Red)]);
}
const urlParams = new URLSearchParams(window.location.search);
const uId = urlParams.get("userId") || "1";
if (urlParams.has("id")) {
    join(urlParams.get("id"), uId);
} else {
    start("1", getHtmlUIBuilder(uId), []);
}
