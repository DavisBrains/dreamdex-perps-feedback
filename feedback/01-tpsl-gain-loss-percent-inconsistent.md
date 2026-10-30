# TP/SL "Gain %" / "Loss %" matches neither the price move nor leveraged ROE
Severity: major
Area: app

## Steps to reproduce
1. Open BTC-PERP, Market, Long, leverage 7x, size `50` USDso.
2. Tick **TP/SL** in the order form.
3. Enter TP trigger `85000` and SL trigger `70000`.
4. Read the Gain % and Loss % fields.

## Expected
One clearly labelled basis, computed from the expected entry (≈ mark 76,854.2 / mid 77,038.5 at the time):
- price move: TP ≈ +10.33% to +10.60%, SL ≈ −8.92% to −9.14%; or
- ROE at 7x: TP ≈ +72% to +74%, SL ≈ −62% to −64% (before fees).

## Actual
Retest (2026-10-30, 7x, 50 USDso, mark 76,854.2, mid 77,038.5):
- TP 85,000 → **Gain 9.79%**. Price move is 10.60% from mark or 10.33% from mid.
- SL 70,000 → **Loss 9.59%**. Price move is 8.92% from mark or 9.14% from mid.

Earlier data point (20x, existing position filled at 77,021.6): TP 85,000 → **Gain 9.71%** (price move 10.36%), SL 70,000 → **Loss 9.65%** (price move 9.12%).

Both times TP is understated and SL is overstated relative to the price move, by roughly the same amounts, and neither is close to ROE. A user sizing stops from these fields will set them at the wrong distance.

## Suggested fix
Compute both from the expected entry price: show `(trigger − entry) / entry` as "Price %" and multiply by leverage for "ROE %". Label which one is shown (or show both) and state whether fees are included. Make the reverse input (typing a %) use the same formula.

## Evidence
- Retest screenshot (TP 85000 / Gain 9.79, SL 70000 / Loss 9.59, mark 76,854.2, mid 77,038.5): [assets/tpsl-gain-9.79-loss-9.59.png](assets/tpsl-gain-9.79-loss-9.59.png)
- Earlier run open tx: https://explorer.testnet.somnia.network/tokyo/tx/0x74a94708be664e196c5b15a7c8b200219b347b401492ebcb0784f875e720becb
- Earlier run close tx: https://explorer.testnet.somnia.network/tokyo/tx/0x99d58804f947c27b8c530ef4793bea98aef38587904f10221351c979fd570e2e

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
