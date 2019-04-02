import * as indicators from "../";
import * as marketData from "../../data/market/";

export class TrueRange extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "TRANGE";
  public static INDICATOR_DESCR: string = "True Range";

  private previousClose: number;
  private periodCounter: number;

  private high: number;
  private low: number;

  constructor() {
    super(TrueRange.INDICATOR_NAME, TrueRange.INDICATOR_DESCR);

    this.previousClose = 0;
    this.periodCounter = -1;
    this.high = 0;
    this.low = 0;
    this.setLookBack(1);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.periodCounter++;

    if (this.periodCounter > 0) {
      this.high =
        inputData.high > this.previousClose
          ? inputData.high
          : this.previousClose;
      this.low =
        inputData.low < this.previousClose ? inputData.low : this.previousClose;
      this.setCurrentValue(this.high - this.low);
    }
    this.previousClose = inputData.close;

    return this.isReady;
  }
}

export class TRANGE extends TrueRange {}
