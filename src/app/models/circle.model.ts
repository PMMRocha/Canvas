export class Circle {
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
    this.colorSchema = [
      "#FF530D",
      "#E82C0C",
      "#FF0000",
      "#E80C7A",
      "#FF0DFF",
      "#FFFFFF"
    ];
    this.randomColorIndex = Math.floor(Math.random() * this.colorSchema.length);
    if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
        this.y = window.innerHeight / 2;
    }
    if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
        this.x = window.innerWidth / 2;
    }
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
    }
    if (hasHitTopWall || hasHitBottomWall) {
      this.dy = -this.dy;
    }
    // move horizontally
    this.x += this.dx;
    // move vertically
    this.y += this.dy;
    this.draw();
  }
}
