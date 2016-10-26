import { IIndicator } from "./indicator";
import { EventEmitter } from "events";

export abstract class AbstractIndicator<TInputType, TOutputType>
    extends EventEmitter
    implements IIndicator<TInputType, TOutputType> {
    public readonly name: string;
    public readonly description: string;
    private currentValueInternal: TOutputType;
    private isReadyInternal: boolean;
    private lookbackInternal: number;

    constructor(name: string, description: string) {
        super();
        this.name = name;
        this.description = description;
        this.lookbackInternal = 0;
    }

    get currentValue(): TOutputType {
        return this.currentValueInternal;
    }

    get isReady(): boolean {
        return this.isReadyInternal;
    }

    get lookback(): number {
        return this.lookbackInternal;
    }

    abstract receiveData(inputData: TInputType): boolean;

    protected setIsReady() {
        this.isReadyInternal = true;
    }

    protected setCurrentValue(newValue: TOutputType) {
        this.currentValueInternal = newValue;
        this.emit("data", this.currentValue);
        this.setIsReady();
    }

    protected setLookBack(lookback: number) {
        this.lookbackInternal = lookback;
    }
}
