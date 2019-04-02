import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MinusDirectionalIndicator extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "MINUSDI";
  public static INDICATOR_DESCR: string = "Minus Directional Indicator";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 1;

  public timePeriod: number;

  private periodCounter: number;
  private previousHigh: number;
  private previousLow: number;
  private previousMinusDM: number;
  private previousTrueRange: number;
  private currentTrueRange: number;
  private trueRange: indicators.TRANGE;

  private currentHigh: number;
  private currentLow: number;
  private diffP: number;
  private diffM: number;

  constructor(
    timePeriod: number = MinusDirectionalIndicator.TIMEPERIOD_DEFAULT
  ) {
    super(
      MinusDirectionalIndicator.INDICATOR_NAME,
      MinusDirectionalIndicator.INDICATOR_DESCR
    );

    if (timePeriod < MinusDirectionalIndicator.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          MinusDirectionalIndicator.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.periodCounter = -1;
    this.trueRange = new indicators.TRANGE();
    this.trueRange.on("data", (data: number) => this.receiveTRangeData(data));
    this.previousHigh = 0;
    this.previousLow = 0;
    this.previousMinusDM = 0;
    this.previousTrueRange = 0;
    this.currentTrueRange = 0;
    this.currentHigh = 0;
    this.currentLow = 0;
    this.diffP = 0;
    this.diffM = 0;
    this.timePeriod = timePeriod;
    this.setLookBack(timePeriod);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    // forward to the true range indicator first using previous data
    this.trueRange.receiveData(inputData);

    this.periodCounter += 1;
    this.currentHigh = inputData.high;
    this.currentLow = inputData.low;
    this.diffP = this.currentHigh - this.previousHigh;
    this.diffM = this.previousLow - this.currentLow;

    if (this.lookback === 1) {
      if (this.periodCounter > 0) {
        this.trueRange.receiveData(inputData);

        if (
          this.diffM > 0 &&
          this.diffP < this.diffM &&
          this.currentTrueRange !== 0
        ) {
          this.setCurrentValue(this.diffM / this.currentTrueRange);
        } else {
          this.setCurrentValue(0);
        }
      }
    } else {
      if (this.periodCounter > 0) {
        if (this.periodCounter < this.timePeriod) {
          if (this.diffM > 0 && this.diffP < this.diffM) {
            this.previousMinusDM += this.diffM;
          }
          this.previousTrueRange += this.currentTrueRange;
        } else {
          this.previousTrueRange =
            this.previousTrueRange -
            this.previousTrueRange / this.timePeriod +
            this.currentTrueRange;
          if (this.diffM > 0 && this.diffP < this.diffM) {
            this.previousMinusDM =
              this.previousMinusDM -
              this.previousMinusDM / this.timePeriod +
              this.diffM;
          } else {
            this.previousMinusDM =
              this.previousMinusDM - this.previousMinusDM / this.timePeriod;
          }

          if (this.previousTrueRange !== 0) {
            this.setCurrentValue(
              (100.0 * this.previousMinusDM) / this.previousTrueRange
            );
          } else {
            this.setCurrentValue(0);
          }
        }
      }
    }

    this.previousHigh = this.currentHigh;
    this.previousLow = this.currentLow;

    return this.isReady;
  }

  private receiveTRangeData(data: number) {
    this.currentTrueRange = data;
  }
}

export class MINUSDI extends MinusDirectionalIndicator {}
