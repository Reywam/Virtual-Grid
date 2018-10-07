import {VirtualGrid} from "./Grid/VirtualGrid";
import {GridCalculationHelper} from "./Grid/GridCalculationHelper";
import {RectangleCreator} from "./Creators/RectangleCreator";
import {IShapeCreator} from "./Creators/IShapeCreator";
import {AppConfig} from "./Config/AppConfig";
import {GridSettings} from "./Grid/GridSettings";
import {GridController} from "./Grid/GridController";

let canvas = <HTMLCanvasElement> document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
let calculationHelper:GridCalculationHelper = new GridCalculationHelper(ctx);
let shapeCreator:IShapeCreator  = new RectangleCreator(AppConfig.INITIAL_SHAPE_SIZE, AppConfig.INITIAL_SHAPE_COLOR);

const startGridSettings:GridSettings = new GridSettings(canvas.width, canvas.height);
let grid:VirtualGrid = new VirtualGrid(startGridSettings, calculationHelper, shapeCreator);

let controller:GridController = new GridController(grid, ctx, shapeCreator);
controller.SetupUIListeners();

function Render()
{
    grid.Draw(ctx);

    requestAnimationFrame(Render);
}

Render();