import * as indicators from "../";
import * as marketData from "../../data/market/";

export class NormalisedAverageTrueRange extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "NATR";
  public static INDICATOR_DESCR: string = "Normalized Average True Range";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 1;

  public timePeriod: number;
  private atr: indicators.ATR;
  private currentClose: number;

  constructor(
    timePeriod: number = NormalisedAverageTrueRange.TIMEPERIOD_DEFAULT
  ) {
    super(
      NormalisedAverageTrueRange.INDICATOR_NAME,
      NormalisedAverageTrueRange.INDICATOR_DESCR
    );

    if (timePeriod < NormalisedAverageTrueRange.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          NormalisedAverageTrueRange.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.currentClose = 0;
    this.atr = new indicators.ATR(this.timePeriod);
    this.atr.on("data", (data: number) => this.receiveATRData(data));

    this.setLookBack(this.timePeriod);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.currentClose = inputData.close;
    this.atr.receiveData(inputData);
    return this.isReady;
  }

  private receiveATRData(data: number) {
    this.setCurrentValue((this.atr.currentValue / this.currentClose) * 100.0);
  }
}

export class NATR extends NormalisedAverageTrueRange {}
