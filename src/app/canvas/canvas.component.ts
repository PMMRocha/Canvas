import { Rectangle } from './../classes/rectangle.class';
import { Position } from './../classes/position.class';
import { Circle } from './../classes/circle.class';
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	NgZone
} from '@angular/core';
import { defaultCircleColors, E_Shape } from '../utils/shape.utils';
import {E} from '@angular/core/src/render3';

@Component({
	selector: 'app-canvas',
	templateUrl: './canvas.component.html',
	styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
	@ViewChild('canvas') public canvasRef: ElementRef;
	@Input() private numberOfCircles = 400;
	@Input() private numberOfRectangles = 400;
	@Input() private colors: string[] = defaultCircleColors;
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private mousePosition: Position;
	private circles: Circle[];
	private rectangles: Rectangle[];
	private shape: E_Shape;

	constructor(public ngZone: NgZone) {}

	public ngOnInit(): void {
		this.canvas = this.canvasRef.nativeElement;
		this.context = this.canvas.getContext('2d');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
        this.shape = E_Shape.CIRCLE;
        this[this.shape === E_Shape.RECTANGLE
                ? 'rectangles'
                : 'circles'
            ] = this.shape == E_Shape.RECTANGLE
                ? this.createRectangles()
                : this.createCircles();
		this.rectangles = this.createRectangles();
		this.animate();
	}

	public onMouseOver(event: MouseEvent): void {
		this.mousePosition = new Position(event.clientX, event.clientY);
	}

	private createRectangles(): Rectangle[] {
		const rectangles: Rectangle[] = [];
		const dRange = 3;
		for (let index = 0; index < this.numberOfRectangles; index++) {
			const width: number = Math.floor(Math.random() * 100 + 1);
			const height: number = Math.floor(Math.random() * 100 + 1);
			const randomX: number = Math.floor(Math.random() * window.innerWidth);
			const randomY: number = Math.floor(Math.random() * window.innerHeight);
			const randomDX: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomDY: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomColorIndex = Math.floor(Math.random() * this.colors.length);
			const rectangle: Rectangle = new Rectangle(
				this.context,
				randomX,
				randomY,
				this.colors[randomColorIndex],
				width,
				height,
				randomDX,
				randomDY
			);
			rectangles.push(rectangle);
		}
		return rectangles;
	}

	private createCircles(): Circle[] {
		const circles: Circle[] = [];
		const dRange = 3;
		for (let index = 0; index < this.numberOfCircles; index++) {
			const radius: number = 10;
			const randomX: number = Math.floor(Math.random() * window.innerWidth);
			const randomY: number = Math.floor(Math.random() * window.innerHeight);
			const randomDX: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomDY: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomColorIndex = Math.floor(Math.random() * this.colors.length);
			const circle: Circle = new Circle(
				this.context,
				randomX,
				randomY,
				this.colors[randomColorIndex],
				radius,
				randomDX,
				randomDY
			);
			circles.push(circle);
		}
		return circles;
	}

	private animate = () => {
	    const shape = this.shape;
		this.ngZone.runOutsideAngular(() =>
			requestAnimationFrame(this.animate)
		);
		// clear canvas
		this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		switch (shape) {
			case E_Shape.CIRCLE:
				// animate circles
				this.circles.forEach((circle: Circle) =>
					circle
						.draw()
						.resizeOnMouseOver(this.mousePosition)
						.animate()
				);
				break;
			case E_Shape.RECTANGLE:
				// animate rectangles
				this.rectangles.forEach((rectangle: Rectangle) =>
					rectangle
						.draw()
						.resizeOnMouseOver(this.mousePosition)
						.animate()
				);
				break;
			default:
				break;
		}
	}
}
