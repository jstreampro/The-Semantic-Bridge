
import React from 'react';
import { AnalysisLayer } from '../types';
import { Shield, Brain, Zap, Heart, Search } from 'lucide-react';

interface Props {
  analysis: AnalysisLayer;
}

const AnalysisPanel: React.FC<Props> = ({ analysis }) => {
  const confidenceColor = analysis.confidence > 0.8 ? 'text-emerald-600' : 'text-amber-600';
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2">
          <Search className="w-5 h-5 text-indigo-600" />
          Semantic Deconstruction
        </h3>
        <div className={`text-xs font-mono font-bold ${confidenceColor}`}>
          Confidence: {Math.round(analysis.confidence * 100)}%
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnalysisItem 
          icon={<Brain className="w-4 h-4" />} 
          label="Linguistic Literal" 
          value={analysis.literal} 
        />
        <AnalysisItem 
          icon={<Heart className="w-4 h-4" />} 
          label="Emotional Undercurrent" 
          value={analysis.emotionalState} 
        />
        <AnalysisItem 
          icon={<Zap className="w-4 h-4" />} 
          label="Power Signaling" 
          value={analysis.powerSignaling} 
        />
        <AnalysisItem 
          icon={<Shield className="w-4 h-4" />} 
          label="Core Intent Inference" 
          value={analysis.inferredIntent} 
          highlight
        />

        <div className="md:col-span-2">
          <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2 block">Cultural Markers Detected</label>
          <div className="flex flex-wrap gap-2">
            {analysis.culturalMarkers.map((m, i) => (
              <span key={i} className="px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded-md border border-indigo-100 font-medium">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AnalysisItem: React.FC<{ icon: React.ReactNode, label: string, value: string, highlight?: boolean }> = ({ icon, label, value, highlight }) => (
  <div className={`p-4 rounded-xl border ${highlight ? 'bg-amber-50 border-amber-100' : 'bg-slate-50 border-slate-100'}`}>
    <div className="flex items-center gap-2 mb-2 text-slate-500">
      {icon}
      <span className="text-[10px] uppercase font-bold tracking-wider">{label}</span>
    </div>
    <p className={`text-sm leading-relaxed ${highlight ? 'text-amber-900 font-medium italic' : 'text-slate-700'}`}>
      "{value}"
    </p>
  </div>
);

export default AnalysisPanel;
