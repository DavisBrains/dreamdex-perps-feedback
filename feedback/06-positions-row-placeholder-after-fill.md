# Positions row shows "—" and a disabled Close button for ~5–8 s after a fill
Severity: normal
Area: app

## Steps to reproduce
1. Place a market order on a perps market and wait for the fill toast.
2. Watch the new row in the Positions tab.

## Expected
Value, entry, and PnL appear as soon as the fill is confirmed, or a loading indicator shows.

## Actual
For about 5–8 s the row shows "—" for value, entry, and PnL, and the Close button is disabled. The user can't exit the position during that window and gets no loading state.

## Suggested fix
Fill the row from the fill event or tx receipt right away, or show a spinner and "syncing" label. Allow Close as soon as the position exists on-chain.

## Evidence

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
