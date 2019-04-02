import * as indicators from "../";

export class Tan extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "TAN";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Tan";

  constructor() {
    super(Tan.INDICATOR_NAME, Tan.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.tan(inputData));
    return this.isReady;
  }
}
