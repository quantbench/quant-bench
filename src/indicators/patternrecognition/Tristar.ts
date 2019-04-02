import * as indicators from "../";
import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";

import { SlidingWindow } from "../SlidingWindow";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class Tristar extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLTRISTAR";
  public static INDICATOR_DESCR: string = "Tristar Pattern";

  private bodyDojiAveragePeriod: number;
  private bodyDojiPeriodTotal: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;
  private thirdCandle: marketData.IPriceBar;
  private secondCandle: marketData.IPriceBar;
  private firstCandle: marketData.IPriceBar;
  private thirdCandleColor: candleEnums.CandleColor;
  private secondCandleColor: candleEnums.CandleColor;
  private firstCandleColor: candleEnums.CandleColor;

  constructor() {
    super(Tristar.INDICATOR_NAME, Tristar.INDICATOR_DESCR);

    this.bodyDojiAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyDoji
    ).averagePeriod;
    this.bodyDojiPeriodTotal = 0;

    const lookback = this.bodyDojiAveragePeriod + 2;
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

    if (this.allCandlesAreDojis()) {
      if (this.secondCandleGapsUpWithThirdNotHigherThanSecond()) {
        this.setCurrentValue(-100);
      } else if (this.secondCandleGapsDownWithThirdNotLowerThanSecond()) {
        this.setCurrentValue(100);
      } else {
        this.setCurrentValue(0);
      }
    } else {
      this.setCurrentValue(0);
    }

    this.bodyDojiPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
        this.slidingWindow.getItem(2)
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
        this.slidingWindow.getItem(this.bodyDojiAveragePeriod + 2)
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
        this.slidingWindow.period - this.bodyDojiAveragePeriod - 2 &&
      this.slidingWindow.samples < this.slidingWindow.period - 2
    ) {
      this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
        inputData
      );
    }
  }

  private allCandlesAreDojis() {
    return (
      CandleStickUtils.getRealBody(this.firstCandle) <=
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyDoji,
          this.bodyDojiPeriodTotal,
          this.firstCandle
        ) &&
      // 2nd: doji
      CandleStickUtils.getRealBody(this.secondCandle) <=
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyDoji,
          this.bodyDojiPeriodTotal,
          this.firstCandle
        ) &&
      // 3rd: doji
      CandleStickUtils.getRealBody(this.thirdCandle) <=
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyDoji,
          this.bodyDojiPeriodTotal,
          this.firstCandle
        )
    );
  }

  private secondCandleGapsUpWithThirdNotHigherThanSecond() {
    return (
      CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle) &&
      // 3rd is not higher than 2nd
      Math.max(this.thirdCandle.open, this.thirdCandle.close) <
        Math.max(this.secondCandle.open, this.secondCandle.close)
    );
  }

  private secondCandleGapsDownWithThirdNotLowerThanSecond() {
    return (
      CandleStickUtils.getRealBodyGapDown(
        this.secondCandle,
        this.firstCandle
      ) &&
      // 3rd is not lower than 2nd
      Math.min(this.thirdCandle.open, this.thirdCandle.close) >
        Math.min(this.secondCandle.open, this.secondCandle.close)
    );
  }
}

export class CDLTRISTAR extends Tristar {}
