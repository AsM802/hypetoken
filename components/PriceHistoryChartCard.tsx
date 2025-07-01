'use client';

import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface PriceHistoryChartCardProps {
  priceHistory: { timestamp: string; price: number }[];
}

export default function PriceHistoryChartCard({ priceHistory }: PriceHistoryChartCardProps) {
  return (
    <Card className="bg-white/10 p-4 rounded-md">
      <CardContent className="p-0">
        <p className="text-lg font-semibold mb-2">Price History</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="price" stroke="#38bdf8" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
