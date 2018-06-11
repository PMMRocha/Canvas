import {
    Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	NgZone
} from "@angular/core";
import { Rectangle } from "./../classes/rectangle.class";
import { Circle } from "./../classes/circle.class";
import { Position } from "./../classes/position.class";
import { defaultCircleColors, E_Shape, T_Shape } from "../utils/shape.utils";

@Component({
	selector: "app-canvas",
	templateUrl: "./canvas.component.html",
	styleUrls: ["./canvas.component.scss"]
})
export class CanvasComponent implements OnInit {
	@ViewChild("canvas") private canvasRef: ElementRef;
	@Input() private shape: E_Shape = E_Shape.CIRCLE;
	@Input() private width: number;
	@Input() private height: number;
	@Input() private dRange = 2;
	@Input() private mouseRange = 100;
	@Input() private resize = 2;
	@Input() private numberOfShapes = 400;
	@Input() private colors: string[] = defaultCircleColors;
	@Input() private backgroundColor: string = 'white';
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private mousePosition: Position;
	private shapes: T_Shape[];

	constructor(public ngZone: NgZone) {}

	public ngOnInit(): void {
		this.canvas = this.canvasRef.nativeElement;
		this.context = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.paintBackground();
		this.shapes = this.createShapes();
		this.animate();
	}

	public onMouseOver(event: MouseEvent): void {
		this.mousePosition = new Position(event.clientX, event.clientY, this.mouseRange);
	}
    
    public onMouseLeave(): void {
		this.mousePosition.range = 0;
	}

	private createShapes(): T_Shape[] {
		switch (this.shape) {
			case E_Shape.CIRCLE: return this.createCircles();
			case E_Shape.RECTANGLE: return this.createRectangles();
			default: new Error(`${this.shape} is not a valid shape`);
		}
	}

	private createRectangles(): Rectangle[] {
		const rectangles: Rectangle[] = [];
		for (let index = 0; index < this.numberOfShapes; index++) {
			const width: number = this.width ? this.width : Math.floor(Math.random() * 100 + 1);
			const height: number = this.height ? this.height : Math.floor(Math.random() * 100 + 1);
			const randomX: number = Math.floor(Math.random() * window.innerWidth);
			const randomY: number = Math.floor(Math.random() * window.innerHeight);
			const randomDX: number = Math.random() * (this.dRange - -this.dRange) + -this.dRange;
			const randomDY: number = Math.random() * (this.dRange - -this.dRange) + -this.dRange;
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
		for (let index = 0; index < this.numberOfShapes; index++) {
            const radius: number = this.width ? this.width / 2 : Math.floor(Math.random() * 50 + 1);
			const randomX: number = Math.floor(Math.random() * window.innerWidth);
			const randomY: number = Math.floor(Math.random() * window.innerHeight);
			const randomDX: number = Math.random() * (this.dRange - -this.dRange) + -this.dRange;
			const randomDY: number = Math.random() * (this.dRange - -this.dRange) + -this.dRange;
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

	private animate = (): void => {
		this.ngZone.runOutsideAngular(() => requestAnimationFrame(this.animate));
		// clear canvas
        this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
        // repaint canvas
        this.paintBackground();
        this.shapes.forEach(
            (shape: T_Shape) => shape
                .draw()
                .resizeOnMouseOver(this.mousePosition, this.resize)
                .animate()
        );
	};

    private paintBackground(): void {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
