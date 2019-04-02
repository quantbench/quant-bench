import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Piercing extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLPIERCING";
  public static INDICATOR_DESCR: string = "Piercing Pattern";

  private bodyLongPeriodTotal: number[];

  private bodyLongAveragePeriod: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;

  private secondCandle: marketData.IPriceBar;
  private firstCandle: marketData.IPriceBar;
  private secondCandleColor: candleEnums.CandleColor;
  private firstCandleColor: candleEnums.CandleColor;
  constructor() {
    super(Piercing.INDICATOR_NAME, Piercing.INDICATOR_DESCR);

    this.bodyLongAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyLong
    ).averagePeriod;
    this.bodyLongPeriodTotal = new Array<number>();
    for (let i = 0; i < this.bodyLongPeriodTotal.length; i++) {
      this.bodyLongPeriodTotal[i] = 0;
    }

    const lookback = this.bodyLongAveragePeriod + 1;
    this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
    this.setLookBack(lookback);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.slidingWindow.add(inputData);

    if (!this.slidingWindow.isReady) {
      this.seedSlidingWindow(inputData);
      return this.isReady;
    }

    this.populateCandleVariables();

    if (
      this.firstCandleIsLongBlackCandle() &&
      this.secondCandleIsLogWhiteCandle() &&
      this.secondCandleOpenedBelowPriorLowClosedWithinPriorBodyAboveMidpoint()
    ) {
      this.setCurrentValue(100);
    } else {
      this.setCurrentValue(0);
    }

    for (let i = 1; i >= 0; i--) {
      this.bodyLongPeriodTotal[i] +=
        CandleStickUtils.getCandleRange(
          candleEnums.CandleSettingType.BodyLong,
          this.slidingWindow.getItem(1)
        ) -
        CandleStickUtils.getCandleRange(
          candleEnums.CandleSettingType.BodyLong,
          this.slidingWindow.getItem(1 + this.bodyLongAveragePeriod)
        );
    }
    return this.isReady;
  }

  private populateCandleVariables() {
    this.firstCandle = this.slidingWindow.getItem(1);
    this.secondCandle = this.slidingWindow.getItem(0);
    this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
    this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
  }

  private seedSlidingWindow(inputData: marketData.IPriceBar) {
    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.bodyLongAveragePeriod
    ) {
      this.bodyLongPeriodTotal[1] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(1)
      );
      this.bodyLongPeriodTotal[0] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        inputData
      );
    }
  }

  private firstCandleIsLongBlackCandle() {
    return (
      this.firstCandleColor === candleEnums.CandleColor.Black &&
      CandleStickUtils.getRealBody(this.firstCandle) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyLong,
          this.bodyLongPeriodTotal[1],
          this.firstCandle
        )
    );
  }

  private secondCandleIsLogWhiteCandle() {
    return (
      this.secondCandleColor === candleEnums.CandleColor.White &&
      CandleStickUtils.getRealBody(this.secondCandle) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyLong,
          this.bodyLongPeriodTotal[0],
          this.secondCandle
        )
    );
  }

  private secondCandleOpenedBelowPriorLowClosedWithinPriorBodyAboveMidpoint() {
    return (
      this.secondCandle.open < this.firstCandle.low &&
      //      close within prior body
      this.secondCandle.close < this.firstCandle.open &&
      //      above midpoint
      this.secondCandle.close >
        this.firstCandle.close +
          CandleStickUtils.getRealBody(this.firstCandle) * 0.5
    );
  }
}

export class CDLPIERCING extends Piercing {}
