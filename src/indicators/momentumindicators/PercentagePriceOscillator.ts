import * as indicators from "../";

export class PercentagePriceOscillator extends indicators.AbstractIndicator<
  number
> {
  public static INDICATOR_NAME: string = "PPO";
  public static INDICATOR_DESCR: string = "Percentage Price Oscillator";

  public static FAST_TIMEPERIOD_DEFAULT: number = 12;
  public static FAST_TIMEPERIOD_MIN: number = 2;
  public static SLOW_TIMEPERIOD_DEFAULT: number = 26;
  public static SLOW_TIMEPERIOD_MIN: number = 2;
  public static MATYPE_DEFAULT: indicators.MA_TYPE = indicators.MA_TYPE.SMA;

  public fastTimePeriod: number;
  public slowTimePeriod: number;
  public maType: indicators.MA_TYPE;

  private fastMA: indicators.MovingAverage;
  private slowMA: indicators.MovingAverage;

  constructor(
    fastTimePeriod: number = PercentagePriceOscillator.FAST_TIMEPERIOD_DEFAULT,
    slowTimePeriod: number = PercentagePriceOscillator.SLOW_TIMEPERIOD_DEFAULT,
    maType: indicators.MA_TYPE = PercentagePriceOscillator.MATYPE_DEFAULT
  ) {
    super(
      PercentagePriceOscillator.INDICATOR_NAME,
      PercentagePriceOscillator.INDICATOR_DESCR
    );

    if (fastTimePeriod < PercentagePriceOscillator.FAST_TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          PercentagePriceOscillator.FAST_TIMEPERIOD_MIN,
          fastTimePeriod
        )
      );
    }

    if (slowTimePeriod < PercentagePriceOscillator.SLOW_TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          PercentagePriceOscillator.SLOW_TIMEPERIOD_MIN,
          slowTimePeriod
        )
      );
    }

    this.maType = maType;
    if (fastTimePeriod < slowTimePeriod) {
      this.fastTimePeriod = fastTimePeriod;
      this.slowTimePeriod = slowTimePeriod;
    } else {
      this.fastTimePeriod = slowTimePeriod;
      this.slowTimePeriod = fastTimePeriod;
    }

    this.fastMA = new indicators.MovingAverage(
      this.fastTimePeriod,
      this.maType
    );
    this.slowMA = new indicators.MovingAverage(
      this.slowTimePeriod,
      this.maType
    );
    this.slowMA.on("data", (data: number) => this.receiveSlowMAData(data));

    this.setLookBack(this.slowMA.lookback);
  }

  public receiveData(inputData: number): boolean {
    this.fastMA.receiveData(inputData);
    this.slowMA.receiveData(inputData);
    return this.isReady;
  }

  private receiveSlowMAData(data: number) {
    if (this.slowMA.currentValue === 0) {
      this.setCurrentValue(0);
    } else {
      this.setCurrentValue(
        ((this.fastMA.currentValue - this.slowMA.currentValue) /
          this.slowMA.currentValue) *
          100.0
      );
    }
  }
}

export class PPO extends PercentagePriceOscillator {}
