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
    private backgroundColor:string;

    private rightBorder:number;
    private topBorder:number = 0;
    private leftBorder:number = 0;
    private botBorder:number;

    private offsetX:number = 0;
    private offsetY:number = 0;

    public constructor(canvasWidth:number
                , canvasHeight:number
                , cellSize:number
                , lineColor:string = "#000000"
                , backgroundColor = "$ffffff"
                , lineThickness:number = 1)
    {
        this.cellSize = cellSize;
        this.lineColor = lineColor;
        this.backgroundColor = backgroundColor;
        this.lineThickness = lineThickness;
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

        let additionalHorizontalBorderLength = this.verticalLinesCount * this.cellSize - this.rightBorder;
        if(additionalHorizontalBorderLength > 0)
        {
            this.rightBorder += additionalHorizontalBorderLength;
            console.log(additionalHorizontalBorderLength);
        }

        let additionalVerticalBorderLength = this.horizontalLinesCount * this.cellSize - this.botBorder;
        if(additionalVerticalBorderLength > 0)
        {
            this.botBorder += additionalVerticalBorderLength;
            console.log(additionalVerticalBorderLength);
        }
        console.log(this.verticalLines);
    }

    private MoveVerticalLines(movementX:number)
    {
        movementX = -movementX;
        this.offsetX += movementX;
        if(this.offsetX <= 0)
        {
            movementX -= this.offsetX;
            this.offsetX = 0;
        }

        for(let line of this.verticalLines)
        {
            let currBegin = line.GetBeginPoint();
            let currEnd = line.GetEndPoint();

            if(currBegin[0] - movementX< 0)
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
        movementY = -movementY;
        this.offsetY += movementY;
        if(this.offsetY <= 0)
        {
            movementY -= this.offsetY;
            this.offsetY = 0;
        }

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

    public Move(movementX:number, movementY:number)
    {
        console.log(this.offsetX, this.offsetY);
        this.MoveVerticalLines(movementX);
        this.MoveHorizontalLines(movementY);
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
    }
}