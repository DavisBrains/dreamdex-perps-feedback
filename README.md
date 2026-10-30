# dreamDEX Perps Bounty — Feedback

Participant repo for the DoraHacks dreamDEX Perps Bounty (Feedback track). Testing was done on Somnia Tokyo testnet via https://app.testnet.dreamdex.io on 2026-10-30.

| # | Report | Severity |
|---|--------|----------|
| 01 | [TP/SL "Gain %" / "Loss %" matches neither the price move nor leveraged ROE](feedback/01-tpsl-gain-loss-percent-inconsistent.md) | major |
| 02 | [Order book shows resting orders 99.9% below / 48× above market in-line with near-market levels, with no grouping or warning](feedback/02-orderbook-far-off-market-orders-rendered-inline.md) | normal |
| 03 | [Privy Sign-In With Ethereum message uses Chain ID 1 (Ethereum) on Somnia testnet](feedback/03-siwe-message-wrong-chain.md) | normal |
| 04 | [Login EOA, smart wallet and Arena wallet are shown in different places with no labels or roles](feedback/04-wallet-addresses-unlabelled.md) | normal |
| 05 | [Size input silently rewrites invalid input ("-5" → "5", "1e3" → "13")](feedback/05-size-input-silent-rewrite.md) | normal |
| 06 | [BTC-PERP pair header shows "20x" while the account trades at 7x (order panel, buying power, leverage dialog and positions all say 7x)](feedback/06-pair-header-leverage-badge-20x-while-account-at-7x.md) | major |
| 07 | [Order form accepts a size 14× above "Max order size" with no size error; submit stays enabled](feedback/07-order-form-accepts-size-above-max.md) | normal |
| 08 | [Close position dialog shows "PnL if closed now +0.01" and "PnL at market value −0.09" at the same time, with no explanation](feedback/08-close-dialog-two-contradictory-pnl-values.md) | normal |
| 09 | [Mobile (400 px): Portfolio header description is squeezed into a narrow column and wraps one word per line](feedback/09-mobile-portfolio-description-wraps-word-by-word.md) | normal |

## Tools

- [tools/](tools/README.md): read-only dreamDEX perps reader built on the official Markets SDK (`@somnia-chain/markets-sdk`), Somnia Tokyo testnet. No keys, no transactions.
