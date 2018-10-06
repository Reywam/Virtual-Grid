import {VirtualGrid} from "./VirtualGrid";
import {AppConfig} from "../Config/AppConfig";
import {RectangleCreator} from "../Creators/RectangleCreator";
import {CircleCreator} from "../Creators/CircleCreator";
import {UI} from "./UI";
import {IShapeCreator} from "../Creators/IShapeCreator";

export class GridController
{
    private _grid:VirtualGrid;
    private canvasWidth:number;
    private canvasHeight:number;
    private mouseBtnPressed:boolean = false;
    private userInterface:UI = new UI;
    private shapeCreator:IShapeCreator;

    constructor(grid:VirtualGrid, ctx:CanvasRenderingContext2D, shapeCreator:IShapeCreator)
    {
        this._grid = grid;
        this.canvasHeight = ctx.canvas.height;
        this.canvasWidth = ctx.canvas.width;
        this.shapeCreator = shapeCreator;
        ctx.canvas.addEventListener("mousedown", this.MouseDown);
        ctx.canvas.addEventListener("mouseup", this.MouseUp);
        ctx.canvas.addEventListener("mousemove", this.MouseMove);
    }

    public SetupUIListeners()
    {
        this.userInterface.cellSizeInput.addEventListener("change", this.ChangeCellSize);
        this.userInterface.shapeSizeInput.addEventListener("change", this.ChangeShapeSize);
        this.userInterface.textSizeInput.addEventListener("change", this.ChangeTextSize);
        this.userInterface.rectangleCheckbox.addEventListener("change", this.ChooseShape);
        this.userInterface.circleCheckbox.addEventListener("change", this.ChooseShape);

        this.userInterface.gridColorInput.addEventListener("change", this.ChangeGridColor);
        this.userInterface.shapeColorInput.addEventListener("change", this.ChangeShapeColor);
        this.userInterface.textColorInput.addEventListener("change", this.ChangeTextColor);
    }

    MouseMove = (event: MouseEvent) =>
    {
        if(this.mouseBtnPressed)
        {
            this._grid.Move(event.movementX, event.movementY);
        }
    };

    MouseDown = () =>
    {
        this.mouseBtnPressed = true;
    };

    MouseUp = () =>
    {
        this.mouseBtnPressed = false;
    };

    ChooseShape = () =>
    {
        if(this.userInterface.circleCheckbox.checked && !this.userInterface.rectangleCheckbox.checked)
        {
            this.shapeCreator = new CircleCreator(this.userInterface.shapeSizeInput.valueAsNumber
                , AppConfig.INITIAL_SHAPE_COLOR);
        }
        else if (this.userInterface.rectangleCheckbox.checked && !this.userInterface.circleCheckbox.checked)
        {
            this.shapeCreator = new RectangleCreator(this.userInterface.shapeSizeInput.valueAsNumber
                , AppConfig.INITIAL_SHAPE_COLOR);
        }
        else
        {
            return;
        }
        this._grid.ChangeCellShape(this.shapeCreator);
    };

    ChangeGridColor = () =>
    {
        this._grid.ChangeGridColor(this.userInterface.gridColorInput.value);
    };

    ChangeShapeColor = () =>
    {
        this._grid.ChangeShapeColor(this.userInterface.shapeColorInput.value);
    };

    ChangeTextColor = () =>
    {
        this._grid.ChangeTextColor(this.userInterface.textColorInput.value);
    };

    ChangeCellSize = () =>
    {
        this._grid.ChangeCellSize(this.userInterface.cellSizeInput.valueAsNumber
            , this.canvasWidth, this.canvasHeight, this.shapeCreator);
    };

    ChangeShapeSize = () =>
    {
        this._grid.ChangeShapeSize(this.userInterface.shapeSizeInput.valueAsNumber);
    };

    ChangeTextSize = () =>
    {
        this._grid.ChangeTextSize(this.userInterface.textSizeInput.valueAsNumber);
    };
}