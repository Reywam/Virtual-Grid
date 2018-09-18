import {Line} from "./Line";

export class VirtualGrid
{
    private verticalLinesCount:number;
    private horizontalLinesCount:number;
    private lineThickness:number;
    private lineColor:string;
    private cellSize:number;
    private horizontalLines:Array<Line>;
    private verticalLines:Array<Line>;

    private offsetX:number = 0;
    private offsetY:number = 0;

    public constructor(canvasWidth:number
                , canvasHeight:number
                , cellSize:number
                , lineColor:string = "#000000"
                , lineThickness:number = 1)
    {
        this.cellSize = cellSize;
        this.lineColor = lineColor;
        this.lineThickness = lineThickness;
        this.verticalLinesCount = Math.round(canvasWidth / cellSize);
        this.horizontalLinesCount = Math.round(canvasHeight / cellSize);

        this.horizontalLines = new Array(this.horizontalLinesCount);
        this.verticalLines = new Array(this.verticalLinesCount);

        for(let i = 0, y = 0; i < this.horizontalLinesCount; i++, y += cellSize)
        {
            this.horizontalLines[i] = new Line(0, y, canvasWidth, y, this.lineColor, this.lineThickness);
        }

        for(let i = 0, x = 0; i < this.verticalLinesCount; i++, x += cellSize)
        {
            this.verticalLines[i] = new Line(x, 0, x, canvasHeight, this.lineColor, this.lineThickness);
        }
    }

    public MoveRight(step:number)
    {
        for(let line of this.verticalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            line.SetBeginPoint([currBegin[0] + step, currBegin[1]]);
            line.SetEndPoint([currEnd[0] + step, currEnd[1]]);
        }
    }

    public MoveLeft(step:number)
    {
        for(let line of this.verticalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            line.SetBeginPoint([currBegin[0] - step, currBegin[1]]);
            line.SetEndPoint([currEnd[0] - step, currEnd[1]]);
        }
    }

    public MoveUp(step:number)
    {
        for(let line of this.horizontalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            line.SetBeginPoint([currBegin[0], currBegin[1] - step]);
            line.SetEndPoint([currEnd[0], currEnd[1] - step]);
        }
    }

    public MoveDown(step:number)
    {
        for(let line of this.horizontalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            line.SetBeginPoint([currBegin[0], currBegin[1] + step]);
            line.SetEndPoint([currEnd[0], currEnd[1] + step]);
        }
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.clearRect(0,0, ctx.canvas.width, ctx.canvas.height);
        for(let i = 0; i < this.horizontalLinesCount; i++)
        {
            this.horizontalLines[i].Draw(ctx);
        }

        for(let i = 0; i < this.verticalLinesCount; i++)
        {
            this.verticalLines[i].Draw(ctx);
        }
    }
}