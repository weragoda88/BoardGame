import { Board } from "../../Models/Board";
import { Dice } from "../../Models/Dice";
import { Game } from "../../Models/Game";
import { GamePlayer } from "../../Models/GamePlayer";
import { Pipe } from "../../Models/Pipe";
export interface IUIBuilder {
    buildGame(gameId: string, players: GamePlayer[]): void;

    playerJoined(): void;
    startGame(): void;
    nextPlayer(): void;
    startPlaying(): void;
    startRolling(): void;
    endRolling(): void;
    movePlayer(): void;
    movePlayerWithPipe(): void;
    setScore(): void;
    endGame(): void;
}
export interface IGameUIBuilder {
    drawGame(game: Game ): void;
}
export interface IBoardUIBuilder {
    drawBoard(board: Board): void;
}
export interface IPipeUIBuilder {
    drawPipe(pipe: Pipe): void;
    movePipe(id: string, fromIndex: number, toIndex: number): void;
}
export interface IDiceUIBuilder {
    drawDice(dice: Dice): void;
    startRollingDice(dice: Dice): void;
    endRollingDice(dice: Dice, value: number): void;
}
export interface IGamePlayerUIBuilder {
    move(score: number, player: GamePlayer): void;
    moveWithPipe(score: number, player: GamePlayer, pipe: Pipe): void;
    updateScore(player: GamePlayer): void;
}
