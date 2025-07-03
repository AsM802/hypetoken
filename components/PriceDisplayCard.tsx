'use client';

import { Card, CardContent } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

interface PriceDisplayCardProps {
  price: number;
}

export default function PriceDisplayCard({ price }: PriceDisplayCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  return (
    <Card className="bg-white/10 p-4 rounded-md">
      <CardContent className="p-0">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-6 w-6 text-green-400" />
          <p className="text-sm">Current Price</p>
        </div>
        <p className="text-xl font-bold mt-1">{formatCurrency(price)}</p>
      </CardContent>
    </Card>
  );
}
