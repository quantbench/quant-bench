import * as indicators from "../";

export class Atan extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "ATAN";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Atan";

  constructor() {
    super(Atan.INDICATOR_NAME, Atan.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.atan(inputData));
    return this.isReady;
  }
}
