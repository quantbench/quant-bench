import { PriceBar } from "./PriceBar";

export interface TradeBar extends PriceBar {
    readonly symbol: string;
    readonly time: Date;
    readonly open: number;
    readonly high: number;
    readonly low: number;
    readonly close: number;
    readonly volume: number;
}

// export class TradeBar implements ITradeBar {
//     readonly symbol: string;
//     readonly time: Date;
//     readonly open: number;
//     readonly high: number;
//     readonly low: number;
//     readonly close: number;
//     readonly volume: number;

//     constructor(symbol: string, time: Date, open: number, high: number, low: number, close: number, volume: number) {
//         this.symbol = symbol;
//         this.time = time;
//         this.open = open;
//         this.high = high;
//         this.low = low;
//         this.close = close;
//         this.volume = volume;
//     }
// }
