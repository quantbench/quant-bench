import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class OnNeck extends indicators.AbstractIndicator<marketData.IPriceBar> {
  public static INDICATOR_NAME: string = "CDLONNECK";
  public static INDICATOR_DESCR: string = "On-Neck Pattern";

  private bodyLongPeriodTotal: number;

  private bodyLongAveragePeriod: number;

  private equalPeriodTotal: number;

  private equalAveragePeriod: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;

  private secondCandle: marketData.IPriceBar;
  private firstCandle: marketData.IPriceBar;
  private secondCandleColor: candleEnums.CandleColor;
  private firstCandleColor: candleEnums.CandleColor;

  constructor() {
    super(CDLONNECK.INDICATOR_NAME, CDLONNECK.INDICATOR_DESCR);

    this.equalAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.Equal
    ).averagePeriod;
    this.equalPeriodTotal = 0;
    this.bodyLongAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyLong
    ).averagePeriod;
    this.bodyLongPeriodTotal = 0;

    const lookback =
      Math.max(this.equalAveragePeriod, this.bodyLongAveragePeriod) + 1;
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
      this.secondCandleIsWhiteOPensBelowPriorLowAndClosesEqualToPriorLow()
    ) {
      this.setCurrentValue(-100);
    } else {
      this.setCurrentValue(0);
    }

    this.equalPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.Equal,
        this.firstCandle
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.Equal,
        this.slidingWindow.getItem(this.equalAveragePeriod + 1)
      );

    this.bodyLongPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.firstCandle
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1)
      );

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
      this.slidingWindow.period - this.equalAveragePeriod
    ) {
      this.equalPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.Equal,
        this.slidingWindow.getItem(1)
      );
    }

    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.bodyLongAveragePeriod
    ) {
      this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(1)
      );
    }
  }

  private firstCandleIsLongBlackCandle() {
    return (
      CandleStickUtils.getRealBody(this.firstCandle) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyLong,
          this.bodyLongPeriodTotal,
          this.firstCandle
        ) && this.firstCandleColor === candleEnums.CandleColor.Black
    );
  }

  private secondCandleIsWhiteOPensBelowPriorLowAndClosesEqualToPriorLow() {
    return (
      this.secondCandleColor === candleEnums.CandleColor.White &&
      this.secondCandle.open < this.firstCandle.low &&
      //      close equal to prior low
      this.secondCandle.close <=
        this.firstCandle.low +
          CandleStickUtils.getCandleAverage(
            candleEnums.CandleSettingType.Equal,
            this.equalPeriodTotal,
            this.firstCandle
          ) &&
      this.secondCandle.close >=
        this.firstCandle.low -
          CandleStickUtils.getCandleAverage(
            candleEnums.CandleSettingType.Equal,
            this.equalPeriodTotal,
            this.firstCandle
          )
    );
  }
}

export class CDLONNECK extends OnNeck {}
