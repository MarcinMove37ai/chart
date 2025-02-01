/**
 * @file src/app/costs/CostsView.tsx
 * @description Widok główny modułu kosztów
 */

"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const CostsView = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Moduł Kosztów</h2>
          <p>Tu będzie tabela z kosztami</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CostsView;