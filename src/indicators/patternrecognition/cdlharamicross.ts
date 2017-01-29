import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLHARAMICROSS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHARAMICROSS";
    static INDICATOR_DESCR: string = "Harami Cross Pattern";

    private bodyLongPeriodTotal: number;

    private bodyLongAveragePeriod: number;

    private bodyDojiPeriodTotal: number;

    private bodyDojiAveragePeriod: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor() {
        super(CDLHARAMICROSS.INDICATOR_NAME, CDLHARAMICROSS.INDICATOR_DESCR);

        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;

        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.secondCandleColor = candleEnums.CandleColor.Black;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyLongAveragePeriod, this.bodyDojiAveragePeriod) + 1;
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.populateCandleVariables();

        if (this.firstCandleIsLong() &&
            this.secondCandleIsShortAndEngulfedByFirst()) {
            this.setCurrentValue(this.firstCandleColor * -100);
        } else if (this.firstCandleIsLong() &&
            this.secondCandleIsShortAndEngulfedByOrMatchesFirst()) {
            this.setCurrentValue(this.firstCandleColor * -80);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1));

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        return this.isReady;
    }

    private populateCandleVariables() {
        this.firstCandle = this.slidingWindow.getItem(1);
        this.secondCandle = this.slidingWindow.getItem(0);
        this.secondCandleColor = CandleStickUtils.getCandleColor(this.secondCandle);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 1 &&
            this.slidingWindow.samples < this.slidingWindow.period - 1) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }
    }

    private firstCandleIsLong() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle);
    }

    private secondCandleIsShortAndEngulfedByFirst() {
        return CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.secondCandle) &&
            Math.max(this.secondCandle.close, this.secondCandle.open) < Math.max(this.firstCandle.close, this.firstCandle.open) &&
            Math.min(this.secondCandle.close, this.secondCandle.open) > Math.min(this.firstCandle.close, this.firstCandle.open);
    }

    private secondCandleIsShortAndEngulfedByOrMatchesFirst() {
        return CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.secondCandle) &&
            Math.max(this.secondCandle.close, this.secondCandle.open) <= Math.max(this.firstCandle.close, this.firstCandle.open) &&
            Math.min(this.secondCandle.close, this.secondCandle.open) >= Math.min(this.firstCandle.close, this.firstCandle.open);
    }

}
