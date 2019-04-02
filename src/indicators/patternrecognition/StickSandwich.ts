import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class StickSandwich extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLSTICKSANDWICH";
  public static INDICATOR_DESCR: string = "Stick Sandwich";

  private equalAveragePeriod: number;
  private equalPeriodTotal: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;
  private thirdCandle: marketData.IPriceBar;
  private secondCandle: marketData.IPriceBar;
  private firstCandle: marketData.IPriceBar;
  private thirdCandleColor: candleEnums.CandleColor;
  private secondCandleColor: candleEnums.CandleColor;
  private firstCandleColor: candleEnums.CandleColor;

  constructor() {
    super(StickSandwich.INDICATOR_NAME, StickSandwich.INDICATOR_DESCR);

    this.equalAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.Equal
    ).averagePeriod;
    this.equalPeriodTotal = 0;

    const lookback = this.equalAveragePeriod + 2;
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
      this.firstCandleIsBlack() &&
      this.secondCandleIsWhite() &&
      this.thirdCandleIsBlack() &&
      this.secondCandleLowIsGreaterThanPrior() &&
      this.firstAndSecondCandlesHaveSameClose()
    ) {
      this.setCurrentValue(100);
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
        this.slidingWindow.getItem(this.equalAveragePeriod + 2)
      );

    return this.isReady;
  }

  private populateCandleVariables() {
    this.firstCandle = this.slidingWindow.getItem(2);
    this.secondCandle = this.slidingWindow.getItem(1);
    this.thirdCandle = this.slidingWindow.getItem(0);
    this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
    this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
    this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
  }

  private seedSlidingWindow(inputData: marketData.IPriceBar) {
    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.equalAveragePeriod
    ) {
      this.equalPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(2)
      );
    }
  }

  private firstCandleIsBlack() {
    return this.firstCandleColor === candleEnums.CandleColor.Black;
  }

  private secondCandleIsWhite() {
    return this.secondCandleColor === candleEnums.CandleColor.White;
  }

  private thirdCandleIsBlack() {
    return this.thirdCandleColor === candleEnums.CandleColor.Black;
  }

  private secondCandleLowIsGreaterThanPrior() {
    return this.secondCandle.low > this.thirdCandle.close;
  }

  private firstAndSecondCandlesHaveSameClose() {
    return (
      this.thirdCandle.close <=
        this.firstCandle.close +
          CandleStickUtils.getCandleAverage(
            candleEnums.CandleSettingType.Equal,
            this.equalPeriodTotal,
            this.firstCandle
          ) &&
      this.thirdCandle.close >=
        this.firstCandle.close -
          CandleStickUtils.getCandleAverage(
            candleEnums.CandleSettingType.Equal,
            this.equalPeriodTotal,
            this.firstCandle
          )
    );
  }
}

export class CDLSTICKSANDWICH extends StickSandwich {}
