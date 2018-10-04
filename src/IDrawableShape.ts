import {ShapeState} from "./ShapeState";

export interface IDrawableShape {
    Draw(ctx:CanvasRenderingContext2D):void;
    SetDrawCenter(x:number, y:number):void;
    GetState():ShapeState;
    SetState(state:ShapeState):void;
    SetSize(size:number):void;
}