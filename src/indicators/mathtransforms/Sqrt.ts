import * as indicators from "../";

export class Sqrt extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "SQRT";
  public static INDICATOR_DESCR: string = "Vector Square Root";

  constructor() {
    super(Sqrt.INDICATOR_NAME, Sqrt.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.sqrt(inputData));
    return this.isReady;
  }
}
