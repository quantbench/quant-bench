export interface IIndicator<TInputType, TOutputType> {
    name: string;
    isReady: boolean;

    readonly currentValue: TOutputType;

    receiveData(inputData: TInputType): boolean;
}
