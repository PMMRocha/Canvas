import { Position } from "./position.class";
import { AnimatedShape } from "./animated-shape.class";
export class Circle extends AnimatedShape {
	private defaultRadius: number;
	private maxRadius: number;
	constructor(
		private context: CanvasRenderingContext2D,
		x: number = 100,
		y: number = 100,
		color: string = "#598C17",
		private radius: number = 50,
		dx: number = 3,
		dy: number = 3
	) {
		super(x, y, radius * 2, radius * 2, color, dx, dy);
		this.defaultRadius = this.radius;
        this.maxRadius = this.radius * 2;
        this.draw();
	}

	public move(): Circle {
        // assign new coordinates
        this.updatePosition();
        // redraw on canvas at the coordinates
        this.draw();
        return this;
	}

	public resizeOnMousseOver(mousePosition: Position): Circle {
		const ratio: number = 2;
		const resize: number = 3;
		if (
			mousePosition &&
			mousePosition.posX > this.x - this.radius * ratio &&
			mousePosition.posX < this.x + this.radius * ratio &&
			mousePosition.posY > this.y - this.radius * ratio &&
			mousePosition.posY < this.y + this.radius * ratio
		) {
			this.radius = this.radius >= this.maxRadius
				? this.maxRadius
				: this.radius + resize;
		} else {
			this.radius = this.radius <= this.defaultRadius
				? this.defaultRadius
				: this.radius - resize;
		}
        return this;
	}

	private draw(): void {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
	}
}
