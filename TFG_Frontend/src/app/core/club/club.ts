export class Club {
    id: number | null;
    name: string;

    constructor(id?: number, name?: string) {
        this.id = id || null;
        this.name = name || '';
    }
}
