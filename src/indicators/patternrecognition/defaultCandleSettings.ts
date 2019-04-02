import * as candleEnums from "./candleEnums";
import { CandleSetting } from "./candleSetting";

export class DefaultSettings {
  public static bodyLong: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.RealBody,
    10,
    1
  );
  public static bodyVeryLong: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.RealBody,
    10,
    3
  );
  public static bodyShort: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.RealBody,
    10,
    1
  );
  public static bodyDoji: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.HighLow,
    10,
    0.1
  );
  public static shadowLong: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.RealBody,
    0,
    1
  );
  public static shadowVeryLong: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.RealBody,
    0,
    2
  );
  public static shadowShort: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.Shadows,
    10,
    1
  );
  public static shadowVeryShort: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.HighLow,
    10,
    0.1
  );
  public static near: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.HighLow,
    5,
    0.2
  );
  public static far: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.HighLow,
    5,
    0.6
  );
  public static equal: CandleSetting = new CandleSetting(
    candleEnums.CandleRangeType.HighLow,
    5,
    0.05
  );
}
