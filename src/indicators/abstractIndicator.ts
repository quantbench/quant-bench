import { EventEmitter } from "events";
import { AbstractIndicatorBase } from "./abstractIndicatorBase";

export abstract class AbstractIndicator<TInputType> extends AbstractIndicatorBase<TInputType> {
    protected currentValueInternal: number;

    get currentValue(): number {
        return this.currentValueInternal;
    }

    protected setCurrentValue(newValue: number) {
        this.currentValueInternal = newValue;
        this.emit("data", this.currentValue);
        this.setIsReady();
    }
}
