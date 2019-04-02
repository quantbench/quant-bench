import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class MatHold extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLMATHOLD";
  public static INDICATOR_DESCR: string = "Mat Hold";

  public static PENETRATION_DEFAULT: number = 0.5;
  public static PENETRATION_MIN: number = 0;

  private bodyPeriodTotal: number[];

  private bodyLongAveragePeriod: number;
  private bodyShortAveragePeriod: number;

  private penetration: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;

  private fifthCandle: marketData.IPriceBar;
  private fourthCandle: marketData.IPriceBar;
  private thirdCandle: marketData.IPriceBar;
  private secondCandle: marketData.IPriceBar;
  private firstCandle: marketData.IPriceBar;
  private fifthCandleColor: candleEnums.CandleColor;
  private fourthCandleColor: candleEnums.CandleColor;
  private thirdCandleColor: candleEnums.CandleColor;
  private secondCandleColor: candleEnums.CandleColor;
  private firstCandleColor: candleEnums.CandleColor;

  constructor(penetration: number = MatHold.PENETRATION_DEFAULT) {
    super(MatHold.INDICATOR_NAME, MatHold.INDICATOR_DESCR);

    this.penetration = penetration;

    this.bodyShortAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyShort
    ).averagePeriod;
    this.bodyLongAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyLong
    ).averagePeriod;
    this.bodyPeriodTotal = new Array<number>(5);
    for (let i = 0; i < this.bodyPeriodTotal.length; i++) {
      this.bodyPeriodTotal[i] = 0;
    }

    const lookback =
      Math.max(this.bodyShortAveragePeriod, this.bodyLongAveragePeriod) + 4;
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
      this.firstCandleIsLongFollowedByThreeSmallCandles() &&
      this.firstCandleIsWhiteSecondIsBlackAndLastCandleIsWhite() &&
      this.anUpsideGapExistsBetweenFirstTwoCandles() &&
      this.thirdAndFourthCandlesHoldWithinFirstCandle() &&
      this.reactionDaysPenetrateFirstBodyLessThanSuppliedPenetration() &&
      this.secondAndFourthCandlesAreFalling() &&
      this.fifthCandleOpensAbovePriorClose() &&
      this.fifthCandleClosesAboveHigestHighOfReactionDays()
    ) {
      this.setCurrentValue(100);
    } else {
      this.setCurrentValue(0);
    }

    this.bodyPeriodTotal[4] +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.firstCandle
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(this.bodyLongAveragePeriod + 4)
      );

    for (let i = 3; i >= 1; i--) {
      this.bodyPeriodTotal[i] +=
        CandleStickUtils.getCandleRange(
          candleEnums.CandleSettingType.BodyShort,
          this.slidingWindow.getItem(i)
        ) -
        CandleStickUtils.getCandleRange(
          candleEnums.CandleSettingType.BodyShort,
          this.slidingWindow.getItem(i + this.bodyShortAveragePeriod)
        );
    }

    return this.isReady;
  }

  private populateCandleVariables() {
    this.firstCandle = this.slidingWindow.getItem(4);
    this.secondCandle = this.slidingWindow.getItem(3);
    this.thirdCandle = this.slidingWindow.getItem(2);
    this.fourthCandle = this.slidingWindow.getItem(1);
    this.fifthCandle = this.slidingWindow.getItem(0);

    this.fifthCandleColor = CandleStickUtils.getCandleColor(this.fifthCandle);
    this.fourthCandleColor = CandleStickUtils.getCandleColor(this.fourthCandle);
    this.thirdCandleColor = CandleStickUtils.getCandleColor(this.thirdCandle);
    this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
    this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
  }

  private seedSlidingWindow(inputData: marketData.IPriceBar) {
    if (
      this.slidingWindow.samples >
      this.slidingWindow.period - this.bodyShortAveragePeriod
    ) {
      this.bodyPeriodTotal[3] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyShort,
        this.slidingWindow.getItem(3)
      );
      this.bodyPeriodTotal[2] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyShort,
        this.slidingWindow.getItem(2)
      );
      this.bodyPeriodTotal[1] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyShort,
        this.slidingWindow.getItem(1)
      );
    }

    if (
      this.slidingWindow.samples >
      this.slidingWindow.period - this.bodyLongAveragePeriod
    ) {
      this.bodyPeriodTotal[4] += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyLong,
        this.slidingWindow.getItem(4)
      );
    }
  }

  private firstCandleIsLongFollowedByThreeSmallCandles() {
    return (
      CandleStickUtils.getRealBody(this.firstCandle) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyLong,
          this.bodyPeriodTotal[4],
          this.firstCandle
        ) &&
      CandleStickUtils.getRealBody(this.secondCandle) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyShort,
          this.bodyPeriodTotal[3],
          this.secondCandle
        ) &&
      CandleStickUtils.getRealBody(this.thirdCandle) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyShort,
          this.bodyPeriodTotal[2],
          this.thirdCandle
        ) &&
      CandleStickUtils.getRealBody(this.fourthCandle) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyShort,
          this.bodyPeriodTotal[1],
          this.fourthCandle
        )
    );
  }

  private firstCandleIsWhiteSecondIsBlackAndLastCandleIsWhite() {
    return (
      this.firstCandleColor === candleEnums.CandleColor.White &&
      this.secondCandleColor === candleEnums.CandleColor.Black &&
      this.fifthCandleColor === candleEnums.CandleColor.White
    );
  }

  private anUpsideGapExistsBetweenFirstTwoCandles() {
    return CandleStickUtils.getRealBodyGapUp(
      this.secondCandle,
      this.firstCandle
    );
  }

  private thirdAndFourthCandlesHoldWithinFirstCandle() {
    return (
      Math.min(this.thirdCandle.open, this.thirdCandle.close) <
        this.firstCandle.close &&
      Math.min(this.fourthCandle.open, this.fourthCandle.close) <
        this.firstCandle.close
    );
  }

  private reactionDaysPenetrateFirstBodyLessThanSuppliedPenetration() {
    return (
      Math.min(this.thirdCandle.open, this.thirdCandle.close) >
        this.firstCandle.close -
          CandleStickUtils.getRealBody(this.firstCandle) * this.penetration &&
      Math.min(this.fourthCandle.open, this.fourthCandle.close) >
        this.firstCandle.close -
          CandleStickUtils.getRealBody(this.firstCandle) * this.penetration
    );
  }

  private secondAndFourthCandlesAreFalling() {
    return (
      Math.max(this.thirdCandle.close, this.thirdCandle.open) <
        this.secondCandle.open &&
      Math.max(this.fourthCandle.close, this.fourthCandle.open) <
        Math.max(this.thirdCandle.close, this.thirdCandle.open)
    );
  }

  private fifthCandleOpensAbovePriorClose() {
    return this.fifthCandle.open > this.fourthCandle.close;
  }

  private fifthCandleClosesAboveHigestHighOfReactionDays() {
    return (
      this.fifthCandle.close >
      Math.max(
        Math.max(this.secondCandle.high, this.thirdCandle.high),
        this.fourthCandle.high
      )
    );
  }
}

export class CDLMATHOLD extends MatHold {}
