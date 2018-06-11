import { Rectangle } from './../classes/rectangle.class';
import { Circle } from './../classes/circle.class';
export const defaultCircleColors: string[] = [
  '#FF7C06', '#E44607', '#FCFADA', '#00494F', '#008198', '#598C17'
];

export enum E_Shape {
    CIRCLE = 'circle',
    RECTANGLE = 'rectangle'
}

export type T_Shape = Circle | Rectangle;
