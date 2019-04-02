import * as indicators from "../";

export class AbsolutePriceOscillator extends indicators.AbstractIndicator<
  number
> {
  public static INDICATOR_NAME: string = "APO";
  public static INDICATOR_DESCR: string = "Absolute Price Oscillator";
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
    fastTimePeriod: number = APO.FAST_TIMEPERIOD_DEFAULT,
    slowTimePeriod: number = APO.SLOW_TIMEPERIOD_DEFAULT,
    maType: indicators.MA_TYPE = APO.MATYPE_DEFAULT
  ) {
    super(APO.INDICATOR_NAME, APO.INDICATOR_DESCR);

    if (fastTimePeriod < APO.FAST_TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          APO.FAST_TIMEPERIOD_MIN,
          fastTimePeriod
        )
      );
    }

    if (slowTimePeriod < APO.SLOW_TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          APO.SLOW_TIMEPERIOD_MIN,
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
      this.setCurrentValue(this.fastMA.currentValue - this.slowMA.currentValue);
    }
  }
}

export class APO extends AbsolutePriceOscillator {}
