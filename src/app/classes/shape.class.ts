import { Size } from "./size.class";
import { Position } from "./position.class";

export class Shape {
  constructor(
	protected position: Position,
    protected size: Size,
	protected backgroundColor: string = "black",
    protected dx: number = 3,
    protected dy: number = 3
  ) {
	this.repositionIfStuckOnWalls();
  }

  protected updatePosition(): void {
    this.bounceOffWalls();
    // move horizontally
    this.position.moveX(this.dx);
    // move vertically
    this.position.moveY(this.dy);
  }

  private bounceOffWalls(): void {
    if (this.hasHitTopWall() || this.hasHitBottomWall()) {
      this.dy = -this.dy;
    }
    if (this.hasHitRightWall() || this.hasHitLeftWall()) {
      this.dx = -this.dx;
    }
  }

  private repositionIfStuckOnWalls(): void {
	  if (this.hasHitBottomWall() || this.hasHitTopWall()) {
		  this.position.y = window.innerHeight / 2;
	  }
	  if (this.hasHitRightWall() || this.hasHitLeftWall()) {
		  this.position.x = window.innerWidth / 2;
	  }
  }

  private hasHitLeftWall(): boolean {
	  return this.position.x - (this.size.width / 2) <= 0;
  }

  private hasHitRightWall() {
	  return this.position.x + (this.size.width / 2) >= window.innerWidth;
  }

  private hasHitTopWall(): boolean {
	  return this.position.y - (this.size.height / 2) <= 0;
  }

  private hasHitBottomWall(): boolean {
	  return this.position.y + (this.size.height / 2) >= window.innerHeight;
  }
}
