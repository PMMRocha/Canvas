export class Size {
    private initialSize: { width: number, height: number };
	constructor(
		private _width: number,
		private _height: number,
		private _maxResizeVal: number = 2
	) {
        this.initialSize = { width: _width, height: _height};
    }

    get width() { return this._width; }
    get height() { return this._height; }
    get maxResizeVal() { return this._maxResizeVal; }

    public scale(factor: number): void {
	    this._width  = this.initialSize.width * factor;
	    this._height = this.initialSize.height * factor;
    }
}
