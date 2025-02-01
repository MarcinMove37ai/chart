/**
 * @file src/app/map/MapView.tsx
 * @description Widok główny modułu mapy klientów
 */

"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MapView = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Mapa Klientów</h2>
          <p>Tu będzie mapa z lokalizacjami klientów</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapView;