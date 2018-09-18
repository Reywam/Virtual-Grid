import {VirtualGrid} from "./VirtualGrid";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let grid:VirtualGrid = new VirtualGrid(canvas.width, canvas.height,50, "#00ff00", 2);

let u:boolean = false;
let d:boolean = false;
let r:boolean = false;
let l:boolean = false;

function setUp()
{
    u = true;
    d = r = l = false;
}

function setDown()
{
    d = true;
    u = r = l = false;
}

function setRight()
{
    r = true;
    d = u = l = false;
}

function setLeft()
{
    l = true;
    d = r = u = false;
}

let upBtn = document.getElementById("up");
upBtn.addEventListener("click", (e:Event)=>setUp());

let downBtn = document.getElementById("down");
downBtn.addEventListener("click", (e:Event)=>setDown());

let rightBtn = document.getElementById("right");
rightBtn.addEventListener("click", (e:Event)=>setRight());

let leftBtn = document.getElementById("left");
leftBtn.addEventListener("click", (e:Event)=>setLeft());

function Render()
{
    if(u)
    {
        grid.MoveUp(1);
    }
    else if (d)
    {
        grid.MoveDown(1);
    }
    else if (l)
    {
        grid.MoveLeft(1);
    }
    else if (r)
    {
        grid.MoveRight(1);
    }
    grid.Draw(ctx);
    requestAnimationFrame(Render);
}

Render();