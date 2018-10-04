import {IDrawableShape} from "./IDrawableShape";

export interface IShapeCreator
{
    CreateShape():IDrawableShape;
    SetShapeSize(size:number):void;
    SetShapeColor(color:string):void;
}