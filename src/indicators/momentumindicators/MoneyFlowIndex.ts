import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MoneyFlowIndex extends indicators.AbstractIndicator<
  marketData.IPriceVolumeBar
> {
  public static INDICATOR_NAME: string = "MFI";
  public static INDICATOR_DESCR: string = "Money Flow Index";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private periodCounter: number;
  private typPrice: indicators.TypicalPrice;
  private positiveMoneyFlow: number;
  private negativeMoneyFlow: number;
  private positiveHistory: indicators.Queue<number>;
  private negativeHistory: indicators.Queue<number>;
  private previousTypPrice: number;
  private currentVolume: number;
  private currentMoneyFlow: number;

  constructor(timePeriod: number = MoneyFlowIndex.TIMEPERIOD_DEFAULT) {
    super(MoneyFlowIndex.INDICATOR_NAME, MoneyFlowIndex.INDICATOR_DESCR);

    if (timePeriod < MoneyFlowIndex.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          MoneyFlowIndex.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodCounter = timePeriod * -1 - 1;
    this.positiveMoneyFlow = 0;
    this.negativeMoneyFlow = 0;
    this.positiveHistory = new indicators.Queue<number>();
    this.negativeHistory = new indicators.Queue<number>();
    this.previousTypPrice = 0;
    this.currentVolume = 0;
    this.currentMoneyFlow = 0;
    this.typPrice = new indicators.TypicalPrice();
    this.typPrice.on("data", (data: number) => {
      this.receiveTYPPRICEData(data);
    });
    this.setLookBack(timePeriod);
  }

  public receiveData(inputData: marketData.IPriceVolumeBar): boolean {
    this.currentVolume = inputData.volume;
    this.typPrice.receiveData(inputData);
    return this.isReady;
  }

  private receiveTYPPRICEData(data: number) {
    this.periodCounter += 1;

    if (this.periodCounter > this.timePeriod * -1) {
      this.currentMoneyFlow = data * this.currentVolume;

      if (this.periodCounter <= 0) {
        if (data > this.previousTypPrice) {
          this.positiveMoneyFlow += this.currentMoneyFlow;
          this.positiveHistory.enqueue(this.currentMoneyFlow);
          this.negativeHistory.enqueue(0);
        } else if (data < this.previousTypPrice) {
          this.negativeMoneyFlow += this.currentMoneyFlow;
          this.positiveHistory.enqueue(0);
          this.negativeHistory.enqueue(this.currentMoneyFlow);
        } else {
          this.positiveHistory.enqueue(0);
          this.negativeHistory.enqueue(0);
        }
      }

      if (this.periodCounter === 0) {
        this.setCurrentValue(
          100 *
            (this.positiveMoneyFlow /
              (this.positiveMoneyFlow + this.negativeMoneyFlow))
        );
      }

      if (this.periodCounter > 0) {
        this.positiveMoneyFlow -= this.positiveHistory.peek();
        this.negativeMoneyFlow -= this.negativeHistory.peek();

        if (data > this.previousTypPrice) {
          this.positiveMoneyFlow += this.currentMoneyFlow;
          this.positiveHistory.enqueue(this.currentMoneyFlow);
          this.negativeHistory.enqueue(0);
        } else if (data < this.previousTypPrice) {
          this.negativeMoneyFlow += this.currentMoneyFlow;
          this.positiveHistory.enqueue(0);
          this.negativeHistory.enqueue(this.currentMoneyFlow);
        } else {
          this.positiveHistory.enqueue(0);
          this.negativeHistory.enqueue(0);
        }

        this.setCurrentValue(
          100 *
            (this.positiveMoneyFlow /
              (this.positiveMoneyFlow + this.negativeMoneyFlow))
        );
      }
    }
    this.previousTypPrice = data;

    if (this.positiveHistory.count > this.timePeriod) {
      this.positiveHistory.dequeue();
    }

    if (this.negativeHistory.count > this.timePeriod) {
      this.negativeHistory.dequeue();
    }
  }
}

export class MFI extends MoneyFlowIndex {}
