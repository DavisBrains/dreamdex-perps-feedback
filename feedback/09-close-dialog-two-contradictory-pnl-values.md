# Close position dialog shows "PnL if closed now +0.01" and "PnL at market value −0.09" at the same time, with no explanation
Severity: normal
Area: app



## Steps to reproduce
1. Hold a BTC-PERP long of 0.00064 BTC.
2. Click Close → market close, 100%.
3. Read the Order preview.

## Expected
One PnL figure for the close that is about to happen (based on est. exit price), or two figures clearly labelled with their basis, and "Net" consistent with the one that will be realised.

## Actual
Order preview shows Mark 76,898.22, Worst fill 76,129.20, **Est. exit price 77,062.50**, **PnL if closed now +0.01 USDso**, **PnL at market value −0.09 USDso**, Fee 0.00, **Net −0.09 USDso**. The two PnL lines have opposite signs; Net follows the mark-based number, not the est. exit. Also est. exit (77,062.5) is above mark for a long close (a sell), which is unexpected. The user cannot tell whether the close will realise a gain or a loss.

## Suggested fix
Compute "PnL if closed now" and Net from the same est. exit price (book walk), show mark-based PnL only as a labelled secondary value with a tooltip, and verify the est. exit for sells uses the bid side.

## Evidence
- [assets/close-dialog-two-pnl-values.png](assets/close-dialog-two-pnl-values.png)

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
