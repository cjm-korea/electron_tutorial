const Binance = require('node-binance-api');
const binance = new Binance().options({
    APIKEY: 'zCueUV2F9LlP2ezWR2qPbzZLsJzZBnbkpNTGvcuMNvzI8cTswvuYGMOAOavLYxcp',
    APISECRET: '09QiE2Mtl87Vb6rXdlByWL1n5dCNagHPrCyc8CVqbsKD9y44kNEtMC6QoiJJIwNp',
    // useServerTime: true,
    test: true
});

// let ticker = binance.prices();
// ticker.then((result) => console.log(ticker));

binance.candlesticks("BTCUSDT", "5m", (error, ticks, symbol) => {
    let ma = (parseInt(ticks[499][1])+parseInt(ticks[498][1])+parseInt(ticks[497][1])+parseInt(ticks[496][1])+parseInt(ticks[495][1]))/5
    console.log(ma)
})
// binance.balance((error, balance) => {
//     console.log("balance()", balance.USDT.available);
// });

// console.info( await binance.futuresBalance() );