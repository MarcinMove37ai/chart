"use client"

import Image from 'next/image';
import React, { useState, ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, ClipboardList, PiggyBank, TrendingUp, Map, Settings, User, Menu, X } from 'lucide-react';

const userRole = 'BOARD';
const userName = 'Irek Matusiak';
const userRoleDisplay = {
  'BOARD': 'Zarząd',
  'BRANCH': 'Oddział',
  'REPRESENTATIVE': 'Przedstawiciel'
} as const;

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [hoveredSidebar, setHoveredSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    {
      icon: <BarChart3 size={24} />,
      label: 'Strona główna',
      path: '/dashboard',
      roles: ['BOARD', 'BRANCH', 'REPRESENTATIVE']
    },
    {
      icon: <ClipboardList size={24} />,
      label: 'Sprzedaż',
      path: '/sales',
      roles: ['BOARD', 'BRANCH', 'REPRESENTATIVE']
    },
    {
      icon: <PiggyBank size={24} />,
      label: 'Koszty',
      path: '/costs',
      roles: ['BOARD', 'BRANCH', 'REPRESENTATIVE']
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Zyski',
      path: '/profits',
      roles: ['BOARD', 'BRANCH']
    },
    {
      icon: <Map size={24} />,
      label: 'Mapa klientów',
      path: '/map',
      roles: ['BOARD', 'BRANCH', 'REPRESENTATIVE']
    },
    {
      icon: <Settings size={24} />,
      label: 'Ustawienia',
      path: '/settings',
      roles: ['BOARD']
    }
  ].filter(item => item.roles.includes(userRole));

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div
        className={`fixed left-0 z-50 top-[calc(4rem)] h-[calc(90vh)]
          ${isMobile
            ? `${isMobileMenuOpen
                ? 'translate-x-0 w-64 bg-white/60 backdrop-blur-lg backdrop-saturate-150 shadow-xl rounded-r-3xl'
                : '-translate-x-full'}`
            : `bg-white shadow-lg rounded-r-2xl ${hoveredSidebar ? 'w-64' : 'w-20'}`
          }
          transition-all duration-300 ease-in-out
          overflow-hidden whitespace-nowrap`}
        onMouseEnter={() => !isMobile && setHoveredSidebar(true)}
        onMouseLeave={() => !isMobile && setHoveredSidebar(false)}
      >
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`
                    group relative flex items-center h-11 px-3
                    rounded-lg transition-colors
                    ${pathname === item.path ? 'bg-blue-100' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => isMobile && setIsMobileMenuOpen(false)}
                >
                  <div className={`
                    flex-shrink-0 w-6 text-center
                    ${pathname === item.path ? 'text-red-600' : 'text-gray-600'}
                  `}>
                    {item.icon}
                  </div>
                  <div className={`
                    absolute left-12
                    transition-all duration-300
                    ${(hoveredSidebar || isMobileMenuOpen) ? 'opacity-100' : 'opacity-0'}
                  `}>
                    <span className={pathname === item.path ? 'text-gray-700' : 'text-gray-700'}>
                      {item.label}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out
          ${isMobile ? 'ml-0' : !isMobile && hoveredSidebar ? 'ml-64' : 'ml-20'}
          flex-1 overflow-auto mt-16`}
      >
        <header className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 flex items-center px-6">
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          )}
          <Image
              src="/logo.png"
              alt="CRM MatPoz"
              width={200}  // Zwiększ rozmiar zgodnie z oryginalnym logo
              height={48}  // Zachowaj proporcje
              priority  // To zapewni szybsze ładowanie logo
              className="h-12 w-auto mr-4"
          />

          <h2 className="text-xl font-semibold text-gray-1 flex-1" />

          <div className="flex items-center gap-2 text-gray-600">
            <User className="h-5 w-5" />
            <span className="text-sm">{userName}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {userRoleDisplay[userRole]}
            </span>
          </div>
        </header>

        <main className="pt-2 px-6 pb-6">
            <div className="flex items-center mb-2">
              <div className="bg-white px-4 py-1 rounded-lg shadow-sm">
                <h2 className="text-md font-semibold text-gray-500">
                  {menuItems.find(item => item.path === pathname)?.label || 'Dashboard'}
                </h2>
              </div>
            </div>

          <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100vh-160px)]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;