import {IDrawableShape} from "./IDrawableShape";
import {ShapeState} from "./ShapeState";

export class Rectangle implements IDrawableShape
{
    private drawCenter:[number, number];
    private size:number;
    private color:string;

    constructor(centerX:number, centerY:number, size:number, color:string)
    {
        this.drawCenter = [centerX, centerY];
        this.size = size;
        this.color = color;
    }

    public SetDrawCenter(x: number, y: number): void
    {
        this.drawCenter = [x, y];
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.drawCenter[0] - this.size / 2, this.drawCenter[1] - this.size / 2, this.size, this.size);
    }

    public SetSize(size: number): void
    {
        this.size = size;
    }

    GetState(): ShapeState
    {
        return new ShapeState(this.size, this.drawCenter, this.color);
    }

    SetState(state: ShapeState): void
    {
        this.size = state.size;
        this.drawCenter = state.drawCenter;
        this.color = state.color;
    }
}