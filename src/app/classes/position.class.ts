import { Size } from './size.class';

export class Position {
    constructor(
      private _x: number,
      private _y: number,
      private _range: number = 100
    ) {}

    get x() { return this._x; }
    get y() { return this._y; }
    get range() { return this._range; }
    set range(range: number) { this._range = range; }

    public moveX( offset: number ): void { this._x += offset; }

    public moveY( offset: number ): void { this._y += offset; }

    public hasHitLeftWall(): boolean {
      return this._x <= 0;
    }

    public hasHitRightWall(width: number = 0) {
        return this._x + width >= window.innerWidth;
    }

    public hasHitTopWall(): boolean {
        return this._y <= 0;
    }

    public hasHitBottomWall(height: number = 0): boolean {
        return this._y + height >= window.innerHeight;
    }

	public repositionIfStuckOnWalls(size: Size): void {
		if (
			this.hasHitBottomWall(size.height) ||
			this.hasHitTopWall() ||
			this.hasHitRightWall(size.width) ||
			this.hasHitLeftWall()
		) {
            this._x = window.innerWidth / 2;
            this._y = window.innerHeight / 2;
		}
	}
}
