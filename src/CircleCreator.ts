import {IShapeCreator} from "./IShapeCreator";
import {IDrawableShape} from "./IDrawableShape";
import {Circle} from "./Circle";

export class CircleCreator implements IShapeCreator
{
    private centerX:number = 0;
    private centerY:number = 0;
    private radius:number;
    private color:string;

    constructor(radius:number, color:string)
    {
        this.radius = radius;
        this.color = color;
    }

    CreateShape(): IDrawableShape
    {
        return new Circle(this.centerX, this.centerY, this.radius, this.color);
    }

    SetShapeColor(color: string): void
    {
        this.color = color;
    }

    SetShapeSize(size: number): void
    {
        this.radius = size;
    }
}