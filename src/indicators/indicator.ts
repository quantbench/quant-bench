export interface IIndicator<TInputType> {
    name: string;
    description: string;
    isReady: boolean;

    readonly lookback: number;
}
