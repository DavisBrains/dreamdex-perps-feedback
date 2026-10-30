#!/usr/bin/env node
// dreamDEX perps market reader: READ-ONLY.
// Uses the official @somnia-chain/markets-sdk with NO private key, NO wallet,
// NO signing and NO transactions. Only indexer queries and contract view calls.
//
// Usage:
//   node markets.mjs [--market BTC] [--depth 12] [--json book.json]
import { writeFileSync } from 'node:fs';
import { formatUnits } from 'viem';
import { SomniaMarkets, SOMNIA_HIDEKI_TESTNET_ADDRESSES } from '@somnia-chain/markets-sdk';
import { hidekiTestnet } from '@somnia-chain/markets-sdk/chains';

const INDEXER = 'https://hideki-dev.smk.somnia.host/v1/graphql';

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const symbol = opt('market', 'BTC').toUpperCase().replace(/-PERP$/, '');
const depth = Number(opt('depth', '12'));
const jsonPath = opt('json', null);

// No privateKey / account passed: the client can only read.
const markets = new SomniaMarkets({
  chain: hidekiTestnet,
  indexerUrl: INDEXER,
  addresses: SOMNIA_HIDEKI_TESTNET_ADDRESSES,
});
const c = markets.client;

const num = (v, d) => (v == null ? null : Number(formatUnits(BigInt(v), d)));
const fmt = (x, p = 2) => (x == null ? 'n/a' : x.toLocaleString('en-US', { maximumFractionDigits: p }));
const pct = (r) => (r == null ? 'n/a' : `${(r * 100).toFixed(4)}%`);

try {
  const perps = await c.listPerpMarkets();
  console.log(`dreamDEX perps, Somnia Tokyo testnet (Hideki chain, chainId ${hidekiTestnet.id})`);
  console.log(`SDK: @somnia-chain/markets-sdk, read-only, queried ${new Date().toISOString()}`);
  console.log(`\n${perps.length} perp markets:`);
  console.log('Market        Last price      Mark price      Funding/8h   Open interest');
  for (const m of [...perps].sort((a, b) => a.baseSymbol.localeCompare(b.baseSymbol))) {
    console.log(
      `${(m.baseSymbol + '-PERP').padEnd(13)} ${fmt(num(m.lastPrice, 18), 6).padStart(14)}  ${fmt(num(m.markPrice, 18), 6).padStart(14)}  ${pct(num(m.fundingRate, 18)).padStart(10)}   ${fmt(num(m.openInterest, m.baseDecimals), 4)}`,
    );
  }

  const m = perps.find((x) => x.baseSymbol === symbol);
  if (!m) throw new Error(`No perp market for ${symbol}`);
  const qd = m.quoteDecimals, bd = m.baseDecimals;

  const state = await c.getPerpState(m.poolAddress); // contract view call
  const book = await c.getSpotOrderBook(m.poolAddress, { depth }); // perp pools share the OrderBook base

  const mark = num(state.markPrice, 18);
  const bestBid = book.bids[0] ? num(book.bids[0].price, qd) : null;
  const bestAsk = book.asks[0] ? num(book.asks[0].price, qd) : null;
  console.log(`\n${symbol}-PERP  pool ${m.poolAddress}  (block ${book.blockNumber})`);
  console.log(`  Last trade : ${fmt(num(m.lastPrice, qd), 4)}`);
  console.log(`  Mark       : ${fmt(mark, 4)} (feed ok: ${state.markPriceOk})`);
  console.log(`  Index      : ${fmt(num(state.indexPrice, 18), 4)}`);
  console.log(`  Funding    : ${pct(num(state.fundingRate, 18))} per ${state.fundingWindowSec / 3600}h window, next settle ${new Date(Number(state.nextFundingAt) * 1000).toISOString()}`);
  console.log(`  Open int.  : ${fmt(num(state.openInterest, bd), 6)} ${symbol}`);
  if (bestBid && bestAsk) console.log(`  Spread     : ${fmt(bestAsk - bestBid, 4)} (${((bestAsk - bestBid) / ((bestAsk + bestBid) / 2) * 1e4).toFixed(2)} bps)`);

  const rows = (side) => side.map((l) => {
    const price = num(l.price, qd);
    return { price, quantity: num(l.quantity, bd), distanceFromMarkPct: mark ? ((price - mark) / mark) * 100 : null };
  });
  const bids = rows(book.bids), asks = rows(book.asks);
  console.log(`\n  ${'ASKS (price / qty / vs mark)'}`);
  for (const l of [...asks].reverse()) console.log(`    ${fmt(l.price, 4).padStart(14)}  ${fmt(l.quantity, 6).padStart(12)}  ${l.distanceFromMarkPct.toFixed(3).padStart(8)}%`);
  console.log(`  ${'BIDS'}`);
  for (const l of bids) console.log(`    ${fmt(l.price, 4).padStart(14)}  ${fmt(l.quantity, 6).padStart(12)}  ${l.distanceFromMarkPct.toFixed(3).padStart(8)}%`);

  if (jsonPath) {
    writeFileSync(jsonPath, JSON.stringify({
      network: 'Somnia Tokyo testnet (Hideki)', chainId: hidekiTestnet.id,
      market: `${symbol}-PERP`, pool: m.poolAddress, blockNumber: String(book.blockNumber),
      queriedAt: new Date().toISOString(),
      markPrice: mark, indexPrice: num(state.indexPrice, 18), lastPrice: num(m.lastPrice, qd),
      fundingRate: num(state.fundingRate, 18), bids, asks,
    }, null, 2));
    console.log(`\nOrder book written to ${jsonPath}`);
  }
} catch (e) {
  console.error('Read failed:', e?.message ?? e);
  process.exitCode = 1;
} finally {
  c.stopLive?.();
  setTimeout(() => process.exit(), 100);
}
