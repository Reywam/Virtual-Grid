export class ShapeState
{
    private _size:number;
    private _drawCenter:[number, number];
    private _color:string;

    constructor(size:number, drawCenter:[number, number], color:string)
    {
        this._size = size;
        this._drawCenter = drawCenter;
        this._color = color;
    }

    get drawCenter(): [number, number]
    {
        return this._drawCenter;
    }

    set drawCenter(value: [number, number])
    {
        this._drawCenter = value;
    }

    get color(): string
    {
        return this._color;
    }

    set color(value: string)
    {
        this._color = value;
    }

    get size(): number
    {
        return this._size;
    }

    set size(value: number)
    {
        this._size = value;
    }
}