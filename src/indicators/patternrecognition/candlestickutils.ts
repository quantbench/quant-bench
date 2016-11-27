import * as marketData from "../../data/market/";

export enum CandleColor {
    red,
    black
}

export class CandleStickUtils {
    public static realBody(data: marketData.IPriceBar): number {
        return Math.abs(data.close - data.open);
    }

    public static upperShadow(data: marketData.IPriceBar): number {
        return data.high - (data.close >= data.open ? data.close : data.open);
    }

    public static lowerShadow(data: marketData.IPriceBar): number {
        return (data.close >= data.open ? data.open : data.close) - data.low;
    }

    public static highLowRange(data: marketData.IPriceBar): number {
        return data.high - data.low;
    }

    public static candleColor(data: marketData.IPriceBar): CandleColor {
        return data.close >= data.open ? CandleColor.red : CandleColor.black;
    }

    public static realBodyGapUp(firstBar: marketData.IPriceBar, secondBar: marketData.IPriceBar): boolean {
        return Math.min(secondBar.open, secondBar.close) > Math.max(firstBar.open, firstBar.close);
    }

    public static realBodyGapDown(firstBar: marketData.IPriceBar, secondBar: marketData.IPriceBar): boolean {
        return Math.max(secondBar.open, secondBar.close) < Math.min(firstBar.open, firstBar.close);
    }

    public static candleGapUp(firstBar: marketData.IPriceBar, secondBar: marketData.IPriceBar): boolean {
        return secondBar.low > firstBar.high;
    }

    public static candleGapDown(firstBar: marketData.IPriceBar, secondBar: marketData.IPriceBar): boolean {
        return secondBar.high < firstBar.low;
    }
}
