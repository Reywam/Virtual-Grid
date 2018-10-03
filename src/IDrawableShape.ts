export interface IDrawableShape {
    Draw(ctx:CanvasRenderingContext2D):void;
    SetDrawCenter(x:number, y:number):void;
    SetSize(size:number):void;
}