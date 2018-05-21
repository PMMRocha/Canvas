import { Position } from "../classes/position.class";

export interface IShape<T> {
    draw(): T;
    animate(): T;
    resizeOnMouseOver(mousePosition: Position): T;
}