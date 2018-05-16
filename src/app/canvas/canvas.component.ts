import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  NgZone
} from "@angular/core";
import { Circle } from "../models/circle.model";

interface MousePosition {
  x: number;
  y: number;
}

@Component({
  selector: "app-canvas",
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.scss"]
})
export class CanvasComponent implements OnInit {
  @ViewChild("canvas") public canvasRef: ElementRef;
  @Input() private numberOfCircles = 400;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mousePosition: MousePosition;
  private colorSchema: string[];
  private circles: Circle[];

  constructor(public ngZone: NgZone) {}

  public ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.circles = this.drawCircles();
    this.animate();
  }

  public onMouseOver(event: MouseEvent): void {
    this.mousePosition = { x: event.clientX, y: event.clientY };
  }

  private drawCircles(): Circle[] {
    const circles: Circle[] = [];
    for (let index = 0; index < this.numberOfCircles; index++) {
      const randomRadius: number = Math.random() * 50 + 1;
      const randomX: number = Math.random() * window.innerWidth;
      const randomY: number = Math.random() * window.innerHeight;
      const randomDX: number = Math.random() + 3 * -0.5;
      const randomDY: number = Math.random() + 3 * -0.5;
      const circle: Circle = new Circle(
        randomX,
        randomY,
        randomDX,
        randomDY,
        randomRadius,
        this.context
      );
      // circle.draw();
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
    this.circles.forEach((circle: Circle) => circle.move());
  }
}
