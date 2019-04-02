import * as indicators from "../";

export class Asin extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "ASIN";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Asin";

  constructor() {
    super(Asin.INDICATOR_NAME, Asin.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.asin(inputData));
    return this.isReady;
  }
}
