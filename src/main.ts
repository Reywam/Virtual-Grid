import {VirtualGrid} from "./Grid/VirtualGrid";
import {GridCalculationHelper} from "./Grid/GridCalculationHelper";
import {RectangleCreator} from "./Creators/RectangleCreator";
import {CircleCreator} from "./Creators/CircleCreator";
import {IShapeCreator} from "./Creators/IShapeCreator";

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
const INITIAL_TEXT_SIZE:number = 15;

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
textSizeInput.value = INITIAL_TEXT_SIZE.toString();

cellSizeInput.addEventListener("change", ChangeCellSize);
shapeSizeInput.addEventListener("change", ChangeShapeSize);
textSizeInput.addEventListener("change", ChangeTextSize);
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

function ChangeCellSize()
{
    grid.ChangeCellSize(cellSizeInput.valueAsNumber, canvas.width, canvas.height, shapeCreator);
}

function ChangeShapeSize()
{
    grid.ChangeShapeSize(shapeSizeInput.valueAsNumber);
}

function ChangeTextSize()
{
    grid.ChangeTextSize(textSizeInput.valueAsNumber);
}

let grid:VirtualGrid = new VirtualGrid(canvas.width
    , canvas.height
    , INITIAL_CELL_SIZE
    , INITIAL_TEXT_SIZE
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