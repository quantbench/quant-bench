import * as indicators from "../";

export class Acos extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "ACOS";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Acos";

  constructor() {
    super(Acos.INDICATOR_NAME, Acos.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.acos(inputData));
    return this.isReady;
  }
}
