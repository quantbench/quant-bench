import * as candleEnums from "./candleEnums";
import { CandleSetting } from "./candleSetting";

export class DefaultSettings {
    static bodyLong: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.RealBody, 10, 1);
    static bodyVeryLong: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.RealBody, 10, 3);
    static bodyShort: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.RealBody, 10, 1);
    static bodyDoji: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.HighLow, 10, 0.1);
    static shadowLong: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.RealBody, 0, 1);
    static shadowVeryLong: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.RealBody, 0, 2);
    static shadowShort: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.Shadows, 10, 1);
    static shadowVeryShort: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.HighLow, 10, 0.1);
    static near: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.HighLow, 5, 0.2);
    static far: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.HighLow, 5, 0.6);
    static equal: CandleSetting = new CandleSetting(candleEnums.CandleRangeType.HighLow, 5, 0.05);
}
