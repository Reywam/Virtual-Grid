import {IDrawableShape} from "./IDrawableShape";

export class Rectangle implements IDrawableShape
{
    private beginPoint:[number, number];
    private size:number;
    private color:string;

    constructor(centerX:number, centerY:number, size:number, color:string)
    {
        this.beginPoint = [centerX - size / 2, centerY - size / 2];
        this.size = size;
        this.color = color;
    }

    public SetDrawCenter(x: number, y: number): void
    {
        this.beginPoint = [x - this.size / 2, y - this.size / 2];
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.beginPoint[0], this.beginPoint[1], this.size, this.size);
    }
}