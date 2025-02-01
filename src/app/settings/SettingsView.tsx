/**
 * @file src/app/settings/SettingsView.tsx
 * @description Widok główny modułu ustawień
 */

"use client"

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SettingsView = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Ustawienia Systemu</h2>
          <p>Tu będą ustawienia systemu</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsView;
