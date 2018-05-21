import { Position } from "../classes/position.class";
import { Size } from "../classes/size.class";

export interface IShape<T> {
    draw(): T;
    animate(): T;
    resizeOnMouseOver(mousePosition: Position): T;
}