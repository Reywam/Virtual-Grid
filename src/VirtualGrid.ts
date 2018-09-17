export class VirtualGrid
{
    private verticalLinesCount:number;
    private horizontalLinesCount:number;
    private lineThickness:number;
    private lineColor:string;
    private cellSize:number;

    public constructor(canvasWidth:number
                , canvasHeight:number
                , cellSize:number
                , lineColor:string = "#000000"
                , lineThickness:number = 1)
    {
        this.cellSize = cellSize;
        this.lineColor = lineColor;
        this.lineThickness = lineThickness;
        this.verticalLinesCount = canvasWidth / cellSize;
        this.horizontalLinesCount = canvasHeight / cellSize;
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        // Draw grid on canvas
        console.log("I am grid and i draw myself on this canvas!:D");
    }
}