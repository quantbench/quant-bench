import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MFI
    extends indicators.AbstractIndicator<marketData.IPriceVolumeBar> {

    static INDICATOR_NAME: string = "MFI";
    static INDICATOR_DESCR: string = "Money Flow Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private typPrice: indicators.TYPPRICE;
    private positiveMoneyFlow: number;
    private negativeMoneyFlow: number;
    private positiveHistory: indicators.Queue<number>;
    private negativeHistory: indicators.Queue<number>;
    private previousTypPrice: number;
    private currentVolume: number;

    constructor(timePeriod: number = MFI.TIMEPERIOD_DEFAULT) {
        super(MFI.INDICATOR_NAME, MFI.INDICATOR_DESCR);

        if (timePeriod < MFI.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MFI.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = (timePeriod * -1) - 1;
        this.positiveMoneyFlow = 0;
        this.negativeMoneyFlow = 0;
        this.positiveHistory = new indicators.Queue<number>();
        this.negativeHistory = new indicators.Queue<number>();
        this.previousTypPrice = 0;
        this.currentVolume = 0;
        this.typPrice = new indicators.TYPPRICE();
        this.typPrice.on("data", (data: number) => { this.receiveTYPPRICEData(data); });
        this.setLookBack(timePeriod);
    }

    receiveData(inputData: marketData.IPriceVolumeBar): boolean {
        this.currentVolume = inputData.volume;
        this.typPrice.receiveData(inputData);
        return this.isReady;
    }

    private receiveTYPPRICEData(data: number) {
        this.periodCounter += 1;

        if (this.periodCounter > (this.timePeriod * -1)) {
            let moneyFlow = data * this.currentVolume;

            if (this.periodCounter <= 0) {
                if (data > this.previousTypPrice) {
                    this.positiveMoneyFlow += moneyFlow;
                    this.positiveHistory.enqueue(moneyFlow);
                    this.negativeHistory.enqueue(0);
                } else if (data < this.previousTypPrice) {
                    this.negativeMoneyFlow += moneyFlow;
                    this.positiveHistory.enqueue(0);
                    this.negativeHistory.enqueue(moneyFlow);
                } else {
                    this.positiveHistory.enqueue(0);
                    this.negativeHistory.enqueue(0);
                }
            }

            if (this.periodCounter === 0) {
                this.setCurrentValue(100 * (this.positiveMoneyFlow / (this.positiveMoneyFlow + this.negativeMoneyFlow)));
            }

            if (this.periodCounter > 0) {
                let firstPositive = this.positiveHistory.peek();
                this.positiveMoneyFlow -= firstPositive;

                let firstNegative = this.negativeHistory.peek();
                this.negativeMoneyFlow -= firstNegative;

                if (data > this.previousTypPrice) {
                    this.positiveMoneyFlow += moneyFlow;
                    this.positiveHistory.enqueue(moneyFlow);
                    this.negativeHistory.enqueue(0);
                } else if (data < this.previousTypPrice) {
                    this.negativeMoneyFlow += moneyFlow;
                    this.positiveHistory.enqueue(0);
                    this.negativeHistory.enqueue(moneyFlow);
                } else {
                    this.positiveHistory.enqueue(0);
                    this.negativeHistory.enqueue(0);
                }

                this.setCurrentValue(100 * (this.positiveMoneyFlow / (this.positiveMoneyFlow + this.negativeMoneyFlow)));
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
