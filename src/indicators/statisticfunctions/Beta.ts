import * as indicators from "../";

export class Beta extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "BETA";
  public static INDICATOR_DESCR: string = "Beta";
  public static TIMEPERIOD_DEFAULT: number = 5;
  public static TIMEPERIOD_MIN: number = 1;

  public timePeriod: number;

  private sumXX: number = 0.0; /* sum of x * x */
  private sumXY: number = 0.0; /* sum of x * y */
  private sumX: number = 0.0; /* sum of x */
  private sumY: number = 0.0; /* sum of y */

  private sumXXHistory: indicators.Queue<number>;
  private sumXYHistory: indicators.Queue<number>;
  private sumXHistory: indicators.Queue<number>;
  private sumYHistory: indicators.Queue<number>;

  private trailingSumXX: number = 0.0;
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
  constructor(timePeriod: number = Beta.TIMEPERIOD_DEFAULT) {
    super(Beta.INDICATOR_NAME, Beta.INDICATOR_DESCR);

    if (timePeriod < Beta.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          Beta.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodCounter = -1;

    this.lastPriceX = 0;
    this.lastPriceY = 0;

    this.sumXXHistory = new indicators.Queue<number>();
    this.sumXYHistory = new indicators.Queue<number>();
    this.sumXHistory = new indicators.Queue<number>();
    this.sumYHistory = new indicators.Queue<number>();

    this.setLookBack(this.timePeriod);
  }

  public receiveData(inputData1: number, inputData2: number): boolean {
    this.periodCounter++;

    if (this.periodCounter === 0) {
      this.lastPriceX = inputData1;
      this.lastPriceY = inputData2;
      this.sumXXHistory.enqueue(this.sumXX);
      this.sumXYHistory.enqueue(this.sumXY);
      this.sumXHistory.enqueue(this.sumX);
      this.sumYHistory.enqueue(this.sumY);
    } else if (this.periodCounter < this.timePeriod) {
      this.tmpReal = inputData1;
      this.lastPriceX !== 0
        ? (this.x = (this.tmpReal - this.lastPriceX) / this.lastPriceX)
        : (this.x = 0.0);

      this.lastPriceX = this.tmpReal;

      this.tmpReal = inputData2;
      this.lastPriceY !== 0
        ? (this.y = (this.tmpReal - this.lastPriceY) / this.lastPriceY)
        : (this.y = 0.0);

      this.lastPriceY = this.tmpReal;

      this.sumXX += this.x * this.x;
      this.sumXXHistory.enqueue(this.sumXX);
      this.sumXY += this.x * this.y;
      this.sumXYHistory.enqueue(this.sumXY);
      this.sumX += this.x;
      this.sumXHistory.enqueue(this.sumX);
      this.sumY += this.y;
      this.sumYHistory.enqueue(this.sumY);
    } else {
      this.tmpReal = inputData1;
      this.lastPriceX !== 0
        ? (this.x = (this.tmpReal - this.lastPriceX) / this.lastPriceX)
        : (this.x = 0.0);

      this.lastPriceX = this.tmpReal;

      this.tmpReal = inputData2;
      this.lastPriceY !== 0
        ? (this.y = (this.tmpReal - this.lastPriceY) / this.lastPriceY)
        : (this.y = 0.0);

      this.lastPriceY = this.tmpReal;

      this.sumXX += this.x * this.x;
      this.sumXXHistory.enqueue(this.sumXX);
      this.sumXY += this.x * this.y;
      this.sumXYHistory.enqueue(this.sumXY);
      this.sumX += this.x;
      this.sumXHistory.enqueue(this.sumX);
      this.sumY += this.y;
      this.sumYHistory.enqueue(this.sumY);

      this.trailingSumXX = this.sumXXHistory.dequeue();
      this.sumXX -= this.trailingSumXX;
      this.trailingSumXY = this.sumXYHistory.dequeue();
      this.sumXY -= this.trailingSumXY;
      this.trailingSumX = this.sumXHistory.dequeue();
      this.sumX -= this.trailingSumX;
      this.trailingSumY = this.sumYHistory.dequeue();
      this.sumY -= this.trailingSumY;

      this.tmpReal = this.timePeriod * this.sumXX - this.sumX * this.sumX;
      if (this.tmpReal !== 0) {
        this.setCurrentValue(
          (this.timePeriod * this.sumXY - this.sumX * this.sumY) / this.tmpReal
        );
      } else {
        this.setCurrentValue(0);
      }

      this.sumXX += this.trailingSumXX;
      this.sumXY += this.trailingSumXY;
      this.sumX += this.trailingSumX;
      this.sumY += this.trailingSumY;
    }
    return this.isReady;
  }
}

export class BETA extends Beta {}
