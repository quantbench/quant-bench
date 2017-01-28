import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLDOJISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDOJISTAR";
    static INDICATOR_DESCR: string = "Doji Star";

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;
    private bodyLongPeriodTotal: number;
    private bodyLongAveragePeriod: number;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private firstCandleColor: candleEnums.CandleColor;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLDOJISTAR.INDICATOR_NAME, CDLDOJISTAR.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.bodyLongPeriodTotal = 0;

        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(this.bodyDojiAveragePeriod, this.bodyLongAveragePeriod) + 1;
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {

        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            this.seedSlidingWindow(inputData);
            return this.isReady;
        }

        this.firstCandle = this.slidingWindow.getItem(1);
        this.firstCandleColor = CandleStickUtils.getCandleColor(this.firstCandle);
        this.secondCandle = inputData;

        if (this.firstCandleHasLongRealBody() &&
            this.secondCandleIsDoji() &&
            this.secondCandleHasGap()) {
            this.setCurrentValue(this.firstCandleColor * -100);
        } else {
            this.setCurrentValue(0);
        }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
            this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1));

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        return this.isReady;
    }

    private seedSlidingWindow(inputData: marketData.IPriceBar) {
        if (this.isFirstCandle()) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }
        if (this.isSecondCandle()) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }
    }

    private isFirstCandle(): boolean {
        return this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 1 &&
            this.slidingWindow.samples < this.slidingWindow.period - 1;
    }

    private isSecondCandle(): boolean {
        return this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod;
    }

    private firstCandleHasLongRealBody(): boolean {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                this.bodyLongPeriodTotal,
                this.firstCandle);
    }

    private secondCandleIsDoji(): boolean {
        return CandleStickUtils.getRealBody(this.secondCandle) <=
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji,
                this.bodyDojiPeriodTotal, this.secondCandle);
    }

    private secondCandleHasGap(): boolean {
        return (this.firstCandleColor === candleEnums.CandleColor.White && this.hasGapUp())
            ||
            // or down if 1st is black
            (this.firstCandleColor === candleEnums.CandleColor.Black && this.hasGapDown());
    }

    private hasGapUp(): boolean {
        return CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
    }

    private hasGapDown(): boolean {
        return CandleStickUtils.getRealBodyGapDown(this.secondCandle, this.firstCandle);
    }
}
