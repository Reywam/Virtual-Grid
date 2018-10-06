import {Line} from "./Components/Line";
import {Cell} from "./Components/Cell";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {IShapeCreator} from "../Creators/IShapeCreator";
import {ShapeState} from "../Shapes/ShapeState";
import {GridSettings} from "./GridSettings";

export class VirtualGrid
{
    private settings:GridSettings;
    private horizontalLines:Array<Line>;
    private verticalLines:Array<Line>;
    private cells:Cell[][] = [];
    private calculationHelper:GridCalculationHelper;

    private offsetX:number = 0;
    private offsetY:number = 0;

    public constructor(startSettings:GridSettings, calculationHelper:GridCalculationHelper, shapeCreator:IShapeCreator)
    {
        this.settings = startSettings;

        this.calculationHelper = calculationHelper;
        let verticalLinesCount = Math.round(this.settings.rightBorder / this.settings.cellSize) + 1;
        let horizontalLinesCount = Math.round(this.settings.botBorder / this.settings.cellSize) + 1;
        this.horizontalLines = new Array(horizontalLinesCount);
        this.verticalLines = new Array(verticalLinesCount);

        this.calculationHelper.CreateGridLines(this.horizontalLines
            , this.verticalLines
            , horizontalLinesCount
            , verticalLinesCount
            , this.settings);

        let additionalBorderValues:[number, number]
                = this.calculationHelper.CalculateAdditionalBorderValues(horizontalLinesCount
                                                                    , verticalLinesCount
                                                                    , this.settings);
        this.calculationHelper.CalculateNewBorderValues(additionalBorderValues[0]
            , additionalBorderValues[1], this.settings);

        this.calculationHelper.CalculateNewCellArray(this.cells
            , this.horizontalLines
            , this.verticalLines
            , this.settings.cellSize
            , this.settings.dataFontSize
            , shapeCreator);
    }

    public ChangeCellSize(size:number, canvasWidth:number, canvasHeight:number, shapeCreator:IShapeCreator)
    {
        this.settings.cellSize = size;
        this.settings.rightBorder = canvasWidth;
        this.settings.botBorder = canvasHeight;

        let verticalLinesCount = Math.round(canvasWidth / size) + 1;
        let horizontalLinesCount = Math.round(canvasHeight / size) + 1;

        let additionalBorderValues:[number, number]
            = this.calculationHelper.CalculateAdditionalBorderValues(horizontalLinesCount
            , verticalLinesCount
            , this.settings);
        this.calculationHelper.CalculateNewBorderValues(additionalBorderValues[0]
            , additionalBorderValues[1]
            , this.settings);

        this.verticalLines = [];
        this.horizontalLines = [];
        this.calculationHelper.CreateGridLines(this.horizontalLines
            , this.verticalLines
            , horizontalLinesCount
            , verticalLinesCount
            , this.settings);

        const currentShapeState:ShapeState = this.cells[0][0].GetBackgroundShape().GetState();
        shapeCreator.SetShapeColor(currentShapeState.color);
        shapeCreator.SetShapeSize(currentShapeState.size);

        this.calculationHelper.CalculateNewCellArray(this.cells
            , this.horizontalLines
            , this.verticalLines
            , this.settings.cellSize
            , this.settings.dataFontSize
            , shapeCreator);

        this.ChangeTextSize(this.settings.dataFontSize);

        this.calculationHelper.RecalculateCellsData(this.cells
            , horizontalLinesCount
            , verticalLinesCount
            , this.offsetX
            , this.offsetY
            , this.settings.cellSize);
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
        this.settings.backgroundColor = color;
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

    public ChangeCellShape(shapeCreator:IShapeCreator)
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
        this.settings.dataFontSize = size;
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
                line.SetBeginPoint([this.settings.rightBorder - (movementX - currBegin[0])
                    , currBegin[1]]);
                line.SetEndPoint([this.settings.rightBorder - (movementX - currBegin[0])
                    , currEnd[1]]);
            }
            else if((currBegin[0] - movementX) + this.settings.lineThickness > this.settings.rightBorder)
            {
                let overMoveValue:number = (currBegin[0] - movementX) - this.settings.rightBorder;
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

            if(currBegin[1] - movementY < this.settings.topBorder)
            {
                line.SetBeginPoint([currBegin[0], this.settings.botBorder - (movementY - currBegin[1])]);
                line.SetEndPoint([currEnd[0], this.settings.botBorder - (movementY - currEnd[1])]);
            }
            else if((currBegin[1] - movementY) + this.settings.lineThickness > this.settings.botBorder)
            {
                let overMoveValue:number = (currBegin[1] - movementY) - this.settings.botBorder;
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
        for(let y:number = 0; y < this.horizontalLines.length; y++)
        {
            for (let x: number = 0; x < this.verticalLines.length; x++)
            {
                let currentCell: Cell = this.cells[y][x];
                let beginPoint: [number, number] = currentCell.GetBeginPoint();
                let endPoint: [number, number] = currentCell.GetEndPoint();

                if ((beginPoint[0] - movementX) + this.settings.lineThickness
                    > this.settings.rightBorder - this.settings.cellSize / 2)
                {
                    let shift: number = (beginPoint[0] - movementX) - this.settings.rightBorder;
                    currentCell.SetBeginPoint(shift, beginPoint[1]);
                }
                else if ((endPoint[0] - movementX) < this.settings.leftBorder)
                {
                    let shift: number = movementX - endPoint[0];
                    currentCell.SetBeginPoint(this.settings.rightBorder - (this.settings.cellSize + shift)
                        , beginPoint[1]);
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
        for(let y:number = 0; y < this.horizontalLines.length; y++)
        {
            for(let x:number = 0; x < this.verticalLines.length; x++)
            {
                let currentCell:Cell = this.cells[y][x];
                let beginPoint:[number, number] = currentCell.GetBeginPoint();
                let endPoint:[number, number] = currentCell.GetEndPoint();

                if(endPoint[1] - movementY < this.settings.topBorder)
                {
                    let shift:number = this.settings.botBorder - (movementY - endPoint[1])
                        - this.settings.cellSize;
                    currentCell.SetBeginPoint(beginPoint[0], shift);
                }
                else if((beginPoint[1] - movementY) + this.settings.lineThickness
                    > this.settings.botBorder - this.settings.cellSize / 2)
                {
                    let shift:number = (beginPoint[1] - movementY) - this.settings.botBorder;
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
            , this.horizontalLines.length
            , this.verticalLines.length
            , this.offsetX
            , this.offsetY
            , this.settings.cellSize);
        movementX = -movementX;
        movementY = -movementY;

        this.offsetX += movementX;
        this.offsetY += movementY;

        if(this.offsetX <= 0)
        {
            movementX -= this.offsetX;
            this.offsetX = 0;
        }

        if(this.offsetY <= 0)
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
        ctx.fillStyle = this.settings.backgroundColor;
        ctx.fillRect(0,0, ctx.canvas.width, ctx.canvas.height);
        for(let line of this.horizontalLines)
        {
            line.Draw(ctx);
        }

        for(let line of this.verticalLines)
        {
            line.Draw(ctx);
        }

        for(let y:number = 0; y < this.horizontalLines.length; y++)
        {
            for(let x:number = 0; x < this.verticalLines.length; x++)
            {
                this.cells[y][x].Draw(ctx);
            }
        }
    }
}