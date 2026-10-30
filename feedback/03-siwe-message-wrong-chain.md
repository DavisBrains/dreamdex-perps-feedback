# Privy Sign-In With Ethereum message uses Chain ID 1 (Ethereum) on Somnia testnet
Severity: normal
Area: app

## Steps to reproduce
1. Go to https://app.testnet.dreamdex.io and click log in.
2. Choose Privy → MetaMask.
3. Read the signature request in MetaMask.

## Expected
The SIWE message uses the Somnia Tokyo testnet chain ID (50383).

## Actual
The message shows **Ethereum, Chain ID: 1** (URI app.testnet.dreamdex.io, Version 1, Resources privy.io). This is misleading on a testnet app, and some wallets warn about or reject SIWE messages whose chain differs from the connected network.

## Suggested fix
Set the SIWE `chainId` in the Privy config to the Somnia testnet chain (50383) or the wallet's active chain.

## Evidence
- [assets/05-siwe-chain-id-1.webp](assets/05-siwe-chain-id-1.webp)
- [assets/05-siwe-chain-id-1-alt.webp](assets/05-siwe-chain-id-1-alt.webp)

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
