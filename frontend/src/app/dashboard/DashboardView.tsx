"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Calendar,
  Clock,
  CalendarDays,
  ChevronDown,
  ChevronUp,
  Building2,
  User
} from 'lucide-react';

// Interfejs opisujący strukturę danych czasowych (dzienny, tygodniowy, miesięczny)
interface TimeData {
  netSales: number;    // sprzedaż netto
  profit: number;      // zysk
  paidSales: number;   // sprzedaż opłacona
  phSales: number;     // sprzedaż przedstawicieli handlowych
}

// Interfejs dla komponentu ExtendedTimeRow
interface ExtendedTimeRowProps {
  icon: React.ElementType;  // typ ikony
  label: string;           // etykieta (np. "Dziś", "Tydzień")
  data: TimeData;          // dane do wyświetlenia
}

interface TimeRowProps {
  icon: React.ElementType;
  label: string;
  data: {
    netSales: number;
    paidSales: number;
  };
}

interface HistoricalRowProps {
  data: {
    month: string;
    netSales: number;
    paidSales: number;
  };
}

interface ExtendedHistoricalRowProps {
  data: TimeData & {
    month: string;
  };
}

interface BranchCardProps {
  branch: {
    id: number;
    name: string;
    isRepresentative?: boolean;
  };
  index: number;
  expandedIndices: boolean[];
  setExpandedIndices: React.Dispatch<React.SetStateAction<boolean[]>>;
}

const initialBranchData = {
  total: {
    netSales: 5000000,
    profit: 1000000,
    paidSales: 4000000,
    phSales: 2500000
  },
  daily: {
    netSales: 50000,
    profit: 10000,
    paidSales: 40000,
    phSales: 25000
  },
  weekly: {
    netSales: 200000,
    profit: 40000,
    paidSales: 160000,
    phSales: 100000
  },
  monthly: {
    netSales: 800000,
    profit: 160000,
    paidSales: 640000,
    phSales: 400000
  },
  historical: [
    { month: 'Luty 2024', netSales: 800000, profit: 160000, paidSales: 640000, phSales: 400000 },
    { month: 'Styczeń 2024', netSales: 750000, profit: 150000, paidSales: 600000, phSales: 375000 },
    { month: 'Grudzień 2023', netSales: 700000, profit: 140000, paidSales: 560000, phSales: 350000 }
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0
  }).format(value);
};

const branches = [
  { id: -1, name: 'Przedstawiciele', isRepresentative: true },
  { id: 1, name: 'Rzgów' },
  { id: 4, name: 'Malbork' },
  { id: 2, name: 'Pcim' },
  { id: 5, name: 'Lublin' },
  { id: 3, name: 'Łomża' },
  { id: 6, name: 'Myślibórz' }
];

interface TimeRowProps {
  icon: React.ElementType;  // Typ dla komponentu ikony
  label: string;
  data: {
    netSales: number;
    paidSales: number;
  };
}

const TimeRow: React.FC<TimeRowProps> = ({ icon: Icon, label, data }) => (
  <div className="grid grid-cols-3 gap-2">
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4 text-gray-500" />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-gray-900">{formatCurrency(data.netSales)}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-green-600">{formatCurrency(data.paidSales)}</span>
    </div>
  </div>
);

const ExtendedTimeRow: React.FC<ExtendedTimeRowProps> = ({ icon: Icon, label, data }) => (
  <div className="grid grid-cols-[1fr_repeat(2,minmax(0,1fr))] md:grid-cols-[1fr_repeat(3,minmax(0,1fr))] lg:grid-cols-[1fr_repeat(4,minmax(0,1fr))] gap-2">
    <div className="flex items-center gap-1">
      <Icon className="h-4 w-4 text-gray-500" />
      <span className="text-xs text-gray-600">{label}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-gray-900">{formatCurrency(data.netSales)}</span>
    </div>
    <div className="hidden md:block text-right">
      <span className="text-xs font-medium text-blue-600">{formatCurrency(data.profit)}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-green-600">{formatCurrency(data.paidSales)}</span>
    </div>
    <div className="hidden lg:block text-right">
      <span className="text-xs font-medium text-purple-600">{formatCurrency(data.phSales)}</span>
    </div>
  </div>
);

const HistoricalRow: React.FC<HistoricalRowProps> = ({ data }) => (
  <div className="grid grid-cols-3 gap-2 py-2 border-b border-gray-200 last:border-0">
    <div className="flex items-center gap-1">
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-xs text-gray-600">{data.month}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-gray-900">{formatCurrency(data.netSales)}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-green-600">{formatCurrency(data.paidSales)}</span>
    </div>
  </div>
);

const ExtendedHistoricalRow: React.FC<ExtendedHistoricalRowProps> = ({ data }) => (
  <div className="grid grid-cols-[1fr_repeat(2,minmax(0,1fr))] md:grid-cols-[1fr_repeat(3,minmax(0,1fr))] lg:grid-cols-[1fr_repeat(4,minmax(0,1fr))] gap-2 py-2 border-b border-gray-200 last:border-0">
    <div className="flex items-center gap-1">
      <Calendar className="h-4 w-4 text-gray-500" />
      <span className="text-xs text-gray-600">{data.month}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-gray-900">{formatCurrency(data.netSales)}</span>
    </div>
    <div className="hidden md:block text-right">
      <span className="text-xs font-medium text-blue-600">{formatCurrency(data.profit)}</span>
    </div>
    <div className="text-right">
      <span className="text-xs font-medium text-green-600">{formatCurrency(data.paidSales)}</span>
    </div>
    <div className="hidden lg:block text-right">
      <span className="text-xs font-medium text-purple-600">{formatCurrency(data.phSales)}</span>
    </div>
  </div>
);

const BranchCard: React.FC<BranchCardProps> = ({ branch, index, expandedIndices, setExpandedIndices }) => {
  const isRepresentative = branch.isRepresentative;
  const [branchData, setBranchData] = useState(initialBranchData);
  const [contentHeight, setContentHeight] = useState(0);
  const historicalRef = useRef<HTMLDivElement>(null);
  const isExpanded = expandedIndices[index] === true;

  useEffect(() => {
    setBranchData({
      total: {
        netSales: Math.random() * 5000000,
        paidSales: Math.random() * 4000000
      },
      daily: {
        netSales: Math.random() * 50000,
        paidSales: Math.random() * 40000
      },
      weekly: {
        netSales: Math.random() * 200000,
        paidSales: Math.random() * 160000
      },
      monthly: {
        netSales: Math.random() * 800000,
        paidSales: Math.random() * 640000
      },
      historical: [
        { month: 'Luty 2024', netSales: Math.random() * 800000, paidSales: Math.random() * 640000 },
        { month: 'Styczeń 2024', netSales: Math.random() * 800000, paidSales: Math.random() * 640000 },
        { month: 'Grudzień 2023', netSales: Math.random() * 800000, paidSales: Math.random() * 640000 }
      ]
    });
  }, [branch.id]);

  useEffect(() => {
    if (historicalRef.current) {
      setContentHeight(historicalRef.current.scrollHeight);
    }
  }, [isExpanded]);

  const handleExpand = () => {
    setExpandedIndices(prev => {
      const newIndices = [...prev];
      newIndices[index] = !newIndices[index];
      return newIndices;
    });
  };

  return (
      <Card className={`w-full ${isRepresentative ? 'bg-purple-50' : ''}`}>
        <CardContent className="p-3">
          <div className="pb-4">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="flex items-end">
                <div className={`rounded-lg px-3 py-2 ${isRepresentative ? 'bg-white' : 'bg-gray-50'}`}>
                  {isRepresentative ? (
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-purple-600" />
                      <h3 className="text-lg font-semibold text-gray-800">
                        <span className="2xl:hidden">PH</span>
                        <span className="hidden 2xl:inline">PH</span>
                      </h3>
                    </div>
                  ) : (
                    <h3 className="text-lg font-semibold text-gray-800">{branch.name}</h3>
                  )}
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Sprzedaż</span>
                <p className="text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(branchData.total.netSales)}
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Zapłacone</span>
                <p className="text-sm font-bold text-green-600 text-right">
                  {formatCurrency(branchData.total.paidSales)}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-200 mb-2"></div>
          </div>

          <div className="space-y-3">
            <TimeRow icon={Clock} label="Dziś" data={branchData.daily} />
            <TimeRow icon={Calendar} label="Tydzień" data={branchData.weekly} />
            <TimeRow icon={CalendarDays} label="Miesiąc" data={branchData.monthly} />
          </div>

          {branchData.historical.length > 0 && (
            <>
              <button
                onClick={handleExpand}
                className="w-full flex items-center justify-center py-2 text-xs text-gray-500 hover:text-gray-700"
              >
                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Rozwijana sekcja inline – animacja max-height */}
              <div
                style={{ maxHeight: isExpanded ? contentHeight : 0 }}
                className="overflow-hidden transition-all duration-300 ease-in-out"
              >
                <div ref={historicalRef} className={`p-3 border-t ${isRepresentative ? 'border-purple-100' : 'border-gray-100'}`}>
                  {branchData.historical.map((monthData, idx) => (
                    <HistoricalRow key={idx} data={monthData} />
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
  );
};

const SummaryCard = () => {
  const [contentHeight, setContentHeight] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const historicalRef = useRef<HTMLDivElement>(null);
  const [totalData, setTotalData] = useState({
    total: {
      netSales: branches.length * initialBranchData.total.netSales,
      profit: branches.length * initialBranchData.total.profit,
      paidSales: branches.length * initialBranchData.total.paidSales,
      phSales: branches.length * initialBranchData.total.phSales
    },
    daily: {
      netSales: branches.length * initialBranchData.daily.netSales,
      profit: branches.length * initialBranchData.daily.profit,
      paidSales: branches.length * initialBranchData.daily.paidSales,
      phSales: branches.length * initialBranchData.daily.phSales
    },
    weekly: {
      netSales: branches.length * initialBranchData.weekly.netSales,
      profit: branches.length * initialBranchData.weekly.profit,
      paidSales: branches.length * initialBranchData.weekly.paidSales,
      phSales: branches.length * initialBranchData.weekly.phSales
    },
    monthly: {
      netSales: branches.length * initialBranchData.monthly.netSales,
      profit: branches.length * initialBranchData.monthly.profit,
      paidSales: branches.length * initialBranchData.monthly.paidSales,
      phSales: branches.length * initialBranchData.monthly.phSales
    },
    historical: initialBranchData.historical.map(month => ({
      ...month,
      netSales: month.netSales * branches.length,
      profit: month.profit * branches.length,
      paidSales: month.paidSales * branches.length,
      phSales: month.phSales * branches.length
    }))
  });

  useEffect(() => {
    if (historicalRef.current) {
      setContentHeight(historicalRef.current.scrollHeight);
    }
  }, [isExpanded]);

  useEffect(() => {
    const newTotalData = {
      total: {
        netSales: branches.flat().length * Math.random() * 5000000,
        profit: branches.flat().length * Math.random() * 1000000,
        paidSales: branches.flat().length * Math.random() * 4000000,
        phSales: branches.flat().length * Math.random() * 2500000
      },
      daily: {
        netSales: branches.flat().length * Math.random() * 50000,
        profit: branches.flat().length * Math.random() * 10000,
        paidSales: branches.flat().length * Math.random() * 40000,
        phSales: branches.flat().length * Math.random() * 25000
      },
      weekly: {
        netSales: branches.flat().length * Math.random() * 200000,
        profit: branches.flat().length * Math.random() * 40000,
        paidSales: branches.flat().length * Math.random() * 160000,
        phSales: branches.flat().length * Math.random() * 100000
      },
      monthly: {
        netSales: branches.flat().length * Math.random() * 800000,
        profit: branches.flat().length * Math.random() * 160000,
        paidSales: branches.flat().length * Math.random() * 640000,
        phSales: branches.flat().length * Math.random() * 400000
      },
      historical: [
        {
          month: 'Luty 2024',
          netSales: Math.random() * 800000 * branches.flat().length,
          profit: Math.random() * 160000 * branches.flat().length,
          paidSales: Math.random() * 640000 * branches.flat().length,
          phSales: Math.random() * 400000 * branches.flat().length
        },
        {
          month: 'Styczeń 2024',
          netSales: Math.random() * 800000 * branches.flat().length,
          profit: Math.random() * 160000 * branches.flat().length,
          paidSales: Math.random() * 640000 * branches.flat().length,
          phSales: Math.random() * 400000 * branches.flat().length
        },
        {
          month: 'Grudzień 2023',
          netSales: Math.random() * 800000 * branches.flat().length,
          profit: Math.random() * 160000 * branches.flat().length,
          paidSales: Math.random() * 640000 * branches.flat().length,
          phSales: Math.random() * 400000 * branches.flat().length
        }
      ]
    };
    setTotalData(newTotalData);
  }, []);

  return (
    <div className="mb-6">
      <Card className="w-full bg-blue-50">
        <CardContent className="p-3">
          <div className="pb-4">
            <div className="grid grid-cols-[1fr_repeat(2,minmax(0,1fr))] md:grid-cols-[1fr_repeat(3,minmax(0,1fr))] lg:grid-cols-[1fr_repeat(4,minmax(0,1fr))] gap-2 mb-4">
              <div className="flex items-end">
                <div className="bg-white rounded-lg px-3 py-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-800">
                      <span className="2xl:hidden">Suma</span>
                      <span className="hidden 2xl:inline">Suma</span>
                    </h3>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Sprzedaż</span>
                <p className="text-sm font-bold text-gray-900 text-right">
                  {formatCurrency(totalData.total.netSales)}
                </p>
              </div>
              <div className="hidden md:flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Zysk</span>
                <p className="text-sm font-bold text-blue-600 text-right">
                  {formatCurrency(totalData.total.profit)}
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Zapłacone</span>
                <p className="text-sm font-bold text-green-600 text-right">
                  {formatCurrency(totalData.total.paidSales)}
                </p>
              </div>
              <div className="hidden lg:flex flex-col justify-end">
                <span className="text-xs text-gray-500 text-right">Sprzedaż PH</span>
                <p className="text-sm font-bold text-purple-600 text-right">
                  {formatCurrency(totalData.total.phSales)}
                </p>
              </div>
            </div>
            <div className="border-b border-gray-200 mb-2"></div>
          </div>

          <div className="space-y-3">
            <ExtendedTimeRow icon={Clock} label="Dziś" data={totalData.daily} />
            <ExtendedTimeRow icon={Calendar} label="Tydzień" data={totalData.weekly} />
            <ExtendedTimeRow icon={CalendarDays} label="Miesiąc" data={totalData.monthly} />
          </div>

          <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-center py-2 text-xs text-gray-500 hover:text-gray-700"
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Kontener z animacją rozwijania */}
            <div
              style={{ maxHeight: isExpanded ? contentHeight : 0 }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
            >
              {/* Wewnętrzny kontener zawierający linię podziału – border-t */}
              <div ref={historicalRef} className="p-3 border-t border-gray-200">
                {totalData.historical.map((monthData, idx) => (
                  <ExtendedHistoricalRow key={idx} data={monthData} />
                ))}
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DashboardView = () => {
  // Utrzymujemy stan rozwinięć dla kart oddziałów
  const [expandedIndices, setExpandedIndices] = useState(new Array(branches.length).fill(false));

  return (
    // Układ grid umożliwia kontrolę szerokości poszczególnych bloków.
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {/* Blok Suma – przy rozdzielczościach od sm zajmuje 2 kolumny */}
      <div className="sm:col-span-2 lg:col-span-2 xl:col-span-2">
        <SummaryCard />
      </div>
      {branches.map((branch, index) => (
        <div key={branch.id} className="mb-4">
          <BranchCard
            branch={branch}
            index={index}
            expandedIndices={expandedIndices}
            setExpandedIndices={setExpandedIndices}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardView;
