import * as indicators from "../";

export class Cosh extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "COSH";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Cosh";

  constructor() {
    super(Cosh.INDICATOR_NAME, Cosh.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.cosh(inputData));
    return this.isReady;
  }
}
