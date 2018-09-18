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
            this.horizontalLines[i] = new Line(0, y, canvasWidth, y);
        }

        for(let i = 0, x = 0; i < this.verticalLinesCount; i++, x += cellSize)
        {
            this.verticalLines[i] = new Line(x, 0, x, canvasHeight);
        }
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
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