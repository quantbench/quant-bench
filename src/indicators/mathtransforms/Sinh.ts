import * as indicators from "../";

export class Sinh extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "SINH";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Sinh";

  constructor() {
    super(Sinh.INDICATOR_NAME, Sinh.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.sinh(inputData));
    return this.isReady;
  }
}
