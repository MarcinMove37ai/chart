/**
 * @file src/app/sales/SalesView.tsx
 * @description Widok główny modułu sprzedaży
 */

"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SalesView = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Moduł Sprzedaży</h2>
          <p>Tu będzie tabela z danymi sprzedaży</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesView;