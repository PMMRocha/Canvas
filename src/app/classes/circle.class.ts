import { Position } from "./position.class";
import { Size } from "./size.class";
import { Shape } from "./shape.class";
export class Circle extends Shape {
	constructor(
		private context: CanvasRenderingContext2D,
		x: number = 100,
		y: number = 100,
		color: string = "#598C17",
		private radius: number = 50,
		dx: number = 3,
        dy: number = 3,
        maxWidth: number = radius * 4,
        maxHeight: number = radius * 4
	) {
		super(
            new Position(x, y),
            new Size(radius * 2, radius * 2, maxWidth, maxHeight),
            color, dx, dy
        );
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
			mousePosition.x > this.position.x - (this.size.width / 2) * ratio &&
			mousePosition.x < this.position.x + (this.size.width / 2) * ratio &&
			mousePosition.y > this.position.y - (this.size.height / 2) * ratio &&
			mousePosition.y < this.position.y + (this.size.height / 2) * ratio
		) {
			// this.size.width = this.radius >= this.maxRadius
			// 	? this.maxRadius
            //     : this.radius + resize;
            this.size.increse(resize);
		} else {
			// this.radius = this.radius <= this.defaultRadius
			// 	? this.defaultRadius
            //     : this.radius - resize;
            this.size.decrease(resize);
		}
        return this;
	}

	private draw(): void {
		this.context.beginPath();
		this.context.arc(this.position.x, this.position.y, this.size.width / 2, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
	}
}
