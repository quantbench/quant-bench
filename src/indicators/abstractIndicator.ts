import { IIndicator } from "./indicator";
import { EventEmitter } from "events";

export abstract class AbstractIndicatorBase<TInputType>
    extends EventEmitter
    implements IIndicator<TInputType> {
    public readonly name: string;
    public readonly description: string;
    private isReadyInternal: boolean;
    private lookbackInternal: number;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.lookbackInternal = 0;
        this.isReadyInternal = false;
    }

    get isReady(): boolean {
        return this.isReadyInternal;
    }

    get lookback(): number {
        return this.lookbackInternal;
    }

    protected setIsReady() {
        this.isReadyInternal = true;
    }

    protected setLookBack(lookback: number) {
        this.lookbackInternal = lookback;
    }
}

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
