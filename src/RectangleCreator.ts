import {IShapeCreator} from "./IShapeCreator";
import {IDrawableShape} from "./IDrawableShape";
import {Rectangle} from "./Rectangle";

export class RectangleCreator implements IShapeCreator
{
    private centerX:number = 0;
    private centerY:number = 0;
    private size:number;
    private color:string;

    constructor(size:number, color:string)
    {
        this.size = size;
        this.color = color;
    }

    createShape(): IDrawableShape
    {
        return new Rectangle(this.centerX, this.centerY, this.size, this.color);
    }
}