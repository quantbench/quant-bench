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
    private periodCounter: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLDOJISTAR.INDICATOR_NAME, CDLDOJISTAR.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyLongAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyLong).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.bodyLongPeriodTotal = 0;
        this.periodCounter = -1;
        let lookback = Math.max(this.bodyDojiAveragePeriod, this.bodyLongAveragePeriod) + 1;
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(lookback + 1);
        this.setLookBack(lookback);

    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter++;
        this.slidingWindow.add(inputData);

        if (this.periodCounter < this.lookback - 1) {
            let realbody = CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
            this.bodyLongPeriodTotal += realbody;
        }
        if (this.periodCounter > 0 && this.periodCounter < this.lookback) {
            let highlow = CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
            this.bodyDojiPeriodTotal += highlow;
        }

        if (this.periodCounter >= this.lookback) {
            let previousCandle: marketData.IPriceBar = this.slidingWindow.getItem(1);
            let currentCandle = inputData;

            let hasPreviousLongRealBody = CandleStickUtils.getRealBody(previousCandle) >
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                    this.bodyLongPeriodTotal,
                    previousCandle);

            let hasCurrentDoji = CandleStickUtils.getRealBody(currentCandle) <=
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji,
                    this.bodyDojiPeriodTotal, currentCandle);

            let hasGapUp = CandleStickUtils.getRealBodyGapUp(previousCandle, currentCandle);
            let hasGapDown = CandleStickUtils.getRealBodyGapDown(previousCandle, currentCandle);

            let previousCandleColor = CandleStickUtils.getCandleColor(previousCandle);

            // 1st: long real body
            if (hasPreviousLongRealBody &&
                // 2nd: doji
                hasCurrentDoji &&
                // that gaps up if 1st is white
                ((previousCandleColor === candleEnums.CandleColor.White && hasGapUp)
                    ||
                    // or down if 1st is black
                    (previousCandleColor === candleEnums.CandleColor.Black && hasGapDown)
                )) {
                this.setCurrentValue(-previousCandleColor * 100);
            } else {
                this.setCurrentValue(0);
            }

            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                previousCandle) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1));

            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, currentCandle) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                    this.slidingWindow.getItem(this.bodyDojiAveragePeriod));
        }

        return this.isReady;
    }
}
