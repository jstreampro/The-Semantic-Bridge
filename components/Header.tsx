
import React from 'react';
import { Globe, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
        <div className="flex items-center gap-2.5">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            The Semantic <span className="text-indigo-600">Bridge</span>
          </h1>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Methodology</a>
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600">Ethics</a>
          </nav>
          <div className="h-4 w-[1px] bg-slate-200"></div>
          <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-semibold">Neutrality Mode Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
