# BTC-PERP pair header shows "20x" while the account trades at 7x (order panel, buying power, leverage dialog and positions all say 7x)
Severity: major
Area: app



## Steps to reproduce
1. Open BTC-PERP. Click the leverage control and set **7x** (Adjust leverage → Confirm).
2. Reload the page. Compare the badge next to "BTC-PERP" in the pair header with the order panel.
3. Open a market long ~50 USDso and look at the Positions tab.

## Expected
Every leverage indicator shows the active leverage (7x), or the header badge is labelled "Max 20x".

## Actual
- Pair header badge: **20x**.
- Order panel leverage selector: **7x**; Buying power **(7x)** 6,999.69 USDso.
- Adjust leverage dialog: "Maximum leverage is 20x", **"MarginBank: 7x (block 37398380)"**.
- Executed position: **"Perpetual · 7×"**, value 49.22 USDso, initial margin **7.03 USDso** (= 49.2 / 7).

A user glancing at the header believes they trade at 20x while the account uses 7x (or the reverse after a change), so they take a different risk than displayed.

## Suggested fix
Bind the header badge to the account's MarginBank leverage for the market (the same source as the dialog), refresh it after the leverage tx, or label it "Max".

## Evidence
- Adjust leverage dialog "MarginBank: 7x": [assets/leverage-dialog-marginbank-7x.png](assets/leverage-dialog-marginbank-7x.png)
- Header 20x vs panel 7x / position "Perpetual · 7×", IM 7.03: [assets/leverage-header-20x-position-7x.png](assets/leverage-header-20x-position-7x.png)
- Confirm order (0.00064 BTC ≈ 49.54 USDso, margin 7.43): [assets/leverage-confirm-order-7x.png](assets/leverage-confirm-order-7x.png)
- Open tx: https://explorer.testnet.somnia.network/tokyo/tx/0xdaedd26dbe5fa552073221fdd8e2f51619f1c896afd12f8274109aaa3344cc1c
- Close tx: https://explorer.testnet.somnia.network/tokyo/tx/0xab7ccfda8f42395b9003633e7bace9a0bd22457431e90eb704a7a52c8a92644b

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
