# Order book shows resting orders 99.9% below / 48× above market in-line with near-market levels, with no grouping or warning
Severity: normal
Area: app



## Steps to reproduce
1. Open ZEC-PERP. Compare the bid side with mid (~1,226.8).
2. Open spot https://app.testnet.dreamdex.io/trade/spot/tokyo/STT:USDso. Compare the ask side with mid (0.1859).

## Expected
Levels far from the market are either rejected at placement (price band), or shown separately / flagged (e.g. collapsed "far from market" group, or a % distance column), so depth bars, totals and the visual spread reflect tradable liquidity.

## Actual
- **ZEC-PERP:** bids 1,226.5 … 1,226.0, then 1,100.000 and 1,000.000, then **1.280 (size 117.188)** and **1.200 (size 133.333)**, i.e. ~99.9% below mid 1,226.805. Asks 1,227.1 … 1,228.1, then 1,450 / 1,471.71 / 1,480. These rows take 2 of the 10 visible bid slots and the largest depth bars, and the cumulative total jumps from 38.459 to 288.980.
- **STT:USDso spot:** asks 0.1859–0.1863, then an ask at **9.0000 (size 8.00, total 1,761.50)**, ~48× mid 0.1859, shown as the next level with no gap or marker.

A user reading depth sees large liquidity that is not tradable at any sane price, and the cumulative-total column is dominated by it.

## Suggested fix
- UI: show distance from mid per level or group levels beyond X% from mid under a collapsible "far from market" row; exclude them from depth bars/cumulative totals by default.
- Protocol: consider a placement price band (reject limit orders more than N% from mark/oracle). Fills already appear band-limited, but placement is not.

## Evidence
- ZEC-PERP book: [assets/zec-perp-book-bids-1.280-1.200.png](assets/zec-perp-book-bids-1.280-1.200.png)
- STT:USDso book: [assets/stt-spot-book-ask-9.0000.png](assets/stt-spot-book-ask-9.0000.png)

## Environment
- App: https://app.testnet.dreamdex.io (web app, Chrome desktop 1280x800, Linux)
- Network: Somnia Tokyo testnet (Hideki), chain ID 50383 (per bot kit)
- SDK version: n/a (web app)
- Login: Privy with MetaMask
- MetaMask EOA (login): 0xb290d42C34D1aBce6CecAcDeC80797BD7a71e534
- Privy smart wallet "Wallet 1 / Main": 0xe217fd94b358294c741d42726603e6B1B71D7C75
- Arena wallet: 0xD7f9e4BF10f7F057fd2dc5C3827B5F558DD9a9e5
- Funds: paper USDso voucher (~1,000 USDso)
- Date: 2026-10-30
