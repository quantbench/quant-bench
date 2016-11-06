import * as indicators from "../";

export class PPO
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "PPO";
    static INDICATOR_DESCR: string = "Percentage Price Oscillator";

    constructor() {
        super(PPO.INDICATOR_NAME, PPO.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
