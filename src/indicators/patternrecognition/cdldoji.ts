import * as indicators from "../";
import * as marketData from "../../data/market/";
import { SlidingWindow } from "../slidingWindow";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";
import { CandleStickUtils } from "./candleUtils";

export class CDLDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDOJI";
    static INDICATOR_DESCR: string = "Doji";

    private bodyDojiPeriodTotal: number;
    private bodyDojiAveragePeriod: number;
    private slidingWindow: SlidingWindow<marketData.IPriceBar>;

    constructor() {
        super(CDLDOJI.INDICATOR_NAME, CDLDOJI.INDICATOR_DESCR);

        this.bodyDojiAveragePeriod = CandleSettings.get(candleEnums.CandleSettingType.BodyDoji).averagePeriod;
        this.bodyDojiPeriodTotal = 0;
        this.slidingWindow = new SlidingWindow<marketData.IPriceBar>(this.bodyDojiAveragePeriod + 1);
        this.setLookBack(this.bodyDojiAveragePeriod);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.slidingWindow.add(inputData);

        if (!this.slidingWindow.isReady) {
            if (this.slidingWindow.samples >= this.slidingWindow.period - this.bodyDojiAveragePeriod) {
                this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData);
            }
            return this.isReady;
        }
        let realBody = CandleStickUtils.getRealBody(inputData);
        let average = CandleStickUtils.getCandleAverage(candleEnums.CandleSettingType.BodyDoji,
            this.bodyDojiPeriodTotal, inputData);
        this.setCurrentValue(realBody <= average ? 100 : 0);

        this.bodyDojiPeriodTotal += CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji, inputData) -
            CandleStickUtils.getCandleRange(candleEnums.CandleSettingType.BodyDoji,
                this.slidingWindow.getItem(this.bodyDojiAveragePeriod));

        return this.isReady;
    }
}
