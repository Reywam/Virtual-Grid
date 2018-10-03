import {IDrawableShape} from "./IDrawableShape";

export class Circle implements IDrawableShape
{
    private center:[number, number];
    private radius:number;
    private color:string;

    constructor(x:number, y:number, radius:number, color:string)
    {
        this.center = [x, y];
        this.radius = radius;
        this.color = color;
    }

    public SetDrawCenter(x:number, y:number)
    {
        this.center = [x, y];
        console.log(this.center);
    }

    public Draw(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.center[0],this.center[1],this.radius,0,2*Math.PI);
        ctx.fill();
        ctx.closePath();
    }

    public SetSize(size: number): void
    {
        this.radius = size / 2;
    }
}