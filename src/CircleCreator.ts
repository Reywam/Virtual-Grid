import {IShapeCreator} from "./IShapeCreator";
import {IDrawableShape} from "./IDrawableShape";
import {Circle} from "./Circle";

export class CircleCreator implements IShapeCreator
{
    createShape(): IDrawableShape
    {
        return new Circle(0, 0, 0, "#000000");
    }
}