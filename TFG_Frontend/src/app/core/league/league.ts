export class League {
    id: number | null;
    name: string;
    year: number | null;

    constructor(id?: number, name?: string, year?: number) {
        this.id = id || null;
        this.name = name || '';
        this.year = year || null;
    }
}
