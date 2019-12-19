export const common = {
    el(id: string): Element {
        return document.getElementById(id);
    },
    lg(...params: any[]) {
        console.log(...params);
    }
};
