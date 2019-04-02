import * as indicators from "../";

export class Ceil extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "CEIL";
  public static INDICATOR_DESCR: string = "Vector Ceil";

  constructor() {
    super(Ceil.INDICATOR_NAME, Ceil.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.ceil(inputData));
    return this.isReady;
  }
}
