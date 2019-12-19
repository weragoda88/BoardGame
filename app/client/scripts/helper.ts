export const _ = {
    getBoardElementId(id: string): string {
        return `gameBoard-${id}`;
    },
    getDiceHolderElementId(): string {
        return `gameDiceHolder`;
    },
    getDiceElementId(id: string): string {
        return `gameDice-${id}`;
    },
    getPlayerHolderElementId(): string {
        return `playersHolder`;
    },
    getPlayerElementId(id: string): string {
        return `player-${id}`;
    },
    getPlayerScoreElementId(id: string): string {
        return `player-score-${id}`;
    },
    getCellElementId(id: number): string {
        return `cell-${id}`;
    },
    el(id: string): Element {
        return document.getElementById(id);
    },
    lg(...params: any[]) {
        console.log(...params);
    },
    create(html: string): Element {
        const template = document.createElement("template");
        template.innerHTML = html;
        return template.content.firstElementChild;
    },
    listen(element: Element, type: string, func: any) {
        element.addEventListener(type, func);
    }
};
