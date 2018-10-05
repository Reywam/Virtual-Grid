export class GridSettings
{
    private _lineThickness:number = 1;
    private _lineColor:string;
    private _cellSize:number;
    private _backgroundColor:string;
    private _rightBorder:number;
    private _topBorder:number = 0;
    private _leftBorder:number = 0;
    private _botBorder:number;

    get botBorder(): number
    {
        return this._botBorder;
    }

    set botBorder(value: number)
    {
        this._botBorder = value;
    }

    get leftBorder(): number
    {
        return this._leftBorder;
    }

    set leftBorder(value: number)
    {
        this._leftBorder = value;
    }

    get topBorder(): number
    {
        return this._topBorder;
    }

    set topBorder(value: number)
    {
        this._topBorder = value;
    }

    get rightBorder(): number
    {
        return this._rightBorder;
    }

    set rightBorder(value: number)
    {
        this._rightBorder = value;
    }

    get backgroundColor(): string
    {
        return this._backgroundColor;
    }

    set backgroundColor(value: string)
    {
        this._backgroundColor = value;
    }

    get cellSize(): number
    {
        return this._cellSize;
    }

    set cellSize(value: number)
    {
        this._cellSize = value;
    }

    get lineColor(): string
    {
        return this._lineColor;
    }

    set lineColor(value: string)
    {
        this._lineColor = value;
    }

    get lineThickness(): number
    {
        return this._lineThickness;
    }

    set lineThickness(value: number)
    {
        this._lineThickness = value;
    }
}