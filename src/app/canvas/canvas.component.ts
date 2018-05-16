import { Component, OnInit, ViewChild, ElementRef, Input, NgZone } from '@angular/core';

interface MousePosition {
  x: number;
  y: number;
}

class Circle {
  private colorSchema: string[];
  private randomColorIndex: number;
  constructor(
    private x: number = 100,
    private y: number = 100,
    private dx: number = 3,
    private dy: number = 3,
    private radius: number = 50,
    private context: CanvasRenderingContext2D
  ) {
    this.colorSchema = [ '#FF530D', '#E82C0C', '#FF0000', '#E80C7A', '#FF0DFF', '#FFFFFF' ];
    this.randomColorIndex = Math.floor(Math.random() * this.colorSchema.length);
  }

  public draw(): void {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.colorSchema[this.randomColorIndex];
    this.context.fill();
  }

  public move(): void {
    const hasHitLeftWall: boolean = this.x - this.radius < 0;
    const hasHitRightWall: boolean = this.x + this.radius > window.innerWidth;
    const hasHitTopWall: boolean = this.y - this.radius < 0;
    const hasHitBottomWall: boolean = this.y + this.radius > window.innerHeight;
    // check if circle has touched the edge of the screen
    if (hasHitRightWall || hasHitLeftWall) {
      this.dx = -this.dx;
    } else if (hasHitTopWall || hasHitBottomWall) {
      this.dy = -this.dy;
    }
    // move horizontally
    this.x += this.dx;
    // move vertically
    this.y += this.dy;
    this.draw();
  }
}

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') public canvasRef: ElementRef;
  @Input() private numberOfCircles = 400;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private mousePosition: MousePosition;
  private colorSchema: string[];
  private circles: Circle[];

  constructor(public ngZone: NgZone) { }

  public ngOnInit(): void {
    this.canvas = this.canvasRef.nativeElement;
    this.context = this.canvas.getContext('2d');
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
      const randomX: number = Math.random() * window.innerWidth;
      const randomY: number = Math.random() * window.innerHeight;
      const randomDX: number = Math.random() * 5;
      const randomDY: number = Math.random() * 5;
      const randomRadius: number = Math.random() * 50;
      const circle: Circle = new Circle(randomX, randomY, randomDX, randomDY, randomRadius, this.context);
      // circle.draw();
      circles.push(circle);
    }
    return circles;
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => requestAnimationFrame(this.animate.bind(this)));
    // clear canvas
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // animate circles
    this.circles.forEach((circle: Circle) => circle.move());
  }

}
