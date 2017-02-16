import { EventEmitter } from "events";
import { Indicator } from "./Indicator";

export abstract class AbstractIndicatorBase<TInputType>
    extends EventEmitter
    implements Indicator<TInputType> {
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
