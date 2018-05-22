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
    ) {}

	protected move(): void {
		// move horizontally
		this.position.moveX(this.dx);
		// move vertically
		this.position.moveY(this.dy);
	}

	protected bounceOffWalls(): void {
		if (
			this.position.hasHitTopWall() ||
			this.position.hasHitBottomWall()
		) {
			this.dy = -this.dy;
		}
		if (
			this.position.hasHitRightWall() ||
			this.position.hasHitLeftWall()
		) {
			this.dx = -this.dx;
		}
    }

    protected resizeOnMouseOver(mousePosition: Position): void {
        const resize = 3;
		if (this.position.isWithinMouseRange(mousePosition, this.size)) {
			this.size.increse(resize);
		} else {
			this.size.decrease(resize);
		}
    }
}
