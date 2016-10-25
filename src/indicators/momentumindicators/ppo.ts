import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class PPO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static PPO_INDICATOR_NAME: string = "PPO";
    static PPO_INDICATOR_DESCR: string = "Percentage Price Oscillator";

    constructor() {
        super(PPO.PPO_INDICATOR_NAME, PPO.PPO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
