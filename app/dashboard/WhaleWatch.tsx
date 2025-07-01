'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IWhaleTrade } from '@/lib/models/WhaleTrade';

function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function WhaleWatch() {
  const [trades, setTrades] = useState<IWhaleTrade[]>([]);
  const [loading, setLoading] = useState(true);
  const [assetFilter, setAssetFilter] = useState('');
  const [sortBy, setSortBy] = useState<'tradeValueUSD' | 'tradeType' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    async function fetchWhaleTrades() {
      try {
        const res = await fetch('/api/whales');
        const data = await res.json();
        setTrades(data);
      } catch (error) {
        console.error('Failed to fetch whale trades:', error);
      }
      setLoading(false);
    }

    fetchWhaleTrades();

    // WebSocket connection for real-time updates
    const ws = new WebSocket(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3000');

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'new_whale_trade') {
        setTrades(prevTrades => [message.payload, ...prevTrades].slice(0, 50)); // Keep only the latest 50 trades
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    const interval = setInterval(fetchWhaleTrades, 30000); // Refresh every 30 seconds

    return () => {
      clearInterval(interval);
      ws.close();
    };
  }, []);

  const filteredAndSortedTrades = useMemo(() => {
    let filtered = trades;

    // Apply asset filter
    if (assetFilter) {
      filtered = filtered.filter(trade =>
        trade.topAssets.some(asset =>
          asset.assetName.toLowerCase().includes(assetFilter.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'tradeValueUSD') {
          return sortOrder === 'asc' ? a.tradeValueUSD - b.tradeValueUSD : b.tradeValueUSD - a.tradeValueUSD;
        } else if (sortBy === 'tradeType') {
          const typeA = a.tradeType.toLowerCase();
          const typeB = b.tradeType.toLowerCase();
          if (typeA < typeB) return sortOrder === 'asc' ? -1 : 1;
          if (typeA > typeB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
        return 0;
      });
    }

    return filtered;
  }, [trades, assetFilter, sortBy, sortOrder]);

  const handleSort = (criteria: 'tradeValueUSD' | 'tradeType') => {
    if (sortBy === criteria) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortOrder('desc'); // Default to descending for new sort criteria
    }
  };

  const LoadingSkeleton = () => (
    <div className="space-y-3">
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2"></div>
    </div>
  );

  return (
    <div>
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm text-white">
        <CardHeader>
          <CardTitle className="text-white">🐋 Whale Watch</CardTitle>
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Input
              type="text"
              placeholder="Filter by asset..."
              value={assetFilter}
              onChange={(e) => setAssetFilter(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder-gray-400"
            />
            <Button
              onClick={() => handleSort('tradeValueUSD')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Sort by Value {sortBy === 'tradeValueUSD' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </Button>
            <Button
              onClick={() => handleSort('tradeType')}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Sort by Type {sortBy === 'tradeType' ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSkeleton />
          ) : filteredAndSortedTrades.length === 0 ? (
            <div className="text-center text-gray-400">No whale trades to display.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Wallet</TableHead>
                  <TableHead className="text-white">Trade</TableHead>
                  <TableHead className="text-white">Value</TableHead>
                  <TableHead className="text-white">Top Assets</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedTrades.map((trade) => (
                  <TableRow key={trade.transactionHash} className="hover:bg-white/10 transition-colors">
                    <TableCell className="font-mono text-sm">{formatAddress(trade.walletAddress)}</TableCell>
                    <TableCell>
                      <Badge variant={trade.tradeType === 'buy' ? 'default' : 'destructive'}>
                        {trade.tradeType.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(trade.tradeValueUSD)}</TableCell>
                    <TableCell className="flex gap-2">
                      {trade.topAssets.map(asset => (
                        <Badge key={asset.assetName} variant="secondary">
                          {asset.assetName}
                        </Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
