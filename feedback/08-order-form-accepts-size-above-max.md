# Order form accepts a size 14× above "Max order size" with no size error; submit stays enabled
Severity: normal
Area: app

## Steps to reproduce
1. Open BTC-PERP, Market, Long, 7x, equity ~999.95 USDso. The form shows **Max order size 6,999.38 USDso**.
2. Enter size `100000` USDso.

## Expected
A validation error such as "Exceeds max order size (6,999.38 USDso)", submit disabled, optionally a "Set to max" action.

## Actual
The form accepts 100000 (order value 99,999.69 USDso, maximum spent 99,999.69, slider 100%). The only message is **"No liquidity within 0.5%"**, which names a different cause. The **Long BTC** button stays enabled, so the user can sign an order that cannot be margined.

## Suggested fix
Validate size against max order size before liquidity checks, show the size error first, and disable submit.

## Evidence
- [assets/over-max-size-100000-submit-enabled.png](assets/over-max-size-100000-submit-enabled.png)
- [assets/over-max-size-100000-submit-enabled-2.png](assets/over-max-size-100000-submit-enabled-2.png)
- No transaction (not submitted).

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
