export class Position {
    constructor(
      private x: number,
      private y: number
    ) {}

    get posX() { return this.x; }
    get posY() { return this.y; }
}