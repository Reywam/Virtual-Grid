import {IDrawableShape} from "./IDrawableShape";

export class Rectangle implements IDrawableShape
{
    private beginPoint:[number, number];
    private size:number;
    private color:string;

    constructor(x:number, y:number, size:number, color:string)
    {
        this.beginPoint = [x, y];
        this.size = size;
        this.color = color;
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.beginPoint[0], this.beginPoint[1], this.size, this.size);
    }
}