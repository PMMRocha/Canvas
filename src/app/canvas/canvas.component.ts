import { Position } from "./../classes/position.class";
import { Circle } from "./../classes/circle.class";
import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	Input,
	NgZone
} from "@angular/core";
import { defaultCircleColors } from "../utils/circle-colors.utils";

@Component({
	selector: "app-canvas",
	templateUrl: "./canvas.component.html",
	styleUrls: ["./canvas.component.scss"]
})
export class CanvasComponent implements OnInit {
	@ViewChild("canvas") public canvasRef: ElementRef;
	@Input() private numberOfCircles = 400;
	@Input() private circleColors: string[] = defaultCircleColors;
	private canvas: HTMLCanvasElement;
	private context: CanvasRenderingContext2D;
	private mousePosition: Position;
	private circles: Circle[];

	constructor(public ngZone: NgZone) {}

	public ngOnInit(): void {
		this.canvas = this.canvasRef.nativeElement;
		this.context = this.canvas.getContext("2d");
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.circles = this.createCircles();
		this.animate();
	}

	public onMouseOver(event: MouseEvent): void {
		this.mousePosition = new Position(event.clientX, event.clientY);
	}

	private createCircles(): Circle[] {
		const circles: Circle[] = [];
		const dRange: number = 3;
		for (let index = 0; index < this.numberOfCircles; index++) {
			const radius: number = Math.floor(Math.random() * 50 + 1);
			const randomX: number = Math.floor(Math.random() * window.innerWidth);
			const randomY: number = Math.floor(Math.random() * window.innerHeight);
			const randomDX: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomDY: number = Math.random() * (dRange - -dRange) + -dRange;
			const randomColorIndex = Math.floor(
				Math.random() * this.circleColors.length
			);
			const circle: Circle = new Circle(
				this.context,
				randomX,
				randomY,
				this.circleColors[randomColorIndex],
				radius,
				randomDX,
				randomDY
			);
			circles.push(circle);
		}
		return circles;
	}

	private animate(): void {
		this.ngZone.runOutsideAngular(() =>
			requestAnimationFrame(this.animate.bind(this))
		);
		// clear canvas
		this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		// animate circles
		this.circles.forEach((circle: Circle) =>
			circle
				.draw()
				.resizeOnMouseOver(this.mousePosition)
				.animate()
		);
		delete this.mousePosition;
	}
}
