import { Shape } from './shape.class';
import { IShape } from '../utils/IShape.interface';
import { Position } from './position.class';
import { Size } from './size.class';

export class Rectangle extends Shape implements IShape<Rectangle> {
    constructor(
        private context: CanvasRenderingContext2D,
        x: number = 100,
		y: number = 100,
		backgroundColor: string = '#598C17',
		width: number = 50,
		height: number = 50,
		dx: number = 3,
		dy: number = 3,
		maxResizeVal: number = width * 2
    ) {
        super(
            new Position(x, y),
            new Size(width, height, maxResizeVal),
            backgroundColor,
            dx,
            dy
        );
    }

    public draw(): Rectangle {
        this.context.beginPath();
		this.context.rect(
            this.position.x,
            this.position.y,
            this.size.width,
            this.size.height
        );
		this.context.fillStyle = this.backgroundColor;
		this.context.fill();
		return this;
    }

    public animate(): Rectangle {
        this.bounceOffWalls();
		this.move();
		return this;
    }

    public resizeOnMouseOver(mousePosition: Position): Rectangle {
		super.resizeOnMouseOver(mousePosition);
		return this;
	}
}
