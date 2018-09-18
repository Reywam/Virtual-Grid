export class Line
{
    private x1:number;
    private y1:number;
    private x2:number;
    private y2:number;
    private color:string;
    private thickness:number;

    constructor(x1:number, y1:number, x2:number, y2:number, color:string = "#000000", thickness:number = 1)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.color = color;
        this.thickness = thickness;
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        let currentColor = ctx.strokeStyle;
        ctx.strokeStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
        ctx.strokeStyle = currentColor;
    }

    public SetBeginPoint(newPoint:[number, number])
    {
        this.x1 = newPoint[0];
        this.y1 = newPoint[1];
    }

    public SetEndPoint(newPoint:[number, number])
    {
        this.x2 = newPoint[0];
        this.y2 = newPoint[1];
    }

    public GetBeginPoint():[number, number]
    {
        return [this.x1, this.y1];
    }

    public GetEndPoint():[number, number]
    {
        return [this.x2, this.y2];
    }
}