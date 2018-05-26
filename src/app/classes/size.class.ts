export class Size {
    private initialSize: { width: number, height: number };
	constructor(
		private _width: number,
		private _height: number,
		private _maxWidth: number,
        private _maxHeight: number
	) {
        this.initialSize = { width: _width, height: _height};
    }
    
    get width() { return this._width; }
    get height() { return this._height; }

	// increse Size
	public increse(width: number, height?: number): void {
		this.increaseWidth(width);
		this.increaseHeight(height | width);
	}

	public increaseWidth(additionalWidth: number): void {
		if (this._width >= this._maxWidth) {
			return;
		}
		this._width += additionalWidth;
	}

	public increaseHeight(additionalHeight: number): void {
		if (this._height >= this._maxHeight) {
			return;
		}
		this._height += additionalHeight;
	}

	// decrease Size
	public decrease(width: number, height?: number): void {
		this.decreaseWidth(width);
		this.decreaseHeight(height | width);
	}

	public decreaseWidth(fewerWidth: number): void {
		if (this._width <= this.initialSize.width) {
			return;
		}
		this._width -= fewerWidth;
	}

	public decreaseHeight(fewerHeight: number): void {
		if (this._height <= this.initialSize.height) {
			return;
		}
		this._height -= fewerHeight;
	}
}
