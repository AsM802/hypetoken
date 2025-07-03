'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function DashboardPage() {
  const [fakeTrades, setFakeTrades] = useState([
    { type: 'buy', price: 1.53, amount: 24000, time: '12:03:14' },
    { type: 'sell', price: 1.49, amount: 14000, time: '12:02:48' },
    { type: 'buy', price: 1.57, amount: 34000, time: '12:02:12' },
  ]);

  useEffect(() => {
    // Simulate new trades every 10s
    const interval = setInterval(() => {
      const rand = Math.random() > 0.5 ? 'buy' : 'sell';
      const newTrade = {
        type: rand,
        price: +(1.5 + Math.random() * 0.1).toFixed(3),
        amount: Math.floor(Math.random() * 30000 + 10000),
        time: new Date().toLocaleTimeString(),
      };
      setFakeTrades(prev => [newTrade, ...prev.slice(0, 4)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">📈 HYPE Token Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="card text-center">
          <p className="text-sm text-gray-500">Last Trade Price</p>
          <p className="text-2xl font-bold text-blue-600">${fakeTrades[0].price}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-500">TWAP Buy Pressure</p>
          <p className="text-2xl font-bold text-green-600">↑ 67%</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-gray-500">TWAP Sell Pressure</p>
          <p className="text-2xl font-bold text-red-600">↓ 33%</p>
        </div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="p-3">Type</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Price</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {fakeTrades.map((trade, idx) => (
              <tr
                key={idx}
                className={`trade-row ${trade.type === 'buy' ? 'trade-buy' : 'trade-sell'}`}
              >
                <td className="p-3 flex items-center space-x-2">
                  {trade.type === 'buy' ? (
                    <ArrowUpRight className="text-green-600 h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="text-red-600 h-4 w-4" />
                  )}
                  <span className="capitalize">{trade.type}</span>
                </td>
                <td className="p-3">{trade.amount}</td>
                <td className="p-3">${trade.price}</td>
                <td className="p-3">{trade.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
