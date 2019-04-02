import * as indicators from "../";
import * as marketData from "../../data/market/";

export class UltimateOscillator extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "ULTOSC";
  public static INDICATOR_DESCR: string = "Ultimate Oscillator";
  public static TIMEPERIOD1_DEFAULT: number = 7;
  public static TIMEPERIOD1_MIN: number = 1;
  public static TIMEPERIOD2_DEFAULT: number = 14;
  public static TIMEPERIOD2_MIN: number = 1;
  public static TIMEPERIOD3_DEFAULT: number = 28;
  public static TIMEPERIOD3_MIN: number = 1;

  public timePeriod1: number;
  public timePeriod2: number;
  public timePeriod3: number;

  private bpSMA1: indicators.SMA;
  private trSMA1: indicators.SMA;
  private bpSMA2: indicators.SMA;
  private trSMA2: indicators.SMA;
  private bpSMA3: indicators.SMA;
  private trSMA3: indicators.SMA;
  private trueRange: indicators.TRANGE;

  private buyingPressure: number;
  private previousClose: number;
  private average1: number;
  private average2: number;
  private average3: number;

  constructor(
    timePeriod1: number = UltimateOscillator.TIMEPERIOD1_DEFAULT,
    timePeriod2: number = UltimateOscillator.TIMEPERIOD2_DEFAULT,
    timePeriod3: number = UltimateOscillator.TIMEPERIOD3_DEFAULT
  ) {
    super(
      UltimateOscillator.INDICATOR_NAME,
      UltimateOscillator.INDICATOR_DESCR
    );

    if (timePeriod1 < UltimateOscillator.TIMEPERIOD1_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          UltimateOscillator.TIMEPERIOD1_MIN,
          timePeriod1
        )
      );
    }

    if (timePeriod2 < UltimateOscillator.TIMEPERIOD2_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          UltimateOscillator.TIMEPERIOD2_MIN,
          timePeriod2
        )
      );
    }

    if (timePeriod3 < UltimateOscillator.TIMEPERIOD3_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          UltimateOscillator.TIMEPERIOD3_MIN,
          timePeriod3
        )
      );
    }

    // sort the time periods from shortest to longest
    const periods: number[] = new Array(3);
    const usedFlag: number[] = new Array(3);
    const sortedPeriods: number[] = new Array(3);
    let longestPeriod = 0;
    let longestIndex = 0;
    periods[0] = timePeriod1;
    periods[1] = timePeriod2;
    periods[2] = timePeriod3;
    usedFlag[0] = 0;
    usedFlag[1] = 0;
    usedFlag[2] = 0;
    for (let i = 0; i < 3; ++i) {
      longestPeriod = 0;
      longestIndex = 0;
      for (let j = 0; j < 3; ++j) {
        if (usedFlag[j] === 0 && periods[j] > longestPeriod) {
          longestPeriod = periods[j];
          longestIndex = j;
        }
      }
      usedFlag[longestIndex] = 1;
      sortedPeriods[i] = longestPeriod;
    }

    this.timePeriod1 = sortedPeriods[2];
    this.timePeriod2 = sortedPeriods[1];
    this.timePeriod3 = sortedPeriods[0];

    this.buyingPressure = 0;
    this.previousClose = 0;

    this.average1 = 0;
    this.average2 = 0;
    this.average3 = 0;

    this.bpSMA1 = new indicators.SMA(this.timePeriod1);
    this.trSMA1 = new indicators.SMA(this.timePeriod1);
    this.bpSMA2 = new indicators.SMA(this.timePeriod2);
    this.trSMA2 = new indicators.SMA(this.timePeriod2);
    this.bpSMA3 = new indicators.SMA(this.timePeriod3);
    this.trSMA3 = new indicators.SMA(this.timePeriod3);
    this.trueRange = new indicators.TRANGE();

    this.setLookBack(Math.max(Math.max(timePeriod1, timePeriod2), timePeriod3));
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.trueRange.receiveData(inputData);
    if (this.trueRange.isReady) {
      this.buyingPressure =
        inputData.close - Math.min(inputData.low, this.previousClose);

      this.bpSMA1.receiveData(this.buyingPressure);
      this.trSMA1.receiveData(this.trueRange.currentValue);

      this.bpSMA2.receiveData(this.buyingPressure);
      this.trSMA2.receiveData(this.trueRange.currentValue);

      this.bpSMA3.receiveData(this.buyingPressure);
      this.trSMA3.receiveData(this.trueRange.currentValue);

      if (this.bpSMA3.isReady) {
        this.average1 = this.bpSMA1.currentValue / this.trSMA1.currentValue;
        this.average2 = this.bpSMA2.currentValue / this.trSMA2.currentValue;
        this.average3 = this.bpSMA3.currentValue / this.trSMA3.currentValue;

        this.setCurrentValue(
          (100 * (4 * this.average1 + 2 * this.average2 + this.average3)) / 7
        );
      }
    }

    this.previousClose = inputData.close;
    return this.isReady;
  }
}

export class ULTOSC extends UltimateOscillator {}
