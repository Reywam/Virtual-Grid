import {VirtualGrid} from "./VirtualGrid";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {RectangleCreator} from "./RectangleCreator";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

const INITIAL_SHAPE_SIZE:number = 50;
const INITIAL_SHAPE_COLOR:string = "#00ff00";
const CELL_SIZE:number = 100;
const LINE_COLOR:string = "#000000";
const BACKGROUND_COLOR:string = "#dee2eb";

let calculationHelper:GridCalculationHelper = new GridCalculationHelper(ctx);
let shapeCreator:RectangleCreator = new RectangleCreator(INITIAL_SHAPE_SIZE, INITIAL_SHAPE_COLOR);

let grid:VirtualGrid = new VirtualGrid(canvas.width
    , canvas.height
    , CELL_SIZE
    , LINE_COLOR
    , BACKGROUND_COLOR
    , calculationHelper
    , shapeCreator);

let mouseBtnPressed:boolean = false;

function mouseDown(): void {
    mouseBtnPressed = true;
}

function mouseUp(): void {
    mouseBtnPressed = false;
}

ctx.canvas.addEventListener("mousedown", mouseDown);
ctx.canvas.addEventListener("mouseup", mouseUp);
ctx.canvas.addEventListener("mousemove", mouseMove);

function mouseMove(event: MouseEvent): void
{
    if(mouseBtnPressed)
    {
        grid.Move(event.movementX, event.movementY);
    }
}

const FPS:number = 60;
function Render() {
    setTimeout(function() {
        requestAnimationFrame(Render);
        grid.Draw(ctx);
    }, 1000 / FPS);
}

Render();