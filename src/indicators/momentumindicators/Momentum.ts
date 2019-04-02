import * as indicators from "../";

export class Momentum extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "MOM";
  public static INDICATOR_DESCR: string = "Momentum";
  public static TIMEPERIOD_DEFAULT: number = 10;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private periodHistory: indicators.Queue<number>;
  private periodCounter: number;

  constructor(timePeriod: number = Momentum.TIMEPERIOD_DEFAULT) {
    super(Momentum.INDICATOR_NAME, Momentum.INDICATOR_DESCR);

    if (timePeriod < Momentum.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          Momentum.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodCounter = timePeriod * -1;
    this.periodHistory = new indicators.Queue<number>();
    this.setLookBack(timePeriod);
  }

  public receiveData(inputData: number): boolean {
    this.periodCounter += 1;
    this.periodHistory.enqueue(inputData);

    if (this.periodCounter > 0) {
      // Mom = price - previousPrice
      this.setCurrentValue(inputData - this.periodHistory.peek());
    }

    if (this.periodHistory.count > this.timePeriod) {
      this.periodHistory.dequeue();
    }

    return this.isReady;
  }
}

export class MOM extends Momentum {}
