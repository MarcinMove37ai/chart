/**
 * @file src/app/profits/ProfitsView.tsx
 * @description Widok główny modułu zysków
 */

"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function ProfitsView() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Moduł Zysku</h2>
          <p>Tu będzie tabela z zyskami</p>
        </div>
      </CardContent>
    </Card>
  );
}