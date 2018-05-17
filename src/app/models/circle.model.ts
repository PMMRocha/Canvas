import { MousePosition } from "./mouse-position.model";

export class Circle {
  private minRadius: number;
  private maxRadius: number;
  private randomColorIndex: number;
  constructor(
    private context: CanvasRenderingContext2D,
    private x: number = 100,
    private y: number = 100,
    private dx: number = 3,
    private dy: number = 3,
    private radius: number = 50,
    private color: string = '#598C17'
    
  ) {
    // this.randomColorIndex = Math.floor(Math.random() * this.colorSchema.length);
    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
        this.y = window.innerHeight / 2;
    }
    if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
        this.x = window.innerWidth / 2;
    }
    this.minRadius = this.radius;
    this.maxRadius = this.radius * 2;
  }

  public draw(): void {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
  }

  public animate(mousePosition: MousePosition): void {
    const bounceOffWalls: Function = (): void => {
      const hasHitLeftWall: boolean = this.x - this.radius < 0;
      const hasHitRightWall: boolean = this.x + this.radius > window.innerWidth;
      const hasHitTopWall: boolean = this.y - this.radius < 0;
      const hasHitBottomWall: boolean = this.y + this.radius > window.innerHeight;
      // check if circle has touched the edge of the screen
      if (hasHitRightWall || hasHitLeftWall) {
        this.dx = -this.dx;
      }
      if (hasHitTopWall || hasHitBottomWall) {
        this.dy = -this.dy;
      }
    };

    // bounce off walls
    bounceOffWalls();

    // if mouse over, increase radius
    this.radius = this.resizeRadiusOnOver(mousePosition);

    // move horizontally
    this.x += this.dx;
    // move vertically
    this.y += this.dy;
    this.draw();
  }

  private resizeRadiusOnOver(mousePosition): number {
    const ratio: number = 2;
    const resize: number = 3;
    if (
      mousePosition &&
      mousePosition.posX > this.x - (this.radius * ratio) &&
      mousePosition.posX < this.x + (this.radius * ratio) &&
      mousePosition.posY > this.y - (this.radius * ratio) &&
      mousePosition.posY < this.y + (this.radius * ratio)
    ) {
      return this.radius >= this.maxRadius ?
      this.maxRadius : this.radius + resize;
    }
    else {
      return this.radius <= this.minRadius ?
      this.minRadius : this.radius - resize;
    }
  }
}
