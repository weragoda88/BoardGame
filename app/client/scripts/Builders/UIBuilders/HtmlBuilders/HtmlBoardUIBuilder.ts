import { _ } from "../../../helper";
import { Board } from "../../../Models/Board";
import { IBoardUIBuilder } from "../IUIBuilders";

export class HtmlBoardUIBuilder implements IBoardUIBuilder {
    public drawBoard(board: Board): void {
        const container = _.el(_.getBoardElementId(board.getId()));
        _.lg("Drawing board", board);
        container.classList.add("board");
        let count = 1;
        const width = board.getWidth();
        const height = board.getHeight();
        for (let i = 0; i < width; i++) {
            const row = _.create(`<div class="row"></div>`);
            for (let j = 0; j < height; j++) {
                const cell = _.create(`<div class="cell ${board.getCellColor()}" id="${_.getCellElementId(count)}">${count++}</div>`);
                if (i % 2 === 0) {
                    row.append(cell);
                } else {
                    row.prepend(cell);
                }
            }
            container.prepend(row);
        }
    }
}
