import { Size } from './size.class';
import { Position } from './position.class';

export class Shape {
	constructor(
		protected position: Position,
		protected size: Size,
		protected backgroundColor: string = 'black',
		protected dx: number = 2,
		protected dy: number = 2
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
	    if (mousePosition) {
            const resize: number = this.size.maxResizeVal;
            const diffX: number = this.position.x - mousePosition.x;
            const diffY: number = this.position.y - mousePosition.y;
            const distance: number = Math.sqrt(diffX * diffX + diffY * diffY);
            const factor: number = resize - Math.min(distance / mousePosition.range, 1) * resize + 1;
            this.size.scale(factor);
        }
    }
}
