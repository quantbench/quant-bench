import * as marketData from "../../data/market/";
import * as candleEnums from "./candleEnums";
import { CandleSettings } from "./candleSettings";

export class CandleStickUtils {
    public static getRealBody(data: marketData.PriceBar): number {
        return Math.abs(data.close - data.open);
    }

    public static getUpperShadow(data: marketData.PriceBar): number {
        return data.high - (data.close >= data.open ? data.close : data.open);
    }

    public static getLowerShadow(data: marketData.PriceBar): number {
        return (data.close >= data.open ? data.open : data.close) - data.low;
    }

    public static getHighLowRange(data: marketData.PriceBar): number {
        return data.high - data.low;
    }

    public static getCandleColor(data: marketData.PriceBar): candleEnums.CandleColor {
        return data.close >= data.open ? candleEnums.CandleColor.White : candleEnums.CandleColor.Black;
    }

    public static getRealBodyGapUp(currentBar: marketData.PriceBar, previousBar: marketData.PriceBar): boolean {
        return Math.min(currentBar.open, currentBar.close) > Math.max(previousBar.open, previousBar.close);
    }

    public static getRealBodyGapDown(currentBar: marketData.PriceBar, previousBar: marketData.PriceBar): boolean {
        return Math.max(currentBar.open, currentBar.close) < Math.min(previousBar.open, previousBar.close);
    }

    public static getCandleGapUp(currentBar: marketData.PriceBar, previousBar: marketData.PriceBar): boolean {
        return currentBar.low > previousBar.high;
    }

    public static getCandleGapDown(currentBar: marketData.PriceBar, previousBar: marketData.PriceBar): boolean {
        return currentBar.high < previousBar.low;
    }

    public static getCandleRange(type: candleEnums.CandleSettingType, data: marketData.PriceBar): number {
        switch (CandleSettings.get(type).rangeType) {
            case candleEnums.CandleRangeType.RealBody:
                return CandleStickUtils.getRealBody(data);
            case candleEnums.CandleRangeType.HighLow:
                return CandleStickUtils.getHighLowRange(data);
            case candleEnums.CandleRangeType.Shadows:
                return CandleStickUtils.getUpperShadow(data) + CandleStickUtils.getLowerShadow(data);
            default:
                return 0;
        }
    }

    public static getCandleAverage(type: candleEnums.CandleSettingType, sum: number, data: marketData.PriceBar) {
        let defaultSetting = CandleSettings.get(type);

        return defaultSetting.factor *
            (defaultSetting.averagePeriod !== 0 ? sum /
                defaultSetting.averagePeriod : CandleStickUtils.getCandleRange(type, data)) /
            (defaultSetting.rangeType === candleEnums.CandleRangeType.Shadows ? 2.0 : 1.0);
    }
}
