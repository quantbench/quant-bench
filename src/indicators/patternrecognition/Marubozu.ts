import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Marubozu extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLMARUBOZU";
  public static INDICATOR_DESCR: string = "Marubozu";

  private shadowVeryShortPeriodTotal: number;

  private shadowVeryShortAveragePeriod: number;

  private bodyLongPeriodTotal: number;

  private bodyLongAveragePeriod: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;

  private firstCandle: marketData.IPriceBar;

  private firstCandleColor: candleEnums.CandleColor;

  constructor() {
    super(Marubozu.INDICATOR_NAME, Marubozu.INDICATOR_DESCR);
    this.bodyLongAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyLong
    ).averagePeriod;
    this.bodyLongPeriodTotal = 0;
    this.shadowVeryShortAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.ShadowVeryShort
    ).averagePeriod;
    this.shadowVeryShortPeriodTotal = 0;

    const lookback = Math.max(
      this.shadowVeryShortAveragePeriod,
      this.bodyLongAveragePeriod
    );
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
      CandleStickUtils.getRealBody(this.firstCandle) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyLong,
          this.bodyLongPeriodTotal,
          this.firstCandle
        ) &&
      CandleStickUtils.getUpperShadow(this.firstCandle) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.ShadowVeryShort,
          this.shadowVeryShortPeriodTotal,
          this.firstCandle
        ) &&
      CandleStickUtils.getLowerShadow(this.firstCandle) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.ShadowVeryShort,
          this.shadowVeryShortPeriodTotal,
          this.firstCandle
        )
    ) {
      this.setCurrentValue(this.firstCandleColor * 100);
    } else {
      this.setCurrentValue(0);
    }

    this.bodyLongPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.firstCandle
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(this.bodyLongAveragePeriod)
      );

    this.shadowVeryShortPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.ShadowVeryShort,
        this.firstCandle
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.ShadowVeryShort,
        this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod)
      );
    return this.isReady;
  }

  private populateCandleVariables() {
    this.firstCandle = this.slidingWindow.getItem(0);
    this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
  }

  private seedSlidingWindow(inputData: marketData.IPriceBar) {
    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.bodyLongAveragePeriod
    ) {
      this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        inputData
      );
    }

    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.shadowVeryShortAveragePeriod
    ) {
      this.shadowVeryShortPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.ShadowVeryShort,
        inputData
      );
    }
  }
}

export class CDLMARUBOZU extends Marubozu {}
