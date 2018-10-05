import {Cell} from "./Cell";
import {Line} from "./Line";
import {IShapeCreator} from "./IShapeCreator";
import {GridSettings} from "./GridSettings";

export class GridCalculationHelper
{
    private ctx:CanvasRenderingContext2D;
    constructor(ctx:CanvasRenderingContext2D)
    {
        this.ctx = ctx;
    }

    public CalculateDataWidth(data:string):number
    {
        return this.ctx.measureText(data).width;
    }

    private RecalculateCellData(cell:Cell, offsetX:number, offsetY:number, cellSize:number)
    {
        let beginPoint:[number, number] = cell.GetBeginPoint();
        let valueX:number = (offsetX + beginPoint[0]) / cellSize;
        let valueY:number = (offsetY + beginPoint[1]) / cellSize;
        let newCellData:string = Math.round(valueX) + "-" + Math.round(valueY);
        this.CalculateDataWidth(newCellData);
        cell.SetData(newCellData);
    }

    public CreateLineArray(lines:Line[]
                           , arrayLength:number
                           , stepX:number
                           , stepY:number
                           , lineStart:[number, number]
                           , lineEnd:[number, number]
                           , gridSettings:GridSettings)
    {
        for(let i = 0 ; i < arrayLength; i++)
        {
            lines[i] = new Line(lineStart[0], lineStart[1], lineEnd[0], lineEnd[1]
                , gridSettings.lineColor, gridSettings.lineThickness);
            lineStart[0] += stepX;
            lineStart[1] += stepY;
            lineEnd[0] += stepX;
            lineEnd[1] += stepY;
        }
    }

    public RecalculateCellsData(cells:Cell[][]
                                 , horizontalLinesCount:number
                                 , verticalLinesCount:number
                                 , offsetX:number
                                 , offsetY:number
                                 , cellSize:number)
    {
        for(let y:number = 0; y < horizontalLinesCount; y++)
        {
            for(let x:number = 0; x < verticalLinesCount; x++)
            {
                this.RecalculateCellData(cells[y][x], offsetX, offsetY, cellSize);
            }
        }
    }

    public CalculateAdditionalBorderValues(horizontalLinesCount:number
                                          , verticalLinesCount:number
                                          , gridSettings:GridSettings):[number, number]
    {
        let additionalHorizontalBorderLength = verticalLinesCount * gridSettings.cellSize - gridSettings.rightBorder;
        let additionalVerticalBorderLength = horizontalLinesCount * gridSettings.cellSize - gridSettings.botBorder;
        return [additionalHorizontalBorderLength, additionalVerticalBorderLength];
    }

    public CalculateNewBorderValues(additionalHorizontalBorderLength:number
        , additionalVerticalBorderLength:number
        , gridSettings:GridSettings)
    {
        if(additionalHorizontalBorderLength > 0)
        {
            gridSettings.rightBorder += additionalHorizontalBorderLength;
        }

        if(additionalVerticalBorderLength > 0)
        {
            gridSettings.botBorder += additionalVerticalBorderLength;
        }
    }

    public CalculateNewCellArray(cells:Cell[][]
                                 , horizontalLines:Line[]
                                 , verticalLines:Line[]
                                 , cellSize:number
                                 , shapeCreator:IShapeCreator)
    {
        for(let y:number = 0; y < horizontalLines.length; y++)
        {
            cells[y] = [];
            for(let x:number = 0; x < verticalLines.length; x++)
            {
                let verticalStartPoint:number = horizontalLines[y].GetBeginPoint()[1];
                let horizontalStartPoint:number = verticalLines[x].GetBeginPoint()[0];
                let cellStartPoint = [horizontalStartPoint,verticalStartPoint];
                let cellData:string = x + "-" + y;
                cells[y][x] = new Cell(cellStartPoint[0]
                    , cellStartPoint[1]
                    , cellSize
                    , cellData
                    , shapeCreator.CreateShape());
            }
        }
    }
}