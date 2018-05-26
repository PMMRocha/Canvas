import { Circle } from './circle.class';
import { Size } from './size.class';
import { Position } from './position.class';

export class Shape {
	constructor(
		protected position: Position,
		protected size: Size,
		protected backgroundColor: string = 'black',
		protected dx: number = 3,
		protected dy: number = 3
    ) {
		this.position.repositionIfStuckOnWalls(this.size);
    }

	protected move(): void {
		// move horizontally
		this.position.moveX(this.dx);
		// move vertically
		this.position.moveY(this.dy);
	}

	protected bounceOffWalls(): void {
		if (
			this.position.hasHitTopWall() ||
			this.position.hasHitBottomWall(this.size.height)
		) {
			this.dy = -this.dy;
		}
		if (
			this.position.hasHitRightWall(this.size.width) ||
			this.position.hasHitLeftWall()
		) {
			this.dx = -this.dx;
		}
    }

    protected resizeOnMouseOver(mousePosition: Position): void {
        const resize: number = 3;
        const range: number = 100;
        if (
            mousePosition &&
			mousePosition.x > this.position.x - range &&
			mousePosition.x < (this.position.x + this.size.width) + range &&
			mousePosition.y > this.position.y - range &&
			mousePosition.y < (this.position.y + this.size.height) + range
		) {
			this.size.increse(resize);
        } else {
			this.size.decrease(resize);
        }
    }
}
