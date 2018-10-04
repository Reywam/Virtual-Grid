import {VirtualGrid} from "./VirtualGrid";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {RectangleCreator} from "./RectangleCreator";
import {CircleCreator} from "./CircleCreator";
import {IShapeCreator} from "./IShapeCreator";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const INITIAL_SHAPE_SIZE:number = 50;
const INITIAL_SHAPE_COLOR:string = "#00ff00";
const INITIAL_CELL_SIZE:number = 100;
const INITIAL_LINE_COLOR:string = "#000000";
const INITIAL_BACKGROUND_COLOR:string = "#dee2eb";
const INITIAL_TEXT_COLOR:string = "#000000";

let calculationHelper:GridCalculationHelper = new GridCalculationHelper(ctx);
let shapeCreator:IShapeCreator  = new RectangleCreator(INITIAL_SHAPE_SIZE, INITIAL_SHAPE_COLOR);

let cellSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("cellSize");
let shapeSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("shapeSize");
let textSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("textSize");
let circleCheckbox:HTMLInputElement = <HTMLInputElement> document.getElementById("circle");
let rectangleCheckbox:HTMLInputElement = <HTMLInputElement> document.getElementById("square");
let gridColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("backgroundColor");
let shapeColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("shapeColor");
let textColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("textColor");

cellSizeInput.value = INITIAL_CELL_SIZE.toString();
shapeSizeInput.value = INITIAL_SHAPE_SIZE.toString();
shapeColorInput.value = INITIAL_SHAPE_COLOR.toString();
gridColorInput.value = INITIAL_BACKGROUND_COLOR.toString();
textColorInput.value = INITIAL_TEXT_COLOR.toString();

cellSizeInput.addEventListener("change", ResetCellSize);
shapeSizeInput.addEventListener("change", ResetShapeSize);
textSizeInput.addEventListener("change", ResetTextSize);
rectangleCheckbox.addEventListener("change", ChooseShape);
circleCheckbox.addEventListener("change", ChooseShape);

gridColorInput.addEventListener("change", ChangeGridColor);
shapeColorInput.addEventListener("change", ChangeShapeColor);
textColorInput.addEventListener("change", ChangeTextColor);

function ChooseShape()
{
    if(circleCheckbox.checked && !rectangleCheckbox.checked)
    {
        shapeCreator = new CircleCreator(shapeSizeInput.valueAsNumber, INITIAL_SHAPE_COLOR);
    }
    else if (rectangleCheckbox.checked && !circleCheckbox.checked)
    {
        shapeCreator = new RectangleCreator(shapeSizeInput.valueAsNumber, INITIAL_SHAPE_COLOR);
    }
    else
    {
        return;
    }
    grid.ChangeCellsShape(shapeCreator);
}

function ChangeGridColor()
{
    grid.ChangeGridColor(gridColorInput.value);
}

function ChangeShapeColor()
{
    grid.ChangeShapeColor(shapeColorInput.value);
}

function ChangeTextColor()
{
    grid.ChangeTextColor(textColorInput.value);
}

function ResetCellSize()
{
    grid.ResetCellSize(cellSizeInput.valueAsNumber, canvas.width, canvas.height, shapeCreator);
}

function ResetShapeSize()
{
    grid.ResetShapeSize(shapeSizeInput.valueAsNumber);
}

function ResetTextSize()
{
    grid.ResetTextSize(textSizeInput.valueAsNumber);
}

let grid:VirtualGrid = new VirtualGrid(canvas.width
    , canvas.height
    , INITIAL_CELL_SIZE
    , INITIAL_LINE_COLOR
    , INITIAL_BACKGROUND_COLOR
    , calculationHelper
    , shapeCreator);

let mouseBtnPressed:boolean = false;

function mouseDown(): void
{
    mouseBtnPressed = true;
}

function mouseUp(): void
{
    mouseBtnPressed = false;
}

function mouseMove(event: MouseEvent): void
{
    if(mouseBtnPressed)
    {
        grid.Move(event.movementX, event.movementY);
    }
}

ctx.canvas.addEventListener("mousedown", mouseDown);
ctx.canvas.addEventListener("mouseup", mouseUp);
ctx.canvas.addEventListener("mousemove", mouseMove);

function Render()
{
    requestAnimationFrame(Render);
    grid.Draw(ctx);
}

Render();