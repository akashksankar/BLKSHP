/**
 * BLACK S.H.E.E.P. - Light Theme Application Navigation & Telemetry Shell
 * Palette: Pure White (#FFFFFF), Deep Black (#000000), Scientific Red (#DC2626)
 * - Live System Telemetry Strip with System Clock & Status
 * - Synchronized Workspace indicator (Akash Sankar & Alfa Alias)
 * - High-contrast light theme navigation
 */

import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  FlaskConical,
  Activity,
  BookOpen,
  BarChart3,
  Clock,
  FileText,
  Settings,
  LogOut,
  RefreshCw,
  Menu,
  X,
  User,
  Search,
  Brain,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuthorizedBetaUser } from '../../types';

export type ActiveModule =
  | 'overview'
  | 'cases'
  | 'subjects'
  | 'experiments'
  | 'behavior_lab'
  | 'rag_knowledge'
  | 'analytics'
  | 'timeline'
  | 'reports'
  | 'system';

interface ShellProps {
  activeModule: ActiveModule;
  onSelectModule: (module: ActiveModule) => void;
  onOpenCommandPalette?: () => void;
  onOpenAIAssistant?: () => void;
  onOpenAlerts?: () => void;
  alertCount?: number;
  children: React.ReactNode;
}

const NAV_ITEMS: Array<{ id: ActiveModule; index: string; label: string; icon: React.ElementType }> = [
  { id: 'overview', index: '01', label: 'OVERVIEW', icon: LayoutDashboard },
  { id: 'cases', index: '02', label: 'CASES', icon: FolderKanban },
  { id: 'subjects', index: '03', label: 'SUBJECTS', icon: Users },
  { id: 'experiments', index: '04', label: 'EXPERIMENTS', icon: FlaskConical },
  { id: 'behavior_lab', index: '05', label: 'BEHAVIOR LAB', icon: Activity },
  { id: 'rag_knowledge', index: '06', label: 'RAG KNOWLEDGE', icon: BookOpen },
  { id: 'analytics', index: '07', label: 'ANALYTICS', icon: BarChart3 },
  { id: 'timeline', index: '08', label: 'TIMELINE', icon: Clock },
  { id: 'reports', index: '09', label: 'REPORTS', icon: FileText },
  { id: 'system', index: '10', label: 'SYSTEM', icon: Settings },
];

export const Shell: React.FC<ShellProps> = ({
  activeModule,
  onSelectModule,
  onOpenCommandPalette,
  onOpenAIAssistant,
  onOpenAlerts,
  alertCount = 3,
  children,
}) => {
  const { user, jwt, logout, switchUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, '0');
      const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${day} ${month} ${year} · ${hours}:${minutes}:${seconds}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSwitchResearcher = () => {
    const next: AuthorizedBetaUser = user?.name === 'Akash Sankar' ? 'Alfa Alias' : 'Akash Sankar';
    switchUser(next);
  };

  return (
    <div className="min-h-screen bg-transparent text-black flex flex-col selection:bg-[#DC2626] selection:text-white relative z-10">
      {/* Top Telemetry Status Ribbon */}
      <div className="w-full bg-white/95 border-b border-black/10 text-zinc-600 px-4 md:px-6 py-1.5 flex items-center justify-between text-[11px] font-mono-data select-none backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-black font-bold tracking-wider">SYSTEM: ONLINE</span>
          </div>
          <span className="text-zinc-300">|</span>
          <div className="flex items-center gap-1 shrink-0 text-[#DC2626] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626]" />
            <span>GRID: FLOWING (60Hz)</span>
          </div>
          <span className="text-zinc-300 hidden sm:inline">|</span>
          <div className="hidden sm:flex items-center gap-1 shrink-0 text-emerald-700 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>SHARED WORKSPACE: SYNCED</span>
          </div>
          <span className="text-zinc-300 hidden md:inline">|</span>
          <span className="hidden md:inline text-zinc-700">SUBJECT: A S REMIN KRISHNA (HX-001)</span>
          <span className="text-zinc-300 hidden lg:inline">|</span>
          <span className="hidden lg:inline text-zinc-500">RAG KNOWLEDGE: MOUNTED</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Live System Clock */}
          <div className="hidden sm:flex items-center gap-1.5 text-zinc-600">
            <Clock className="w-3 h-3 text-[#DC2626]" />
            <span className="tracking-wide text-[10px] text-black font-bold">{currentTime}</span>
          </div>
          <span className="text-zinc-300 hidden sm:inline">|</span>
          <span className="text-[#DC2626] font-bold text-[10px] bg-red-50 px-2 py-0.5 rounded-xs border border-red-200">
            CLEARANCE: LEVEL-5
          </span>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-black/15 px-4 md:px-6 py-2.5 flex items-center justify-between shadow-xs">
        {/* Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectModule('overview')}
            className="flex items-center gap-2.5 text-left focus:outline-none cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xs bg-black border border-[#DC2626] flex items-center justify-center font-display text-lg font-bold text-white shadow-xs group-hover:scale-105 transition-transform">
              BS
            </div>
            <div>
              <span className="font-display text-2xl tracking-widest text-black group-hover:text-[#DC2626] transition-colors leading-none block">
                BLACK S.H.E.E.P.
              </span>
              <span className="text-[9px] font-mono-data tracking-widest text-[#DC2626] uppercase block font-bold">
                HUMAN BEHAVIORAL WORKSTATION
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectModule(item.id)}
                className={`relative px-2.5 py-1.5 rounded-xs text-xs font-mono-data tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'text-black font-bold bg-red-50 border border-[#DC2626] shadow-xs'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100 border border-transparent'
                }`}
              >
                {/* Active Red Indicator */}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#DC2626]" />
                )}
                <span className={`text-[10px] ${isActive ? 'text-[#DC2626] font-bold' : 'text-zinc-400'}`}>
                  {item.index}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Global Controls & Researcher Badge */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            title="Open Classified Command Palette (Ctrl+K)"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-black/15 hover:border-[#DC2626] text-black rounded-xs text-xs font-mono-data cursor-pointer transition-colors shadow-xs"
          >
            <Search className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden sm:inline font-bold">FIND</span>
            <kbd className="hidden sm:inline text-[9px] bg-zinc-100 border border-zinc-300 px-1 rounded text-zinc-600 font-bold">
              ⌘K
            </kbd>
          </button>

          {/* AI Intel Assistant Trigger */}
          <button
            onClick={onOpenAIAssistant}
            title="Open AI Intel Assistant"
            className="flex items-center gap-1.5 px-2.5 py-1 bg-red-50 hover:bg-red-100 border border-red-200 text-[#DC2626] hover:text-[#B91C1C] rounded-xs text-xs font-mono-data cursor-pointer transition-colors shadow-xs font-bold"
          >
            <Brain className="w-3.5 h-3.5 text-[#DC2626]" />
            <span className="hidden md:inline">AI INTEL</span>
          </button>

          {/* Alert Center Trigger */}
          <button
            onClick={onOpenAlerts}
            title="View Active Telemetry Alerts"
            className="relative p-1.5 rounded-xs bg-white border border-black/15 hover:border-[#DC2626] text-black cursor-pointer transition-colors"
          >
            <Bell className="w-4 h-4 text-[#DC2626]" />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#DC2626] text-white rounded-full text-[8px] font-bold flex items-center justify-center font-mono-data">
                {alertCount}
              </span>
            )}
          </button>

          {/* Active Researcher Profile Pill */}
          <div className="flex items-center gap-2 bg-white border border-black/20 rounded-xs px-2.5 py-1 shadow-xs font-mono-data">
            <User className="w-3.5 h-3.5 text-[#DC2626]" />
            <div className="text-left hidden sm:block">
              <div className="flex items-center gap-1.5">
                <p className="text-xs font-bold text-black leading-tight">
                  {user?.name}
                </p>
                <span
                  title={`JWT HS256 Verified (sub: ${jwt?.sub || user?.id})`}
                  className="text-[9px] bg-red-50 text-[#DC2626] px-1 py-0.2 rounded-xs font-bold border border-red-200"
                >
                  JWT
                </span>
              </div>
              <p className="text-[10px] text-[#DC2626] leading-tight font-semibold">
                {user?.role} (Shared Workspace)
              </p>
            </div>
            {/* Quick Switcher between Akash Sankar & Alfa Alias */}
            <button
              onClick={handleSwitchResearcher}
              title={`Switch terminal view to ${user?.name === 'Akash Sankar' ? 'Alfa Alias' : 'Akash Sankar'}`}
              className="p-1 hover:bg-zinc-100 rounded text-zinc-500 hover:text-[#DC2626] transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={() => logout()}
            title="Terminate Research Session"
            className="p-1.5 rounded-xs border border-zinc-200 hover:border-[#DC2626] hover:bg-red-50 text-zinc-500 hover:text-[#DC2626] transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 rounded-xs border border-zinc-300 text-black hover:bg-zinc-100 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Sub-navigation bar for laptop/tablet viewports */}
      <div className="hidden md:flex xl:hidden w-full bg-white border-b border-black/10 px-4 py-1.5 overflow-x-auto gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectModule(item.id)}
              className={`px-2.5 py-1 rounded-xs text-xs font-mono-data whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? 'bg-[#DC2626] text-white font-bold'
                  : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
              }`}
            >
              <span className="text-[10px] text-zinc-400">{item.index}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b-2 border-[#DC2626] p-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectModule(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-xs text-xs font-mono-data flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-[#DC2626] text-white font-bold'
                    : 'text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-4 h-4 text-[#DC2626]" />
                <span>{item.index}.</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Workspace Stage */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-6 lg:p-8 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-white/95 border-t border-black/10 px-6 py-3 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-data text-zinc-600 relative z-10 backdrop-blur-md">
        <div>
          <span className="text-black font-bold">BLACK S.H.E.E.P. PROTOCOL</span>
          <span className="mx-2">·</span>
          <span>BETA v0.1</span>
          <span className="mx-2">·</span>
          <span>SHARED WORKSPACE: AKASH SANKAR &amp; ALFA ALIAS</span>
        </div>
        <div className="mt-2 sm:mt-0 text-zinc-500">
          OPERATING IN MUTUAL COMPANION RESEARCH WORKSTATION MODE
        </div>
      </footer>
    </div>
  );
};
