import { Position } from './position.class';
import { Size } from './size.class';
import { Shape } from './shape.class';
import { IShape } from '../utils/IShape.interface';

export class Circle extends Shape implements IShape<Circle> {
	constructor(
		private context: CanvasRenderingContext2D,
		x: number = 100,
		y: number = 100,
		backgroundColor: string = '#598C17',
		radius: number = 50,
		dx: number = 3,
		dy: number = 3,
		maxResizeVal: number = radius * 4
	) {
		super(
			new Position(x - radius, y - radius),
			new Size(radius * 2, radius * 2, maxResizeVal),
			backgroundColor,
			dx,
			dy
		);
	}

	public draw(): Circle {
		this.context.beginPath();
		this.context.arc(
			this.position.x + (this.size.width / 2),
			this.position.y + (this.size.height / 2),
			this.size.width / 2,
			0,
			2 * Math.PI,
			false
		);
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
		return this;
	}

	public animate(): Circle {
		this.bounceOffWalls();
		this.move();
		return this;
	}

	public resizeOnMouseOver(mousePosition: Position): Circle {
		super.resizeOnMouseOver(mousePosition);
		return this;
	}
}
