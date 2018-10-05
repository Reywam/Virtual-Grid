import {IDrawableShape} from "./Shapes/IDrawableShape";
import {ShapeState} from "./Shapes/ShapeState";

export class Cell
{
    private data:string;
    private size:number;
    private startPoint:[number,number];
    private endPoint:[number,number];
    private dataDrawPoint:[number, number];
    private fontSize:number = 15;
    private textColor:string = "#000000";
    private center:[number, number];
    private backgroundShape:IDrawableShape;

    constructor(x:number, y:number, size:number, data:string, backgroundShape:IDrawableShape)
    {
        this.startPoint = [x, y];
        this.endPoint = [x + size, y + size];
        this.data = data;
        this.size = size;
        this.center = [this.startPoint[0] + size / 2, this.startPoint[1] + size / 2];
        this.backgroundShape = backgroundShape;

        let canvas = <HTMLCanvasElement> document.getElementById("canvas");
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        let dataMetrics:TextMetrics= ctx.measureText(data);

        this.dataDrawPoint = [this.center[0] - dataMetrics.width / 2, this.center[1]];
        this.backgroundShape.SetDrawCenter(this.center[0], this.center[1]);
    }

    public SetBeginPoint(x:number, y:number):void
    {
        this.startPoint = [x, y];
        this.endPoint = [x + this.size, y + this.size];
        let canvas = <HTMLCanvasElement> document.getElementById("canvas");
        let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
        let dataMetrics:TextMetrics= ctx.measureText(this.data);
        this.center = [this.startPoint[0] + this.size / 2, this.startPoint[1] + this.size / 2];
        this.dataDrawPoint = [this.center[0] - dataMetrics.width / 2, this.center[1]];
        this.backgroundShape.SetDrawCenter(this.center[0], this.center[1]);
    }

    public GetBeginPoint():[number, number]
    {
        return this.startPoint;
    }

    public GetEndPoint():[number, number]
    {
        return this.endPoint;
    }

    public SetData(data:string)
    {
        this.data = data;
    }

    public SetFontSize(size:number)
    {
        this.fontSize = size;
    }

    public SetShape(shape:IDrawableShape)
    {
        let currentState:ShapeState = this.backgroundShape.GetState();
        this.backgroundShape = shape;
        this.backgroundShape.SetState(currentState);
        this.backgroundShape.SetDrawCenter(currentState.drawCenter[0], currentState.drawCenter[1]);
    }

    public SetShapeSize(size:number)
    {
        this.backgroundShape.SetSize(size);
    }

    public SetShapeColor(color:string)
    {
        this.backgroundShape.SetColor(color);
    }

    public SetTextColor(color:string)
    {
        this.textColor = color;
    }

    public GetBackgroundShape()
    {
        return this.backgroundShape;
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        this.backgroundShape.Draw(ctx);
        ctx.fillStyle = this.textColor;
        ctx.font = this.fontSize+"px Verdana";
        ctx.fillText(this.data, this.dataDrawPoint[0], this.dataDrawPoint[1]);
    }
}