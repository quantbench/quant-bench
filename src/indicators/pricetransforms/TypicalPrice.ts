import * as indicators from "../";
import * as marketData from "../../data/market/";

export class TypicalPrice extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "TYPPRICE";
  public static INDICATOR_DESCR: string = "Typical Price";

  constructor() {
    super(TypicalPrice.INDICATOR_NAME, TypicalPrice.INDICATOR_DESCR);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.setCurrentValue(
      (inputData.high + inputData.low + inputData.close) / 3.0
    );
    return this.isReady;
  }
}

export class TYPPRICE extends TypicalPrice {}
