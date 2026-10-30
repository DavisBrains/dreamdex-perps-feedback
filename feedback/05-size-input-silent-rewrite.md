# Size input silently rewrites invalid input ("-5" → "5", "1e3" → "13")
Severity: normal
Area: app

## Steps to reproduce
1. Open BTC-PERP, Market, Long (7x).
2. Type `1e3` in Size. It becomes `13` (order value 12.40 USDso).
3. Clear the field and type `-5`. It becomes `5`, and the form then shows "Min order: 0.00013 BTC ≈ 10.08 USDso".

## Expected
Reject invalid characters with a visible message, or parse `1e3` as 1,000. Never change the value to a different valid number without telling the user.

## Actual
Invalid characters are stripped silently. `1e3`, a plausible way to write 1,000, becomes 13, a valid but different size, and the submit button stays enabled. `-5` becomes `5`; the only message is the unrelated min-order warning. This can lead to a wrong-size order.

## Suggested fix
Validate on input. Show "Invalid number" and keep the raw text until corrected, or block disallowed keys without merging the remaining digits.

## Evidence
- `1e3` → `13`: [assets/size-input-1e3-becomes-13.png](assets/size-input-1e3-becomes-13.png)
- `-5` → `5` with min-order error: [assets/size-input-minus5-becomes-5-min-order.png](assets/size-input-minus5-becomes-5-min-order.png)

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
