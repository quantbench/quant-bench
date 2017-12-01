// based on code from quant connect lean tool kit
// https://github.com/QuantConnect/Lean/blob/master/Indicators/CandlestickPatterns/CandleSettings.cs
// in order to implement talib pricerecognition indicator group

import * as candleEnums from "./candleEnums";
import { CandleSetting } from "./candleSetting";
import { DefaultSettings } from "./defaultCandleSettings";

export class CandleSettings {

    public static get(type: candleEnums.CandleSettingType): CandleSetting {
        switch (type) {
            case candleEnums.CandleSettingType.BodyLong:
                return DefaultSettings.bodyLong;
            case candleEnums.CandleSettingType.BodyVeryLong:
                return DefaultSettings.bodyVeryLong;
            case candleEnums.CandleSettingType.BodyShort:
                return DefaultSettings.bodyShort;
            case candleEnums.CandleSettingType.BodyDoji:
                return DefaultSettings.bodyDoji;
            case candleEnums.CandleSettingType.ShadowLong:
                return DefaultSettings.shadowLong;
            case candleEnums.CandleSettingType.ShadowVeryLong:
                return DefaultSettings.shadowVeryLong;
            case candleEnums.CandleSettingType.ShadowShort:
                return DefaultSettings.shadowShort;
            case candleEnums.CandleSettingType.ShadowVeryShort:
                return DefaultSettings.shadowVeryShort;
            case candleEnums.CandleSettingType.Near:
                return DefaultSettings.near;
            case candleEnums.CandleSettingType.Far:
                return DefaultSettings.far;
            case candleEnums.CandleSettingType.Equal:
                return DefaultSettings.equal;
        }
    }

    // public static set(type: candleEnums.CandleSettingType, setting: CandleSetting) {
    //     // DefaultSettings[type] = setting;
    // }
}
