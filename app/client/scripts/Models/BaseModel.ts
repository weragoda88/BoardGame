export class Base {
    protected id: string;
    protected title: string;

    constructor(id: string, title: string) {
        this.id = id;
        this.title = title;
    }
    public getId(): string {
        return this.id;
    }
    public getTitle(): string {
        return this.title;
    }
}
