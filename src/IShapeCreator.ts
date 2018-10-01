import {IDrawableShape} from "./IDrawableShape";

export interface IShapeCreator
{
    createShape():IDrawableShape;
}