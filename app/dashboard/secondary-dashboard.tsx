'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import PriceDisplayCard from '@/components/PriceDisplayCard';
import WhaleCountCard from '@/components/WhaleCountCard';
import PriceHistoryChartCard from '@/components/PriceHistoryChartCard';
import { useDashboardData } from '@/lib/hooks/useDashboardData';

export default function SecondaryDashboardPage() {
  const { liveData, priceHistory, error, isConnected, lastUpdate } = useDashboardData();

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-slate-900 to-slate-800">
      <Card className="w-full max-w-4xl bg-white/10 border border-white/10 backdrop-blur-xl text-white">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <Alert className="bg-red-500/10 border-red-500/20 text-red-300">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-2 gap-4">
            <PriceDisplayCard price={liveData.price} />
            <WhaleCountCard whaleCount={liveData.metrics?.whaleCount || 0} />
          </div>

          <PriceHistoryChartCard priceHistory={priceHistory} />

          <div className="text-sm text-gray-300 text-center">
            {isConnected ? `Last updated at ${lastUpdate?.toLocaleTimeString()}` : 'Disconnected from server'}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}