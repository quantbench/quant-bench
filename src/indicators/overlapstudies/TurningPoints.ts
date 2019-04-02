import * as indicators from "../";
import { Queue } from "../Queue";
import { STDDEV } from "../statisticfunctions";

export class TurningPoints extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "TP";
  public static INDICATOR_DESCR: string = "Turning Points";
  public static TIMEPERIOD_DEFAULT: number = 5;
  public static TIMEPERIOD_MIN: number = STDDEV.TIMEPERIOD_MIN + 1;

  public timePeriod: number;

  private sma: indicators.SMA;

  private stddev: indicators.STDDEV;

  private currentInput: number;
  private currentSMA: number;

  private currentStdDev: number;

  private m: number;

  constructor(timePeriod: number = TurningPoints.TIMEPERIOD_DEFAULT) {
    super(TurningPoints.INDICATOR_NAME, TurningPoints.INDICATOR_DESCR);

    if (timePeriod < TurningPoints.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          TurningPoints.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.m = 1;
    this.setLookBack(this.timePeriod - 1);
    this.sma = new indicators.SMA(timePeriod);
    this.sma.on("data", (data: number) => this.receiveSMAData(data));
    this.stddev = new indicators.STDDEV(timePeriod - 1);
    this.stddev.on("data", (data: number) => this.receiveSTDDEVData(data));
  }

  public receiveData(inputData: number): boolean {
    this.currentInput = inputData;
    this.sma.receiveData(inputData);
    return this.isReady;
  }

  private receiveSMAData(data: number) {
    this.currentSMA = data;
    this.stddev.receiveData(data);
  }

  private receiveSTDDEVData(data: number) {
    this.currentStdDev = data;

    const result =
      Math.abs(this.currentInput - this.currentSMA) -
      this.m * this.currentStdDev;
    this.setCurrentValue(result);
  }
}

export class TP extends TurningPoints {}
