import * as indicators from "../";

export class PearsonsCorrelationCoefficeint
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CORREL";
    static INDICATOR_DESCR: string = "Pearson's Correlation Coefficient (r)";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;

    private sumXX: number = 0.0; /* sum of x * x */
    private sumYY: number = 0.0; /* sum of y */
    private sumXY: number = 0.0; /* sum of x * y */
    private sumX: number = 0.0; /* sum of x */
    private sumY: number = 0.0; /* sum of y */

    private sumXXHistory: indicators.Queue<number>;
    private sumYYHistory: indicators.Queue<number>;
    private sumXYHistory: indicators.Queue<number>;
    private sumXHistory: indicators.Queue<number>;
    private sumYHistory: indicators.Queue<number>;

    private trailingSumXX: number = 0.0;
    private trailingSumYY: number = 0.0;
    private trailingSumXY: number = 0.0;
    private trailingSumX: number = 0.0;
    private trailingSumY: number = 0.0;

    /* same as last_price_y except used to remove elements from the trailing summation */
    private tmpReal: number = 0.0;
    private x: number;
    private lastPriceX: number;
    private y: number;
    private lastPriceY: number;

    private periodCounter: number;
    constructor(timePeriod: number = CORREL.TIMEPERIOD_DEFAULT) {
        super(CORREL.INDICATOR_NAME, CORREL.INDICATOR_DESCR);

        if (timePeriod < CORREL.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, CORREL.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = 0;

        this.lastPriceX = 0;
        this.lastPriceY = 0;

        this.sumXXHistory = new indicators.Queue<number>();
        this.sumXXHistory.enqueue(0);
        this.sumXYHistory = new indicators.Queue<number>();
        this.sumXYHistory.enqueue(0);
        this.sumXHistory = new indicators.Queue<number>();
        this.sumXHistory.enqueue(0);
        this.sumYHistory = new indicators.Queue<number>();
        this.sumYHistory.enqueue(0);
        this.sumYYHistory = new indicators.Queue<number>();
        this.sumYYHistory.enqueue(0);

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.periodCounter++;

        if (this.periodCounter < this.timePeriod) {
            this.x = inputData1;
            this.y = inputData2;
            this.sumX += this.x;
            this.sumY += this.y;
            this.sumXY += this.x * this.y;
            this.sumXX += this.x * this.x;
            this.sumYY += this.y * this.y;

            this.sumXHistory.enqueue(this.sumX);
            this.sumXXHistory.enqueue(this.sumXX);
            this.sumXYHistory.enqueue(this.sumXY);
            this.sumYHistory.enqueue(this.sumY);
            this.sumYYHistory.enqueue(this.sumYY);
        } else if (this.periodCounter >= this.timePeriod) {

            this.x = inputData1;
            this.y = inputData2;
            this.sumX += this.x;
            this.sumY += this.y;
            this.sumXY += this.x * this.y;
            this.sumXX += this.x * this.x;
            this.sumYY += this.y * this.y;

            this.sumXHistory.enqueue(this.sumX);
            this.sumXXHistory.enqueue(this.sumXX);
            this.sumXYHistory.enqueue(this.sumXY);
            this.sumYHistory.enqueue(this.sumY);
            this.sumYYHistory.enqueue(this.sumYY);

            this.trailingSumX = this.sumXHistory.dequeue();
            this.sumX -= this.trailingSumX;
            this.trailingSumXX = this.sumXXHistory.dequeue();
            this.sumXX -= this.trailingSumXX;
            this.trailingSumXY = this.sumXYHistory.dequeue();
            this.sumXY -= this.trailingSumXY;
            this.trailingSumY = this.sumYHistory.dequeue();
            this.sumY -= this.trailingSumY;
            this.trailingSumYY = this.sumYYHistory.dequeue();
            this.sumYY -= this.trailingSumYY;

            this.tmpReal = (this.sumXX - ((this.sumX * this.sumX) / this.timePeriod)) *
                (this.sumYY - ((this.sumY * this.sumY) / this.timePeriod));
            if (this.tmpReal !== 0) {
                this.setCurrentValue((this.sumXY - ((this.sumX * this.sumY) / this.timePeriod)) / Math.sqrt(this.tmpReal));
            } else {
                this.setCurrentValue(0);
            }

            this.sumXX += this.trailingSumXX;
            this.sumXY += this.trailingSumXY;
            this.sumX += this.trailingSumX;
            this.sumY += this.trailingSumY;
            this.sumYY += this.trailingSumYY;
        }

        return this.isReady;
    }
}

export class CORREL extends PearsonsCorrelationCoefficeint {

}
