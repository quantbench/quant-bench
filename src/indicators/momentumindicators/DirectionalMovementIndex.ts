import * as indicators from "../";
import * as marketData from "../../data/market/";

export class DirectionalMovementIndex extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "DX";
  public static INDICATOR_DESCR: string = "Directional Movement Index";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private minusDI: indicators.MINUSDI;
  private plusDI: indicators.PLUSDI;
  private currentPlusDI: number;
  private currentMinusDI: number;

  constructor(
    timePeriod: number = DirectionalMovementIndex.TIMEPERIOD_DEFAULT
  ) {
    super(
      DirectionalMovementIndex.INDICATOR_NAME,
      DirectionalMovementIndex.INDICATOR_DESCR
    );

    if (timePeriod < DirectionalMovementIndex.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          DirectionalMovementIndex.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.minusDI = new indicators.MINUSDI(timePeriod);
    this.minusDI.on("data", (data: number) => this.receiveMinusDIData(data));
    this.currentPlusDI = 0;
    this.plusDI = new indicators.PLUSDI(timePeriod);
    this.plusDI.on("data", (data: number) => this.receivePlusDIData(data));
    this.currentPlusDI = 0;

    this.setLookBack(timePeriod);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.minusDI.receiveData(inputData);
    this.plusDI.receiveData(inputData);
    return this.isReady;
  }

  private receiveMinusDIData(data: number) {
    this.currentMinusDI = data;
  }

  private receivePlusDIData(data: number) {
    this.currentPlusDI = data;

    if (this.currentMinusDI + this.currentPlusDI !== 0) {
      this.setCurrentValue(
        100 *
          (Math.abs(this.currentMinusDI - this.currentPlusDI) /
            (this.currentMinusDI + this.currentPlusDI))
      );
    } else {
      this.setCurrentValue(0);
    }
  }
}

export class DX extends DirectionalMovementIndex {}
