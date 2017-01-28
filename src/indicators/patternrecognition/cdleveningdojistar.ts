import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLEVENINGDOJISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLEVENINGDOJISTAR";
    static INDICATOR_DESCR: string = "Evening Doji Star";

    static PENETRATION_DEFAULT: number = 0.3;

    private bodyLongPeriodTotal: number;

    private bodyLongAveragePeriod: number;

    private bodyShortPeriodTotal: number;

    private bodyShortAveragePeriod: number;

    private bodyDojiPeriodTotal: number;

    private bodyDojiAveragePeriod: number;

    private penetration: number;

    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    private thirdCandle: marketData.IPriceBar;
    private secondCandle: marketData.IPriceBar;
    private firstCandle: marketData.IPriceBar;
    private thirdCandleColor: candleEnums.CandleColor;
    private secondCandleColor: candleEnums.CandleColor;
    private firstCandleColor: candleEnums.CandleColor;

    constructor(penetration: number = CDLEVENINGDOJISTAR.PENETRATION_DEFAULT) {
        super(CDLEVENINGDOJISTAR.INDICATOR_NAME, CDLEVENINGDOJISTAR.INDICATOR_DESCR);

        this.penetration = penetration;

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyLongPeriodTotal = 0;
        this.bodyShortAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyShort).averagePeriod;
        this.bodyShortPeriodTotal = 0;

        this.thirdCandle = undefined;
        this.secondCandle = undefined;
        this.firstCandle = undefined;
        this.thirdCandleColor = candleEnums.CandleColor.Black;
        this.secondCandleColor = candleEnums.CandleColor.Black;
        this.firstCandleColor = candleEnums.CandleColor.Black;

        let lookback = Math.max(Math.max(this.bodyDojiAveragePeriod, this.bodyLongAveragePeriod), this.bodyShortAveragePeriod) + 2;
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

        let a = this.firstCandleIsALongWhiteCandle();
        let b = this.secondCandleIsADojiGappingUp();
        let c = this.thirdCandleIsBlackLongerThanShortAndClosingWithinFirstCandleRealBody();

        if (a && b && c) {
            this.setCurrentValue(-100);
        } else {
            this.setCurrentValue(0);
        }

        // if (this.firstCandleIsALongWhiteCandle() &&
        //     this.secondCandleIsADojiGappingUp() &&
        //     this.thirdCandleIsBlackLongerThanShortAndClosingWithinFirstCandleRealBody()) {
        //     this.setCurrentValue(-100);
        // } else {
        //     this.setCurrentValue(0);
        // }

        this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, this.firstCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(this.bodyLongAveragePeriod + 2));

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, this.secondCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod + 1));

        this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, this.thirdCandle) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort,
                this.slidingWindow.getItem(this.bodyShortAveragePeriod));

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
        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyLongAveragePeriod - 2 &&
            this.slidingWindow.samples < this.slidingWindow.period - 2) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod - 1 &&
            this.slidingWindow.samples < this.slidingWindow.period - 1) {
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        }

        if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyShortAveragePeriod) {
            this.bodyShortPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyShort, inputData);
        }
    }

    private firstCandleIsALongWhiteCandle() {
        return CandleStickUtils.getRealBody(this.firstCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong, this.bodyLongPeriodTotal, this.firstCandle) &&
            this.firstCandleColor === candleEnums.CandleColor.White;
    }

    private secondCandleIsADojiGappingUp() {
        // return CandleStickUtils.getRealBody(this.secondCandle) <=
        //     CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.secondCandle) &&
        //     CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
        let a = CandleStickUtils.getRealBody(this.secondCandle);
        let b = CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji, this.bodyDojiPeriodTotal, this.secondCandle);
        let c = CandleStickUtils.getRealBodyGapUp(this.secondCandle, this.firstCandle);
        return a <= b && c;
    }

    private thirdCandleIsBlackLongerThanShortAndClosingWithinFirstCandleRealBody() {
        return this.thirdCandleColor === candleEnums.CandleColor.Black &&
            CandleStickUtils.getRealBody(this.thirdCandle) >
            CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyShort, this.bodyShortPeriodTotal, this.thirdCandle) &&
            this.thirdCandle.close < this.firstCandle.close - CandleStickUtils.getRealBody(this.firstCandle) * this.penetration;
    }
}
