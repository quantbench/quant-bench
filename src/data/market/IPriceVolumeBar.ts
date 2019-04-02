import { IPriceBar } from "./IPriceBar";

export interface IPriceVolumeBar extends IPriceBar {
  readonly open: number;
  readonly high: number;
  readonly low: number;
  readonly close: number;
  readonly volume: number;
}
