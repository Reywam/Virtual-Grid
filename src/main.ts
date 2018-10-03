import {VirtualGrid} from "./VirtualGrid";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {RectangleCreator} from "./RectangleCreator";
import {CircleCreator} from "./CircleCreator";
import {IShapeCreator} from "./IShapeCreator";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const INITIAL_SHAPE_SIZE:number = 0;
const INITIAL_SHAPE_COLOR:string = "#00ff00";
const CELL_SIZE:number = 90;
const LINE_COLOR:string = "#000000";
const BACKGROUND_COLOR:string = "#dee2eb";

let calculationHelper:GridCalculationHelper = new GridCalculationHelper(ctx);
let shapeCreator:IShapeCreator  = new RectangleCreator(INITIAL_SHAPE_SIZE, INITIAL_SHAPE_COLOR);

let cellSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("cellSize");
let shapeSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("shapeSize");
let textSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("textSize");

cellSizeInput.addEventListener("change", ResetCellSize);
shapeSizeInput.addEventListener("change", ResetShapeSize);
textSizeInput.addEventListener("change", ResetTextSize);

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
    , CELL_SIZE
    , LINE_COLOR
    , BACKGROUND_COLOR
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

const FPS:number = 60;
function Render() {
    setTimeout(function() {
        requestAnimationFrame(Render);
        grid.Draw(ctx);
    }, 1000 / FPS);
}

Render();