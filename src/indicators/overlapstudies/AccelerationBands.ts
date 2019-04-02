import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AccelerationBands extends indicators.AbstractIndicatorBase<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "ACCBANDS";
  public static INDICATOR_DESCR: string = "Acceleration Bands";
  public static TIMEPERIOD_DEFAULT: number = 20;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private upperBandInternal: number;
  private middleBandInternal: number;
  private lowerBandInternal: number;

  private upperSMA: indicators.SMA;
  private middleSMA: indicators.SMA;
  private lowerSMA: indicators.SMA;
  private highPlusLow: number;
  private highMinusLow: number;
  private tempReal: number;

  constructor(timePeriod: number = AccelerationBands.TIMEPERIOD_DEFAULT) {
    super(AccelerationBands.INDICATOR_NAME, AccelerationBands.INDICATOR_DESCR);

    if (timePeriod < AccelerationBands.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          AccelerationBands.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.upperBandInternal = 0;
    this.middleBandInternal = 0;
    this.lowerBandInternal = 0;

    this.highPlusLow = 0;
    this.highMinusLow = 0;
    this.tempReal = 0;

    this.timePeriod = timePeriod;
    this.upperSMA = new indicators.SMA(this.timePeriod);
    this.middleSMA = new indicators.SMA(this.timePeriod);
    this.lowerSMA = new indicators.SMA(this.timePeriod);
    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.highPlusLow = inputData.high + inputData.low;
    this.highMinusLow = inputData.high - inputData.low;
    this.tempReal = (4 * this.highMinusLow) / this.highPlusLow;

    this.middleSMA.receiveData(inputData.close);
    if (this.highPlusLow > 0) {
      this.upperSMA.receiveData(inputData.high * (1 + this.tempReal));
      this.lowerSMA.receiveData(inputData.low * (1 - this.tempReal));
    } else {
      this.upperSMA.receiveData(inputData.high);
      this.lowerSMA.receiveData(inputData.low);
    }

    if (this.middleSMA.isReady) {
      this.setCurrentValue(
        this.upperSMA.currentValue,
        this.middleSMA.currentValue,
        this.lowerSMA.currentValue
      );
    }

    return this.isReady;
  }

  public get upperBand(): number {
    return this.upperBandInternal;
  }

  public get middleBand(): number {
    return this.middleBandInternal;
  }

  public get lowerBand(): number {
    return this.lowerBandInternal;
  }

  protected setCurrentValue(
    upperBand: number,
    middleBand: number,
    lowerBand: number
  ) {
    this.upperBandInternal = upperBand;
    this.middleBandInternal = middleBand;
    this.lowerBandInternal = lowerBand;
    this.emit("data", this.upperBand, this.middleBand, this.lowerBand);
    this.setIsReady();
  }
}

export class ACCBANDS extends AccelerationBands {}
