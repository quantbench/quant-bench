import * as indicators from "../";

export class RelativeStrengthIndex
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "RSI";
    static INDICATOR_DESCR: string = "Relative Strength Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodCounter: number;
    private previousClose: number;
    private previousGain: number;
    private previousLoss: number;

    constructor(timePeriod: number = RelativeStrengthIndex.TIMEPERIOD_DEFAULT) {
        super(RelativeStrengthIndex.INDICATOR_NAME, RelativeStrengthIndex.INDICATOR_DESCR);

        if (timePeriod < RelativeStrengthIndex.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, RelativeStrengthIndex.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.previousClose = 0;
        this.previousGain = 0;
        this.previousLoss = 0;
        this.periodCounter = (timePeriod * -1) - 1;
        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: number): boolean {

        this.periodCounter += 1;

        if (this.periodCounter > this.timePeriod * -1) {
            if (this.periodCounter <= 0) {
                if (inputData > this.previousClose) {
                    this.previousGain += (inputData - this.previousClose);
                } else {
                    this.previousLoss -= (inputData - this.previousClose);
                }
            }

            if (this.periodCounter === 0) {
                this.previousGain /= this.timePeriod;
                this.previousLoss /= this.timePeriod;

                // Rsi = 100 * (prevGain / (prevGain + prevLoss))
                if (this.previousGain + this.previousLoss === 0) {
                    this.setCurrentValue(0);
                } else {
                    this.setCurrentValue(100 * (this.previousGain / (this.previousGain + this.previousLoss)));
                }
            }

            if (this.periodCounter > 0) {
                this.previousGain *= this.timePeriod - 1;
                this.previousLoss *= this.timePeriod - 1;

                if (inputData > this.previousClose) {
                    this.previousGain += (inputData - this.previousClose);
                } else {
                    this.previousLoss -= (inputData - this.previousClose);
                }

                this.previousGain /= this.timePeriod;
                this.previousLoss /= this.timePeriod;

                // Rsi = 100 * (prevGain / (prevGain + prevLoss))
                if (this.previousGain + this.previousLoss === 0) {
                    this.setCurrentValue(0);
                } else {
                    this.setCurrentValue(100 * (this.previousGain / (this.previousGain + this.previousLoss)));
                }
            }
        }
        this.previousClose = inputData;

        return this.isReady;
    }
}

export class RSI extends RelativeStrengthIndex {

}
