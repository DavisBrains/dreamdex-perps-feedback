# dreamDEX Markets read-only tool

A small Node.js script that uses the official dreamDEX / Somnia Markets SDK
(`@somnia-chain/markets-sdk` **0.32.1**, docs: https://prd.smk.somnia.host/docs/typescript)
to read perps market data from **Somnia Tokyo testnet** (Hideki chain, chainId 50383).

**Read-only.** It takes no private key, creates no wallet, signs nothing and sends no
transactions. It only runs indexer queries (`listPerpMarkets`) and contract view calls
(`getPerpState`, `getSpotOrderBook`, which reads perp pools too since they share the OrderBook base).

What it prints:
- every perp market with last price, mark price, funding rate per 8h window and open interest
- for one market (default BTC-PERP): last / mark / index price, funding and next settlement,
  open interest, spread, and the order book with each level's distance from mark
- optional `--json` dump of the order book (useful evidence for far-from-mark resting orders, see report 02)

## Install
Node 18+ required.
```bash
cd tools
npm install
```

## Run
```bash
node markets.mjs                                   # BTC-PERP, 12 levels per side
node markets.mjs --market ETH --depth 20
node markets.mjs --market BTC --json sample-orderbook.json
```

Sample output: [sample-output.txt](sample-output.txt), [sample-orderbook.json](sample-orderbook.json).

Endpoints come from the SDK's `hidekiTestnet` chain definition and `SOMNIA_HIDEKI_TESTNET_ADDRESSES`;
indexer: `https://hideki-dev.smk.somnia.host/v1/graphql`.
