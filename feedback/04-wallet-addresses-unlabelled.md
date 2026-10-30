# Login EOA, smart wallet and Arena wallet are shown in different places with no labels or roles
Severity: normal
Area: app



## Steps to reproduce
1. Log in via Privy with MetaMask EOA 0xb290d42C34D1aBce6CecAcDeC80797BD7a71e534.
2. The header shows **0xe217…7C75**. Open the header menu: it lists **Wallet 1 · Main 0xe2…7C75** and a banner "Your login wallet is on Ethereum. This does not affect trading…".
3. Open Portfolio: the Trader card shows **login: 0xb290…e534**.
4. Open the Perps Arena join modal: it enters **0xD7f9…a9e5**, with a "Change" link.

## Expected
One labelled account view, e.g. "Login wallet (MetaMask) 0xb290…", "Trading wallet (smart wallet) 0xe217…", "Arena wallet 0xD7f9…", saying which one holds USDso/positions and which one to watch in the explorer.

## Actual
Three addresses appear in different places. None is labelled with its role; the "login wallet is on Ethereum" banner refers to a wallet the header doesn't show. The user can't tell which address holds funds and positions, which to fund, or which is scored in the Arena.

## Suggested fix
Add a wallet panel listing each address with role, chain, balance, copy and explorer links. In the Arena modal, explain why this address is used and what "Change" does.

## Evidence
- Header menu, "login wallet is on Ethereum" + Wallet 1 Main: [assets/header-wallet-menu-login-on-ethereum.png](assets/header-wallet-menu-login-on-ethereum.png), [assets/header-wallet-list-wallet1-main.png](assets/header-wallet-list-wallet1-main.png)
- Portfolio "login: 0xb290…e534": [assets/portfolio-login-eoa.png](assets/portfolio-login-eoa.png)
- Header address: [assets/06-header-privy-wallet.webp](assets/06-header-privy-wallet.webp)
- Arena join modal: [assets/06-arena-join-wallet.png](assets/06-arena-join-wallet.png)

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
