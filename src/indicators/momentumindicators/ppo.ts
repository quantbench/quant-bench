import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const PPO_INDICATOR_NAME: string = "PPO";
export const PPO_INDICATOR_DESCR: string = "Percentage Price Oscillator";

export class PPO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(PPO_INDICATOR_NAME, PPO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
