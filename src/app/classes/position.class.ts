export class Position {
    constructor(
      private _x: number,
      private _y: number
    ) {}

    get x() { return this._x; }
    get y() { return this._y; }
    set x(x: number) { this._x = x; }
    set y(y: number) { this._y = y; }
    
    public moveX( offset: number ): void { this._x += offset; }

    public moveY( offset: number ): void { this._y += offset; }
}