"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Types
interface Alert {
  type: string;
  data: any;
  severity?: string;
}

interface Whale {
  address: string;
  name?: string;
  hypeBalance: number;
  portfolioValue?: number;
}

interface Technical {
  rsi: number;
  macd: { macd: number };
  ema: { short: number; long: number };
  bollinger: any;
}

interface LiveDataType {
  price: number;
  timestamp: number;
  alerts: Alert[];
  technical: Technical;
  whales: Whale[];
  volume: any[];
  orderBook: any[];
  metrics: {
    totalAlerts: number;
    accurateSignals: number;
    falsePositives: number;
    uptime: number;
    lastUpdate: number;
  };
  marketAnalysis: {
    trend: string;
    volatility: string;
    signals: any[];
    score: number;
  };
}

export default function LiveData() {
  const [data, setData] = useState<LiveDataType | null>(null);
  const [twap, setTwap] = useState<number | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const res = await fetch("/api/trades/lives", { cache: "no-store" });
        if (!res.ok) return;
        const json = await res.json();
        setData(json);

        // Calculate TWAP
        if (json.volume?.length > 0) {
          let total = 0;
          let totalVolume = 0;
          json.volume.forEach((v: any) => {
            const o = parseFloat(v.o);
            const c = parseFloat(v.c);
            const h = parseFloat(v.h);
            const l = parseFloat(v.l);
            const avgPrice = (o + c + h + l) / 4;
            const volume = parseFloat(v.v);
            total += avgPrice * volume;
            totalVolume += volume;
          });
          setTwap(total / totalVolume);
        }
      } catch (err) {
        console.error("Live data fetch error:", err);
      }
    };

    fetchLiveData();
    const interval = setInterval(fetchLiveData, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <div className="p-4 text-white">Loading live data...</div>;

  const formatTime = (timestamp: number) => new Date(timestamp).toLocaleTimeString();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <Card className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 text-white">
        <CardHeader>
          <CardTitle>📊 Live HYPE Data</CardTitle>
        </CardHeader>
        <CardContent>
          <p><strong>Price:</strong> ${data.price.toFixed(4)}</p>
          <p><strong>TWAP:</strong> {twap ? `${twap.toFixed(4)}` : "Calculating..."}</p>
          <p><strong>Last Update:</strong> {formatTime(data.timestamp)}</p>
          <p><strong>Alerts:</strong> {data.alerts.length}</p>
          <p><strong>Score:</strong> {data.marketAnalysis?.score}</p>
        </CardContent>
      </Card>

      <Card className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 text-white">
        <CardHeader>
          <CardTitle>📈 Technical Indicators</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside">
            <li><strong>RSI:</strong> {data.technical?.rsi?.toFixed(2)}</li>
            <li><strong>MACD:</strong> {data.technical?.macd?.macd?.toFixed(4)}</li>
            <li><strong>EMA Short:</strong> {data.technical?.ema?.short?.toFixed(4)}</li>
            <li><strong>EMA Long:</strong> {data.technical?.ema?.long?.toFixed(4)}</li>
          </ul>
        </CardContent>
      </Card>

      {data.alerts.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 text-white">
          <CardHeader>
            <CardTitle>🚨 Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {data.alerts.map((alert, idx) => (
                <li key={idx}>
                  <strong>{alert.type}</strong>
                  {alert?.data?.v && ` — ${parseFloat(alert.data.v).toLocaleString()} HYPE`}
                  {alert?.data?.value && ` (${parseFloat(alert.data.value).toLocaleString()})`}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {data.whales.length > 0 && (
        <Card className="bg-white/5 backdrop-blur-md rounded-lg shadow-md border border-white/10 text-white">
          <CardHeader>
            <CardTitle>🐋 Active Whale Wallets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside">
              {data.whales.map((whale, idx) => (
                <li key={idx}>
                  <strong>{whale.name || whale.address}</strong>: {whale.hypeBalance.toLocaleString()} HYPE
                  {whale.portfolioValue && ` (${whale.portfolioValue.toLocaleString()})`}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="mt-6 text-sm col-span-full">
        🔔 <a href="https://t.me/your_bot_link" target="_blank" className="text-blue-400 underline">Join Telegram Alerts</a>
      </div>
    </div>
  );
}
