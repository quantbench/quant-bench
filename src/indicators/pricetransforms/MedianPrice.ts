import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MedianPrice extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "MEDPRICE";
  public static INDICATOR_DESCR: string = "Median Price";

  constructor() {
    super(MedianPrice.INDICATOR_NAME, MedianPrice.INDICATOR_DESCR);
    this.setLookBack(0);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.setCurrentValue((inputData.high + inputData.low) / 2.0);
    return this.isReady;
  }
}

export class MEDPRICE extends MedianPrice {}
