import * as indicators from "../";

export class Floor extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "FLOOR";
  public static INDICATOR_DESCR: string = "Vector Floor";

  constructor() {
    super(Floor.INDICATOR_NAME, Floor.INDICATOR_DESCR);
  }

  public receiveData(inputData: number): boolean {
    this.setCurrentValue(Math.floor(inputData));
    return this.isReady;
  }
}
