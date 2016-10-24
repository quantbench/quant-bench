export class TradingBand {
    upperBand: number;
    middleBand: number;
    lowerBand: number;

    constructor(upperBand: number, middleBand: number, lowerBand: number) {
        this.upperBand = upperBand;
        this.middleBand = middleBand;
        this.lowerBand = lowerBand;
    }
}
