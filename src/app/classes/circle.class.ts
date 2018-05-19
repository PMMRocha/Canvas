import { Position } from "./position.class";
import { AnimatedShape } from "./animated-shape.class";
import { Size } from "./size.class";
export class Circle extends AnimatedShape {
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
            x, y,
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
			mousePosition.posX > this.x - (this.size.width / 2) * ratio &&
			mousePosition.posX < this.x + (this.size.width / 2) * ratio &&
			mousePosition.posY > this.y - (this.size.height / 2) * ratio &&
			mousePosition.posY < this.y + (this.size.height / 2) * ratio
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
		this.context.arc(this.x, this.y, this.size.width / 2, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
	}
}
