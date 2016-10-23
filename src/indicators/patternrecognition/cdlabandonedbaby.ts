import { AbstractIndicator } from "../abstractIndicator";
import { IIndicator } from "../indicator";

export const CDLABANDONEDBABY_INDICATOR_NAME: string = "CDLABANDONEDBABY";

export class CDLABANDONEDBABY
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    constructor() {
        super(CDLABANDONEDBABY_INDICATOR_NAME);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
