# Mobile (400 px): Portfolio header description is squeezed into a narrow column and wraps one word per line
Severity: normal
Area: app

## Steps to reproduce
1. Open https://app.testnet.dreamdex.io/portfolio.
2. Chrome DevTools device toolbar → Responsive, width 400 px (height 977).

## Expected
The description "Your balances, performance and activity, for the account you are signed in with." spans the width, with the auto-buy gas / two-step trades toggles below it.

## Actual
The description and the toggles share one row; the description is squeezed into a ~60 px column and wraps nearly word by word over 10 lines ("Your / balances, / performance / and / activity, …"), pushing content down.

## Suggested fix
Stack the toggles below the description under a breakpoint (flex-wrap / flex-col on small screens) or give the description `min-width` / `flex: 1`.

## Evidence
- [assets/mobile-400px-portfolio-description.webp](assets/mobile-400px-portfolio-description.webp)

## Environment
- App: https://app.testnet.dreamdex.io (web app, Chrome desktop 1280x800, Linux); mobile viewport emulated at 400x977 in DevTools
- Network: Somnia Tokyo testnet (Hideki), chain ID 50383 (per bot kit)
- SDK version: n/a (web app)
- Login: Privy with MetaMask
- MetaMask EOA (login): 0xb290d42C34D1aBce6CecAcDeC80797BD7a71e534
- Privy smart wallet "Wallet 1 / Main": 0xe217fd94b358294c741d42726603e6B1B71D7C75
- Arena wallet: 0xD7f9e4BF10f7F057fd2dc5C3827B5F558DD9a9e5
- Funds: paper USDso voucher (~1,000 USDso)
- Date: 2026-10-30
