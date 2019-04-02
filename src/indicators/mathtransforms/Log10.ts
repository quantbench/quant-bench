import * as indicators from "../";

export class Log10 extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "LOG10";
  public static INDICATOR_DESCR: string = "Vector Log10";

  constructor() {
    super(Log10.INDICATOR_NAME, Log10.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.log10(inputData));
    return this.isReady;
  }
}
