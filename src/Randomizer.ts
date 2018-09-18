export class Randomizer
{
    private m = 0x80000000; // 2**31;
    private a = 1103515245;
    private c = 12345;
    private state:number;

    constructor(seed:number)
    {
        this.state = seed ? seed : Math.floor(Math.random() * (this.m-1));
    }

    public generateInt():number
    {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }

    public generateIntInRange(start:number, end:number):number
    {
        let rangeSize = end - start;
        let randomUnder1 = this.generateInt() / this.m;
        return start + Math.floor(randomUnder1 * rangeSize);
    }
}