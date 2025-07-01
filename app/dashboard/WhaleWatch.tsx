'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
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
    const interval = setInterval(fetchWhaleTrades, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

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
        </CardHeader>
        <CardContent>
          {loading ? (
            <LoadingSkeleton />
          ) : trades.length === 0 ? (
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
                {trades.map((trade) => (
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
