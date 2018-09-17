import {VirtualGrid} from "./VirtualGrid";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let grid:VirtualGrid = new VirtualGrid(ctx, 50, "#ff0000", 2);
grid.Draw();