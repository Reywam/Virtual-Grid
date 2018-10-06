import {AppConfig} from "../Config/AppConfig";

export class UI
{
    private _cellSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("cellSize");
    private _shapeSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("shapeSize");
    private _textSizeInput:HTMLInputElement = <HTMLInputElement> document.getElementById("textSize");
    private _circleCheckbox:HTMLInputElement = <HTMLInputElement> document.getElementById("circle");
    private _rectangleCheckbox:HTMLInputElement = <HTMLInputElement> document.getElementById("square");
    private _gridColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("backgroundColor");
    private _shapeColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("shapeColor");
    private _textColorInput:HTMLInputElement = <HTMLInputElement> document.getElementById("textColor");

    constructor()
    {
        this._cellSizeInput.value = AppConfig.INITIAL_CELL_SIZE.toString();
        this._shapeSizeInput.value = AppConfig.INITIAL_SHAPE_SIZE.toString();
        this._shapeColorInput.value = AppConfig.INITIAL_SHAPE_COLOR.toString();
        this._gridColorInput.value = AppConfig.INITIAL_BACKGROUND_COLOR.toString();
        this._textColorInput.value = AppConfig.INITIAL_TEXT_COLOR.toString();
        this._textSizeInput.value = AppConfig.INITIAL_TEXT_SIZE.toString();
        this._rectangleCheckbox.checked = true;
    }

    get textColorInput(): HTMLInputElement
    {
        return this._textColorInput;
    }

    set textColorInput(value: HTMLInputElement)
    {
        this._textColorInput = value;
    }

    get shapeColorInput(): HTMLInputElement
    {
        return this._shapeColorInput;
    }

    set shapeColorInput(value: HTMLInputElement)
    {
        this._shapeColorInput = value;
    }

    get gridColorInput(): HTMLInputElement
    {
        return this._gridColorInput;
    }

    set gridColorInput(value: HTMLInputElement)
    {
        this._gridColorInput = value;
    }

    get rectangleCheckbox(): HTMLInputElement
    {
        return this._rectangleCheckbox;
    }

    set rectangleCheckbox(value: HTMLInputElement)
    {
        this._rectangleCheckbox = value;
    }

    get circleCheckbox(): HTMLInputElement
    {
        return this._circleCheckbox;
    }

    set circleCheckbox(value: HTMLInputElement)
    {
        this._circleCheckbox = value;
    }

    get textSizeInput(): HTMLInputElement
    {
        return this._textSizeInput;
    }

    set textSizeInput(value: HTMLInputElement)
    {
        this._textSizeInput = value;
    }

    get shapeSizeInput(): HTMLInputElement
    {
        return this._shapeSizeInput;
    }

    set shapeSizeInput(value: HTMLInputElement)
    {
        this._shapeSizeInput = value;
    }

    get cellSizeInput(): HTMLInputElement
    {
        return this._cellSizeInput;
    }

    set cellSizeInput(value: HTMLInputElement)
    {
        this._cellSizeInput = value;
    }
}