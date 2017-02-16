import { PriceBar } from "./PriceBar";

export interface PriceVolumeBar extends PriceBar {
    readonly open: number;
    readonly high: number;
    readonly low: number;
    readonly close: number;
    readonly volume: number;
}
