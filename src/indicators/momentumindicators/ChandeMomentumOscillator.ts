import * as indicators from "../";

export class ChandeMomentumOscillator
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CMO";
    static INDICATOR_DESCR: string = "Chande Momentum Oscillator";

    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodCounter: number;
    private previousClose: number;
    private previousGain: number;
    private previousLoss: number;

    constructor(timePeriod: number = ChandeMomentumOscillator.TIMEPERIOD_DEFAULT) {
        super(ChandeMomentumOscillator.INDICATOR_NAME, ChandeMomentumOscillator.INDICATOR_DESCR);

        if (timePeriod < ChandeMomentumOscillator.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ChandeMomentumOscillator.TIMEPERIOD_MIN, timePeriod)));
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

                let result = 0;
                // CMO = 100 * ((prevGain - prevLoss)  / (prevGain + prevLoss))
                if (this.previousGain + this.previousLoss === 0) {
                    result = 0;
                } else {
                    result = 100 * ((this.previousGain - this.previousLoss) / (this.previousGain + this.previousLoss));
                }

                this.setCurrentValue(result);
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

                let result = 0;
                // Rsi = 100 * (prevGain / (prevGain + prevLoss))
                if (this.previousGain + this.previousLoss === 0) {
                    result = 0;
                } else {
                    result = 100 * ((this.previousGain - this.previousLoss) / (this.previousGain + this.previousLoss));
                }

                this.setCurrentValue(result);
            }
        }
        this.previousClose = inputData;

        return this.isReady;
    }
}

export class CMO extends ChandeMomentumOscillator {

}
