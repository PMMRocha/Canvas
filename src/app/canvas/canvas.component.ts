import { Component, OnInit, ViewChild, ElementRef, Input, NgZone } from '@angular/core';

interface MousePosition {
  x: number;
  y: number;
}

class Circle {
  private colorSchema: string[];
  private randomColorIndex: number;
  constructor(
    public x: number = 100,
    public y: number = 100,
    public radius: number = 50,
    public context: CanvasRenderingContext2D
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
      const randomRadius: number = Math.random() * 50;
      circles.push(new Circle(randomX, randomY, randomRadius, this.context));
    }
    return circles;
  }

  private animate(): void {
    this.ngZone.runOutsideAngular(() => requestAnimationFrame(this.animate.bind(this)));
    // clear canvas
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.circles.forEach(
      (circle: Circle) => circle.draw()
    );
  }

}
