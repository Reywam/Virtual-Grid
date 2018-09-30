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

    Draw(ctx: CanvasRenderingContext2D): void
    {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.center[0],this.center[0],this.radius,0,2*Math.PI);
        ctx.fill();
    }
}