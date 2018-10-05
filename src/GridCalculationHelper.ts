import {Cell} from "./Cell";
import {Line} from "./Line";
import {IShapeCreator} from "./IShapeCreator";

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
                                          , cellSize:number
                                          , rightBorder:number
                                          , botBorder:number):[number, number]
    {
        let additionalHorizontalBorderLength = verticalLinesCount * cellSize - rightBorder;
        let additionalVerticalBorderLength = horizontalLinesCount * cellSize - botBorder;
        return [additionalHorizontalBorderLength, additionalVerticalBorderLength];
    }

    public CalculateNewBorderValues(additionalHorizontalBorderLength:number
                              , additionalVerticalBorderLength:number
                              , rightBorder:number
                              , botBorder:number):[number, number]
    {
        if(additionalHorizontalBorderLength > 0)
        {
            rightBorder += additionalHorizontalBorderLength;
        }

        if(additionalVerticalBorderLength > 0)
        {
            botBorder += additionalVerticalBorderLength;
        }
        return [rightBorder, botBorder];
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