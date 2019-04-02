import * as indicators from "../";

export class Sin extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "SIN";
  public static INDICATOR_DESCR: string = "Vector Trigonometric Sin";

  constructor() {
    super(Sin.INDICATOR_NAME, Sin.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.sin(inputData));
    return this.isReady;
  }
}
