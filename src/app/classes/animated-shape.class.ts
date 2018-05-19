import { Shape } from "./shape.class";
export class AnimatedShape extends Shape {
  constructor(
    x: number = 100,
    y: number = 100,
    w: number = 100,
    h: number = 100,
    color: string = "#598C17",
    protected dx: number = 3,
    protected dy: number = 3
  ) {
    super(x, y, w, h, color);
  }

  protected updatePosition(): void {
    this.bounceOffWalls();
    // move horizontally
    this.x += this.dx;
    // move vertically
    this.y += this.dy;
  }

  private bounceOffWalls(): void {
    if (this.hasHitRightWall() || this.hasHitLeftWall()) {
      this.dx = -this.dx;
    }
    if (this.hasHitTopWall() || this.hasHitBottomWall()) {
      this.dy = -this.dy;
    }
  }
}
