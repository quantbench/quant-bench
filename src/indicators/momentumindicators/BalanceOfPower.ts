import * as indicators from "../";
import * as marketData from "../../data/market/";

export class BalanceOfPower extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "BOP";
  public static INDICATOR_DESCR: string = "Balance Of Power";

  private highLow: number;
  constructor() {
    super(BalanceOfPower.INDICATOR_NAME, BalanceOfPower.INDICATOR_DESCR);

    this.highLow = 0;
    this.setLookBack(0);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.highLow = inputData.high - inputData.low;
    if (this.highLow === 0) {
      this.setCurrentValue(0);
    } else {
      this.setCurrentValue((inputData.close - inputData.open) / this.highLow);
    }
    return this.isReady;
  }
}

export class BOP extends BalanceOfPower {}
