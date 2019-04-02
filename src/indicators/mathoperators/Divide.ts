import * as indicators from "../";

export class Divide extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "Divide";
  public static INDICATOR_DESCR: string = "Vector Arithmetic Div";

  constructor() {
    super(Divide.INDICATOR_NAME, Divide.INDICATOR_DESCR);
  }

  public receiveData(inputData1: number, inputData2: number): boolean {
    this.setCurrentValue(inputData1 / inputData2);
    return this.isReady;
  }
}
