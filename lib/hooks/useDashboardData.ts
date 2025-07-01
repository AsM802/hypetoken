'use client';

import { useState, useEffect } from 'react';

interface LiveData {
  price: number;
  alerts: any[];
  whales: any[];
  volume: any[];
  orderBook: any[];
  technical: {};
  metrics: { whaleCount?: number };
  marketAnalysis: {};
}

interface UseDashboardDataResult {
  liveData: LiveData;
  priceHistory: { timestamp: string; price: number }[];
  error: string;
  isConnected: boolean;
  lastUpdate: Date | null;
}

export function useDashboardData(): UseDashboardDataResult {
  const [liveData, setLiveData] = useState<LiveData>({
    price: 0,
    alerts: [],
    whales: [],
    volume: [],
    orderBook: [],
    technical: {},
    metrics: { whaleCount: 0 },
    marketAnalysis: {}
  });
  const [priceHistory, setPriceHistory] = useState<{ timestamp: string; price: number }[]>([]);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await fetch('/api/auth/trades/lives');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setLiveData(data);
        setIsConnected(true);
        setLastUpdate(new Date());
      } catch (err: any) {
        setError(err.message);
        setIsConnected(false);
      }
    };

    const fetchPriceHistory = async () => {
      try {
        const response = await fetch('/api/auth/trades/lives?type=price-history');
        if (!response.ok) throw new Error('Failed to fetch price history');
        const data = await response.json();
        setPriceHistory(data.map((p: any) => ({
          timestamp: new Date(p.timestamp).toLocaleTimeString(),
          price: p.price
        })));
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchLiveData();
    fetchPriceHistory();

    const interval = setInterval(() => {
      fetchLiveData();
      fetchPriceHistory();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { liveData, priceHistory, error, isConnected, lastUpdate };
}
