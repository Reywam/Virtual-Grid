import {Line} from "./Line";
import {Cell} from "./Cell";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {IShapeCreator} from "./IShapeCreator";
import {ShapeState} from "./ShapeState";

export class VirtualGrid
{
    private verticalLinesCount:number;
    private horizontalLinesCount:number;
    private lineThickness:number = 1;
    private lineColor:string;
    private cellSize:number;
    private horizontalLines:Array<Line>;
    private verticalLines:Array<Line>;
    private backgroundColor:string;

    private rightBorder:number;
    private topBorder:number = 0;
    private leftBorder:number = 0;
    private botBorder:number;

    private offsetX:number = 0;
    private offsetY:number = 0;

    private cells:Cell[][] = [];

    private calculationHelper:GridCalculationHelper;

    public constructor(canvasWidth:number
                , canvasHeight:number
                , cellSize:number
                , lineColor:string = "#000000"
                , backgroundColor = "#ffffff"
                , calculationHelper:GridCalculationHelper
                , shapeCreator:IShapeCreator)
    {
        this.cellSize = cellSize;
        this.lineColor = lineColor;
        this.backgroundColor = backgroundColor;
        this.calculationHelper = calculationHelper;
        this.verticalLinesCount = Math.round(canvasWidth / cellSize) + 1;
        this.horizontalLinesCount = Math.round(canvasHeight / cellSize) + 1;
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

        this.rightBorder = canvasWidth;
        this.botBorder = canvasHeight;

        let additionalBorderValues:[number, number]
                = this.calculationHelper.CalculateAdditionalBorderValues(this.horizontalLinesCount
                                                                    , this.verticalLinesCount
                                                                    , this.cellSize
                                                                    , this.rightBorder
                                                                    , this.botBorder);
        let newBorders:[number, number] = this.calculationHelper.CalculateNewBorderValues(additionalBorderValues[0]
                                                        , additionalBorderValues[1]
                                                        , this.rightBorder
                                                        , this.botBorder);
        this.rightBorder = newBorders[0];
        this.botBorder = newBorders[1];

        this.calculationHelper.CalculateNewCellArray(this.cells
            , this.horizontalLines
            , this.verticalLines
            , this.cellSize
            , shapeCreator);
    }

    public ChangeCellSize(size:number, canvasWidth:number, canvasHeight:number, shapeCreator:IShapeCreator)
    {
        this.cellSize = size;
        this.verticalLinesCount = Math.round(canvasWidth / size) + 1;
        this.horizontalLinesCount = Math.round(canvasHeight / size) + 1;

        this.rightBorder = canvasWidth;
        this.botBorder = canvasHeight;

        let additionalBorderValues:[number, number]
            = this.calculationHelper.CalculateAdditionalBorderValues(this.horizontalLinesCount
            , this.verticalLinesCount
            , this.cellSize
            , this.rightBorder
            , this.botBorder);
        let newBorders:[number, number] = this.calculationHelper.CalculateNewBorderValues(additionalBorderValues[0]
            , additionalBorderValues[1]
            , this.rightBorder
            , this.botBorder);
        this.rightBorder = newBorders[0];
        this.botBorder = newBorders[1];

        this.verticalLines = [];
        this.horizontalLines = [];

        for(let i = 0, y = 0; i < this.horizontalLinesCount; i++, y += this.cellSize)
        {
            this.horizontalLines[i] = new Line(0, y, canvasWidth, y, this.lineColor, this.lineThickness);
        }

        for(let i = 0, x = 0; i < this.verticalLinesCount; i++, x += this.cellSize)
        {
            this.verticalLines[i] = new Line(x, 0, x, canvasHeight, this.lineColor, this.lineThickness);
        }

        const currentShapeState:ShapeState = this.cells[0][0].GetBackgroundShape().GetState();
        shapeCreator.SetShapeColor(currentShapeState.color);
        shapeCreator.SetShapeSize(currentShapeState.size);

        this.calculationHelper.CalculateNewCellArray(this.cells
            , this.horizontalLines
            , this.verticalLines
            , this.cellSize
            , shapeCreator);

        this.calculationHelper.RecalculateCellsData(this.cells
            , this.horizontalLinesCount
            , this.verticalLinesCount
            , this.offsetX
            , this.offsetY
            , this.cellSize);
        console.log(this.cells);
    }

    public ChangeShapeColor(color:string)
    {
        for(let y:number = 0; y < this.cells.length; y++)
        {
            for(let x:number = 0; x < this.cells[y].length; x++)
            {
                this.cells[y][x].SetShapeColor(color);
            }
        }
    }

    public ChangeGridColor(color:string)
    {
        this.backgroundColor = color;
    }

    public ChangeTextColor(color:string)
    {
        for(let y:number = 0; y < this.cells.length; y++)
        {
            for(let x:number = 0; x < this.cells[y].length; x++)
            {
                this.cells[y][x].SetTextColor(color);
            }
        }
    }

    public ChangeShapeSize(size:number)
    {
        for(let y:number = 0; y < this.cells.length; y++)
        {
            for(let x:number = 0; x < this.cells[y].length; x++)
            {
                this.cells[y][x].SetShapeSize(size);
            }
        }
    }

    public ChangeCellsShape(shapeCreator:IShapeCreator)
    {
        for(let y:number = 0; y < this.cells.length; y++)
        {
            for(let x:number = 0; x < this.cells[y].length; x++)
            {
                this.cells[y][x].SetShape(shapeCreator.CreateShape());
            }
        }
    }

    public ChangeTextSize(size:number)
    {
        for(let y:number = 0; y < this.cells.length; y++)
        {
            for(let x:number = 0; x < this.cells[y].length; x++)
            {
                this.cells[y][x].SetFontSize(size);
            }
        }
    }

    private MoveVerticalLines(movementX:number)
    {
        for(let line of this.verticalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            if(currBegin[0] - movementX < 0)
            {
                line.SetBeginPoint([this.rightBorder - (movementX - currBegin[0])
                    , currBegin[1]]);
                line.SetEndPoint([this.rightBorder - (movementX - currBegin[0])
                    , currEnd[1]]);
            }
            else if((currBegin[0] - movementX) + this.lineThickness > this.rightBorder)
            {
                let overMoveValue:number = (currBegin[0] - movementX) - this.rightBorder;
                line.SetBeginPoint([overMoveValue, currBegin[1]]);
                line.SetEndPoint([overMoveValue, currEnd[1]]);
            }
            else
            {
                line.SetBeginPoint([currBegin[0] - movementX, currBegin[1]]);
                line.SetEndPoint([currEnd[0] - movementX, currEnd[1]]);
            }
        }
    }

    private MoveHorizontalLines(movementY:number)
    {
        for(let line of this.horizontalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            if(currBegin[1] - movementY < this.topBorder)
            {
                line.SetBeginPoint([currBegin[0], this.botBorder - (movementY - currBegin[1])]);
                line.SetEndPoint([currEnd[0], this.botBorder - (movementY - currEnd[1])]);
            }
            else if((currBegin[1] - movementY) + this.lineThickness > this.botBorder)
            {
                let overMoveValue:number = (currBegin[1] - movementY) - this.botBorder;
                line.SetBeginPoint([currBegin[0], overMoveValue]);
                line.SetEndPoint([currEnd[0], overMoveValue]);
            }
            else
            {
                line.SetBeginPoint([currBegin[0], currBegin[1] - movementY]);
                line.SetEndPoint([currEnd[0], currEnd[1] - movementY]);
            }
        }
    }

    private MoveCellsHorizontally(movementX:number)
    {
        for(let y:number = 0; y < this.horizontalLinesCount; y++)
        {
            for (let x: number = 0; x < this.verticalLinesCount; x++)
            {
                let currentCell: Cell = this.cells[y][x];
                let beginPoint: [number, number] = currentCell.GetBeginPoint();
                let endPoint: [number, number] = currentCell.GetEndPoint();

                if ((beginPoint[0] - movementX) + this.lineThickness > this.rightBorder - this.cellSize / 2)
                {
                    let shift: number = (beginPoint[0] - movementX) - this.rightBorder;
                    currentCell.SetBeginPoint(shift, beginPoint[1]);
                }
                else if ((endPoint[0] - movementX) < this.leftBorder)
                {
                    let shift: number = movementX - endPoint[0] - this.lineThickness ;
                    currentCell.SetBeginPoint(this.rightBorder - (this.cellSize + shift), beginPoint[1]);
                }
                else
                {
                    currentCell.SetBeginPoint(beginPoint[0] - movementX, beginPoint[1]);
                }
            }
        }
    }

    private MoveCellsVertically(movementY:number)
    {
        for(let y:number = 0; y < this.horizontalLinesCount; y++)
        {
            for(let x:number = 0; x < this.verticalLinesCount; x++)
            {
                let currentCell:Cell = this.cells[y][x];
                let beginPoint:[number, number] = currentCell.GetBeginPoint();
                let endPoint:[number, number] = currentCell.GetEndPoint();

                if(endPoint[1] - movementY < this.topBorder)
                {
                    let shift:number = this.botBorder - (movementY - endPoint[1]) - this.cellSize + this.lineThickness;
                    currentCell.SetBeginPoint(beginPoint[0], shift);
                }
                else if((beginPoint[1] - movementY) + this.lineThickness > this.botBorder - this.cellSize / 2)
                {
                    let shift:number = (beginPoint[1] - movementY) - this.botBorder;
                    currentCell.SetBeginPoint(beginPoint[0], shift);
                }
                else
                {
                    currentCell.SetBeginPoint(beginPoint[0], beginPoint[1] - movementY);
                }
            }
        }
    }

    public Move(movementX:number, movementY:number)
    {
        this.calculationHelper.RecalculateCellsData(this.cells
            , this.horizontalLinesCount
            , this.verticalLinesCount
            , this.offsetX
            , this.offsetY
            , this.cellSize);
        movementX = -movementX;
        movementY = -movementY;

        this.offsetX += movementX;
        this.offsetY += movementY;

        if(this.offsetX + movementX <= 0)
        {
            movementX -= this.offsetX;
            this.offsetX = 0;
        }

        if(this.offsetY + movementY <= 0)
        {
            movementY -= this.offsetY;
            this.offsetY = 0;
        }

        this.MoveVerticalLines(movementX);
        this.MoveHorizontalLines(movementY);

        this.MoveCellsHorizontally(movementX);
        this.MoveCellsVertically(movementY);
    }

    public Draw(ctx:CanvasRenderingContext2D)
    {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        for(let line of this.horizontalLines)
        {
            line.Draw(ctx);
        }

        for(let line of this.verticalLines)
        {
            line.Draw(ctx);
        }

        for(let y:number = 0; y < this.horizontalLinesCount; y++)
        {
            for(let x:number = 0; x < this.verticalLinesCount; x++)
            {
                this.cells[y][x].Draw(ctx);
            }
        }
    }
}