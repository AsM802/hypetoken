'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';

interface WhaleCountCardProps {
  whaleCount: number;
}

export default function WhaleCountCard({ whaleCount }: WhaleCountCardProps) {
  return (
    <Card className="bg-white/10 p-4 rounded-md">
      <CardContent className="p-0">
        <div className="flex items-center space-x-2">
          <Users className="h-6 w-6 text-purple-400" />
          <p className="text-sm">Active Whales</p>
        </div>
        <p className="text-xl font-bold mt-1">{whaleCount || 0}</p>
      </CardContent>
    </Card>
  );
}
