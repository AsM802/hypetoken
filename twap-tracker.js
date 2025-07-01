// twap-tracker.js (Run with: node twap-tracker.js)
const fs = require('fs');
const WebSocket = require('ws');

const HYPE_SYMBOL = 'HYPE';
const DATA_FILE = './twap-data.json';
const MAX_WINDOW_MS = 15 * 60 * 1000; // 15 min TWAP window

let trades = []; // { px, sz, time }

function calculateTWAP(trades) {
  let weightedSum = 0;
  let totalVolume = 0;

  for (const trade of trades) {
    const price = parseFloat(trade.px);
    const size = parseFloat(trade.sz);
    weightedSum += price * size;
    totalVolume += size;
  }

  return totalVolume > 0 ? weightedSum / totalVolume : 0;
}

function saveData(twap, lastPrice) {
  const data = {
    twap: twap,
    markPrice: lastPrice,
    timestamp: Date.now()
  };
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function pruneOldTrades() {
  const cutoff = Date.now() - MAX_WINDOW_MS;
  trades = trades.filter(t => t.time >= cutoff);
}

function startTracking() {
  const ws = new WebSocket('wss://api.hyperliquid.xyz/ws');

  ws.on('open', () => {
    console.log('📡 Subscribed to HYPE trades for TWAP');
    ws.send(
      JSON.stringify({
        type: 'subscribe',
        channels: [{ name: 'trades', symbols: [HYPE_SYMBOL] }]
      })
    );
  });

  ws.on('message', msg => {
    try {
      const data = JSON.parse(msg);
      const trade = data?.trades?.[0];

      if (trade?.px && trade?.sz) {
        trades.push({
          px: trade.px,
          sz: trade.sz,
          time: Date.now()
        });

        pruneOldTrades();
        const twap = calculateTWAP(trades);
        saveData(twap, parseFloat(trade.px));
        console.log(`✅ TWAP updated: ${twap.toFixed(6)} | Last: ${trade.px}`);
      }
    } catch (err) {
      console.error('❌ Error processing trade message:', err.message);
    }
  });

  ws.on('error', err => {
    console.error('❌ WebSocket error:', err.message);
  });

  ws.on('close', () => {
    console.warn('⚠️ WebSocket closed. Reconnecting in 3s...');
    setTimeout(startTracking, 3000);
  });
}

startTracking();
