
import React from 'react';
import { ReExpression } from '../types';
import { Copy, RefreshCw, Quote, Info, Check } from 'lucide-react';

interface Props {
  reExpression: ReExpression;
  original: string;
}

const ReExpressionPanel: React.FC<Props> = ({ reExpression, original }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reExpression.message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-indigo-600 rounded-2xl shadow-xl overflow-hidden text-white">
      <div className="px-6 py-4 bg-indigo-700 flex justify-between items-center">
        <h3 className="font-semibold flex items-center gap-2">
          <RefreshCw className="w-5 h-5" />
          Bridged Intent
        </h3>
        <button 
          onClick={handleCopy}
          className="p-1.5 hover:bg-indigo-600 rounded-lg transition-colors flex items-center gap-2 text-xs font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="p-8">
        <div className="relative">
          <Quote className="absolute -top-4 -left-4 w-10 h-10 text-indigo-400 opacity-30" />
          <p className="text-xl md:text-2xl font-medium leading-relaxed italic relative z-10">
            {reExpression.message}
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-indigo-500/50">
          <div className="flex items-start gap-3 bg-indigo-700/50 p-4 rounded-xl">
            <Info className="w-5 h-5 shrink-0 text-indigo-300 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200">Bridge Logic / Cultural Note</span>
              <p className="text-sm text-indigo-50 leading-relaxed">
                {reExpression.culturalNote}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-[10px] uppercase font-bold text-indigo-300 tracking-wider mb-3 block">Alternative Nuances</label>
          <div className="space-y-2">
            {reExpression.alternatives.map((alt, i) => (
              <div key={i} className="text-xs py-2 px-3 bg-indigo-800/40 rounded-lg border border-indigo-400/20 hover:bg-indigo-800/60 transition-colors cursor-default">
                {alt}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-8 py-4 bg-indigo-900/30 text-[10px] text-indigo-300 flex justify-between border-t border-indigo-500/20">
        <span>STRIPPED: Cultural Provocation, Hyperbole</span>
        <span>PRESERVED: Strategic Intent, Core Facts</span>
      </div>
    </div>
  );
};

export default ReExpressionPanel;
