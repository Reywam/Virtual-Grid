export class Cell
{
    private data:string;
    private size:number;
    private startPoint:[number,number]
    private endPoint:[number,number]
    private dataDrawPoint:[number,number];
    private fontSize:number = 15;

    constructor(x:number, y:number, size:number, data:string)
    {
        this.startPoint = [x,y];
        this.endPoint = [x + size,y + size]
        this.data = data;
        this.size = size;
        let roundedHalfSize = Math.round(size / 2);
        let xDraw:number = x + roundedHalfSize - Math.round(data.length / 2) * this.fontSize;
        let yDraw:number = y + roundedHalfSize;
        this.dataDrawPoint = [xDraw, yDraw];
    }

    public SetBeginPoint(x:number, y:number):void
    {
        this.startPoint = [x,y];
        this.endPoint = [x + this.size, y + this.size]
        let roundedHalfSize = Math.round(this.size / 2);
        let xDraw:number = x + roundedHalfSize - Math.round(this.data.length / 2) * this.fontSize;
        let yDraw:number = y + roundedHalfSize;
        this.dataDrawPoint = [xDraw, yDraw];
    }

    public GetBeginPoint():[number, number]
    {
        return this.startPoint;
    }

    public GetEndPoint():[number, number]
    {
        return this.endPoint;
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = "#000000";
        ctx.font = this.fontSize+"px Verdana";
        ctx.fillText(this.data, this.dataDrawPoint[0], this.dataDrawPoint[1]);
    }
}