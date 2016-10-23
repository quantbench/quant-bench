import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const PPO_INDICATOR_NAME: string = "PPO";

export class PPO
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(PPO_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
