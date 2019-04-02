// based on code from quant connect lean tool kit
// https://github.com/QuantConnect/Lean/blob/master/Indicators/CandlestickPatterns/CandleSettings.cs
// in order to implement talib pricerecognition indicator group

import { CandleRangeType } from "./candleEnums";

export class CandleSetting {
  // The candle range type
  public readonly rangeType: CandleRangeType;

  // The number of previous candles to average
  public readonly averagePeriod: number;

  // A multiplier to calculate candle ranges
  public readonly factor: number;

  public constructor(
    rangeType: CandleRangeType,
    averagePeriod: number,
    factor: number
  ) {
    this.rangeType = rangeType;
    this.averagePeriod = averagePeriod;
    this.factor = factor;
  }
}
