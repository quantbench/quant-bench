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

        if (this.periodCounter === 0) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
        } else if (this.periodCounter < this.lookback) {
            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong, inputData);
            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
        } else {
            // 1st: long real body
            if (CandleStickUtils.getRealBody(this.slidingWindow.getItem(1)) >
                CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyLong,
                    this.bodyLongPeriodTotal,
                    this.slidingWindow.getItem(1)) &&
                // 2nd: doji
                CandleStickUtils.getRealBody(inputData) <= CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji,
                    this.bodyDojiPeriodTotal, inputData) &&
                //      that gaps up if 1st is white
                ((CandleStickUtils.getCandleColor(this.slidingWindow.getItem(1)) ===
                    candleEnums.CandleColor.White && CandleStickUtils.getRealBodyGapUp(inputData, this.slidingWindow.getItem(1)))
                    ||
                    //      or down if 1st is black
                    (CandleStickUtils.getCandleColor(this.slidingWindow.getItem(1)) ===
                        candleEnums.CandleColor.Black && CandleStickUtils.getRealBodyGapDown(inputData, this.slidingWindow.getItem(1)))
                )) {
                this.setCurrentValue(-CandleStickUtils.getCandleColor(this.slidingWindow.getItem(1)));
            } else {
                this.setCurrentValue(0);
            }

            this.bodyLongPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                this.slidingWindow.getItem(1)) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyLong,
                    this.slidingWindow.getItem(this.bodyLongAveragePeriod + 1));

            this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData) -
                CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                    this.slidingWindow.getItem(this.bodyDojiAveragePeriod));
        }

        return this.isReady;
    }
}
