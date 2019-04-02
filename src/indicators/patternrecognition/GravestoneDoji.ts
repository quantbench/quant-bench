import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../SlidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class GravestoneDoji extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "CDLGRAVESTONEDOJI";
  public static INDICATOR_DESCR: string = "Gravestone Doji";

  private bodyDojiPeriodTotal: number;

  private bodyDojiAveragePeriod: number;

  private shadowVeryShortPeriodTotal: number;

  private shadowVeryShortAveragePeriod: number;

  private slidingWindow: SlidingWindow<marketData.IPriceBar>;

  constructor() {
    super(GravestoneDoji.INDICATOR_NAME, GravestoneDoji.INDICATOR_DESCR);

    this.bodyDojiAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.BodyDoji
    ).averagePeriod;
    this.bodyDojiPeriodTotal = 0;
    this.shadowVeryShortAveragePeriod = CandleSettings.get(
      candleEnums.CandleSettingType.ShadowVeryShort
    ).averagePeriod;
    this.shadowVeryShortPeriodTotal = 0;

    const lookback = Math.max(
      this.bodyDojiAveragePeriod,
      this.shadowVeryShortAveragePeriod
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

    if (
      CandleStickUtils.getRealBody(inputData) <=
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.BodyDoji,
          this.bodyDojiPeriodTotal,
          inputData
        ) &&
      CandleStickUtils.getLowerShadow(inputData) <
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.ShadowVeryShort,
          this.shadowVeryShortPeriodTotal,
          inputData
        ) &&
      CandleStickUtils.getUpperShadow(inputData) >
        CandleStickUtils.getCandleAverage(
          candleEnums.CandleSettingType.ShadowVeryShort,
          this.shadowVeryShortPeriodTotal,
          inputData
        )
    ) {
      this.setCurrentValue(100);
    } else {
      this.setCurrentValue(0);
    }

    this.bodyDojiPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
        inputData
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
        this.slidingWindow.getItem(this.bodyDojiAveragePeriod)
      );

    this.shadowVeryShortPeriodTotal +=
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.ShadowVeryShort,
        inputData
      ) -
      CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.ShadowVeryShort,
        this.slidingWindow.getItem(this.shadowVeryShortAveragePeriod)
      );

    return this.isReady;
  }

  private seedSlidingWindow(inputData: marketData.IPriceBar) {
    if (
      this.slidingWindow.samples >=
      this.slidingWindow.period - this.bodyDojiAveragePeriod
    ) {
      this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(
        candleEnums.CandleSettingType.BodyDoji,
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

export class CDLGRAVESTONEDOJI extends GravestoneDoji {}
