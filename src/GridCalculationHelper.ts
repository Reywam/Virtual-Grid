import {Cell} from "./Cell";

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

}