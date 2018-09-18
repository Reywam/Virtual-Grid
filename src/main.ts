import {VirtualGrid} from "./VirtualGrid";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let grid:VirtualGrid = new VirtualGrid(canvas.width, canvas.height,50, "#ff0000", 2);

function Render()
{
    grid.MoveDown(1);
    grid.Draw(ctx);
    requestAnimationFrame(Render);
}

Render();