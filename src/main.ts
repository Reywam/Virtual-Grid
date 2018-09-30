import {VirtualGrid} from "./VirtualGrid";
import {GridCalculationHelper} from "./GridCalculationHelper";
import {Circle} from "./Circle";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");

let calculationHelper:GridCalculationHelper = new GridCalculationHelper(ctx);
let grid:VirtualGrid = new VirtualGrid(canvas.width
    , canvas.height
    ,100
    , "#000000"
    , "#dee2eb"
    , calculationHelper);

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

function Render()
{
    requestAnimationFrame(Render);
    grid.Draw(ctx);
}

Render();