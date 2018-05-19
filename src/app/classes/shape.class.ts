export class Shape {
  constructor(
	protected x: number,
	protected y: number,
	protected width: number,
	protected height: number,
	protected backgroundColor: string = "black",
	protected maxWidth: number = null,
	protected maxheight: number = null,
	protected minWidth: number = null,
	protected minheight: number = null
  ) {
	this.repositionIfStuckOnWalls();
  }

  // increse Size
  protected increse( width: number, height?: number ): void {
	this.increaseWidth(width);
	this.increaseHeight(height ? height : width);
  }

  protected increaseWidth( additionalWidth: number ): void {
	if (this.width >= this.maxWidth) {
	  return;
	}
	this.width += additionalWidth;
  }

  protected increaseHeight( additionalHeight: number ): void {
	if (this.height >= this.maxheight) {
	  return;
	}
	this.height += additionalHeight;
  }

  // decrease Size
  protected decrease( width: number, height?: number ): void {
	this.decreaseWidth(width);
	this.decreaseHeight(height ? height : width);
  }

  protected decreaseWidth( fewerWidth: number ): void {
	if (this.width <= this.minWidth) {
	  return;
	}
	this.width -= fewerWidth;
  }

  protected decreaseHeight( fewerHeight: number ): void {
	if (this.height <= this.minheight) {
	  return;
	}
	this.height -= fewerHeight;
  }

  protected hasHitLeftWall(): boolean {
	  return this.x - (this.width / 2) <= 0;
  }

  protected hasHitRightWall() {
	  return this.x + (this.width / 2) >= window.innerWidth;
  }

  protected hasHitTopWall(): boolean {
	  return this.y - (this.height / 2) <= 0;
  }

  protected hasHitBottomWall(): boolean {
	  return this.y + (this.height / 2) >= window.innerHeight;
  }

  private repositionIfStuckOnWalls(): void {
	  if (this.hasHitBottomWall() || this.hasHitTopWall()) {
		  this.y = window.innerHeight / 2;
	  }
	  if (this.hasHitRightWall() || this.hasHitLeftWall()) {
		  this.x = window.innerWidth / 2;
	  }
  }
}
