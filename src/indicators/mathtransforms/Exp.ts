import * as indicators from "../";

export class Exp extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "EXP";
  public static INDICATOR_DESCR: string = "Vector Arithmetic Exp";

  constructor() {
    super(Exp.INDICATOR_NAME, Exp.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.exp(inputData));
    return this.isReady;
  }
}
