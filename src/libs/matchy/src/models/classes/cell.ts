export class Cell {
    value: string;
    rowIndex: number;
    colIndex: number;

    constructor(value: any, rowIndex: number, colIndex: number) {
        this.value = String(value ?? "");
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
}

