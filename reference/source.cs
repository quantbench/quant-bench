using System;
using System.Linq;
using QuantConnect.Indicators;
using QuantConnect.Models;

namespace QuantConnect.Algorithm.Examples
{
    /// <summary>
    /// 
    /// QuantConnect University: EMA + SMA Cross
    ///
    /// In this example we look at the canonical 15/30 day moving average cross. This algorithm
    /// will go long when the 15 crosses above the 30 and will liquidate when the 15 crosses
    /// back below the 30.
    /// </summary>
    public class QCUMovingAverageCross : QCAlgorithm
    {
        private const string Symbol = "SPY";

        private ExponentialMovingAverage fast;
        private ExponentialMovingAverage slow;
        private SimpleMovingAverage[] ribbon;

        public override void Initialize()
        {
            // set up our analysis span
            SetStartDate(2009, 01, 01);
            SetEndDate(2015, 01, 01);

            // request SPY data with minute resolution
            AddSecurity(SecurityType.Equity, Symbol, Resolution.Minute);

            // create a 15 day exponential moving average
            fast = EMA(Symbol, 15, Resolution.Daily);

            // create a 30 day exponential moving average
            slow = EMA(Symbol, 30, Resolution.Daily);

            // the following lines produce a simple moving average ribbon, this isn't
            // actually used in the algorithm's logic, but shows how easy it is to make
            // indicators and plot them!
            
            // note how we can easily define these indicators to receive hourly data
            int ribbonCount = 7;
            int ribbonInterval = 15*8;
            ribbon = new SimpleMovingAverage[ribbonCount];
            
            for(int i = 0; i < ribbonCount; i++) 
            {
                ribbon[i] = SMA(Symbol, (i + 1)*ribbonInterval, Resolution.Hour);
            }
        }

        private DateTime previous;
        public void OnData(TradeBars data)
        {
            // a couple things to notice in this method:
            //  1. We never need to 'update' our indicators with the data, the engine takes care of this for us
            //  2. We can use indicators directly in math expressions
            //  3. We can easily plot many indicators at the same time

            // wait for our slow ema to fully initialize
            if (!slow.IsReady) return;

            // only once per day
            if (previous.Date == data.Time.Date) return;

            // define a small tolerance on our checks to avoid bouncing
            const decimal tolerance = 0.00015m;
            var holdings = Portfolio[Symbol].Quantity;

            // we only want to go long if we're currently short or flat
            if (holdings <= 0)
            {
                // if the fast is greater than the slow, we'll go long
                if (fast > slow * (1 + tolerance))
                {
                    Log("BUY  >> " + Securities[Symbol].Price);
                    SetHoldings(Symbol, 1.0);
                }
            }

            // we only want to liquidate if we're currently long
            // if the fast is less than the slow we'll liquidate our long
            if (holdings > 0 && fast < slow)
            {
                Log("SELL >> " + Securities[Symbol].Price);
                Liquidate(Symbol);    
            }

            Plot(Symbol, "Price", data[Symbol].Price);
            Plot("Ribbon", "Price", data[Symbol].Price);
            
            // easily plot indicators, the series name will be the name of the indicator
            Plot(Symbol, fast, slow);
            Plot("Ribbon", ribbon);

            previous = data.Time;
        }
    }
}