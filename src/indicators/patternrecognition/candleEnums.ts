// sourced from quant connect lean tool kit
// https://github.com/QuantConnect/Lean/blob/master/Indicators/CandlestickPatterns/CandleEnums.cs
// in order to implement talib pricerecognition indicator group

// Types of candlestick settings
export enum CandleSettingType {

    // Real body is long when it's longer than the average of the 10 previous candles' real body
    BodyLong = 0,

    // Real body is very long when it's longer than 3 times the average of the 10 previous candles' real body
    BodyVeryLong = 1,

    // Real body is short when it's shorter than the average of the 10 previous candles' real bodies
    BodyShort = 2,

    // Real body is like doji's body when it's shorter than 10% the average of the 10 previous candles' high-low range
    BodyDoji = 3,

    // Shadow is long when it's longer than the real body
    ShadowLong = 4,

    // Shadow is very long when it's longer than 2 times the real body
    ShadowVeryLong = 5,

    // Shadow is short when it's shorter than half the average of the 10 previous candles' sum of shadows
    ShadowShort = 6,

    // Shadow is very short when it's shorter than 10% the average of the 10 previous candles' high-low range
    ShadowVeryShort = 7,

    // When measuring distance between parts of candles or width of gaps
    // "near" means "&lt;= 20% of the average of the 5 previous candles' high-low range"
    Near = 8,

    // When measuring distance between parts of candles or width of gaps
    // "far" means "&gt;= 60% of the average of the 5 previous candles' high-low range"
    Far = 9,

    // When measuring distance between parts of candles or width of gaps
    // "equal" means "&lt;= 5% of the average of the 5 previous candles' high-low range"
    Equal = 10,
}

// Types of candlestick ranges
export enum CandleRangeType {

    // The part of the candle between open and close
    RealBody,

    // The complete range of the candle
    HighLow,

    // The shadows (or tails) of the candle
    Shadows,
}

// Colors of a candle
export enum CandleColor {

    // White is an up candle (close higher or equal than open)
    White = 1,

    // Black is a down candle (close lower than open)
    Black = -1,
}
