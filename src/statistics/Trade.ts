import { TradeDirection } from "../TradeDirection";

export class Trade {
    public entryTime: Date;
    public entryPrice: number;
    public direction: TradeDirection;
    public quantity: number;
    public exitTime: Date;
    public exitPrice: number;
    public profitLoss: number;
    public maximumAdverseExcursion: number;
    public maximumFavourableExcursion: number;

    public constructor(entryTime: Date, entryPrice: number, direction: TradeDirection,
        quantity: number, exitTime: Date, exitPrice: number, profitLoss: number,
        maximumAdverseExcursion: number, maximumFavourableExcursion: number) {

        this.entryTime = entryTime;
        this.entryPrice = entryPrice;
        this.direction = direction;
        this.quantity = quantity;
        this.exitTime = exitTime;
        this.exitPrice = exitPrice;
        this.profitLoss = profitLoss;
        this.maximumAdverseExcursion = maximumAdverseExcursion;
        this.maximumFavourableExcursion = maximumFavourableExcursion;
    }
}
