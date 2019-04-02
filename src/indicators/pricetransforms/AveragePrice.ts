import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AveragePrice extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "AVGPRICE";
  public static INDICATOR_DESCR: string = "Average Price";

  constructor() {
    super(AveragePrice.INDICATOR_NAME, AveragePrice.INDICATOR_DESCR);
    this.setLookBack(0);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.setCurrentValue(
      (inputData.open + inputData.high + inputData.low + inputData.close) / 4.0
    );
    return this.isReady;
  }
}

export class AVGPRICE extends AveragePrice {}
