import { Size } from "./size.class";

export class Position {
    constructor(
      private _x: number,
      private _y: number,
      private _radius: number = 0
    ) {
		this.repositionIfStuckOnWalls();
    }

    get x() { return this._x; }
    get y() { return this._y; }

    public hasRadius(): boolean {
        return this._radius > 0;
    }
    
    public moveX( offset: number ): void { this._x += offset; }

    public moveY( offset: number ): void { this._y += offset; }

    public hasHitLeftWall(): boolean {
      return this._x - this._radius <= 0;
    }
  
    public hasHitRightWall() {
        return this._x + this._radius >= window.innerWidth;
    }
  
    public hasHitTopWall(): boolean {
        return this._y - this._radius <= 0;
    }
  
    public hasHitBottomWall(): boolean {
        return this._y + this._radius >= window.innerHeight;
    }

    public isWithinMouseRange(mousePosition: Position, range: Size): boolean {
        if(!mousePosition) { return false; }
        const pointX_1: number = this.hasRadius() ? this._x - this._radius : this._x;
        const pointY_1: number = this.hasRadius() ? this._y - this._radius : this._y;
        const pointX_2: number = this.hasRadius() ? pointX_1 + range.width : range.width;
        const pointY_2: number = this.hasRadius() ? pointY_1 + range.height : range.height;
        if (
			mousePosition.x > pointX_1 &&
			mousePosition.x < pointX_2 &&
			mousePosition.y > pointY_1 &&
			mousePosition.y < pointY_2
		) {
            return true;
        }
        return false;
    }

	private repositionIfStuckOnWalls(): void {
		if (
			this.hasHitBottomWall() ||
			this.hasHitTopWall() ||
			this.hasHitRightWall() ||
			this.hasHitLeftWall()
		) {
            this._x = window.innerWidth / 2;
            this._y = window.innerHeight / 2;
		}
	}
}