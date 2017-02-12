import { PriceBar } from "./priceBar";

export interface PriceVolumeBar extends PriceBar {
    readonly open: number;
    readonly high: number;
    readonly low: number;
    readonly close: number;
    readonly volume: number;
}
