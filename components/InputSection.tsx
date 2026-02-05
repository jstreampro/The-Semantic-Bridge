
import React from 'react';
import { ConflictDomain } from '../types';
import { Mic, Video, Type } from 'lucide-react';

interface InputSectionProps {
  input: string;
  setInput: (v: string) => void;
  domain: ConflictDomain;
  setDomain: (d: ConflictDomain) => void;
  disabled: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ input, setInput, domain, setDomain, disabled }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Conflict Domain</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.values(ConflictDomain).map((d) => (
            <button
              key={d}
              onClick={() => setDomain(d)}
              className={`text-xs py-2 px-3 rounded-lg border transition-all text-left
                ${domain === d 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-semibold' 
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-white hover:border-slate-300'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={disabled}
          placeholder="Paste text, a speech transcript, or describe the conflict message..."
          className="w-full h-40 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-slate-800 placeholder:text-slate-400 resize-none"
        />
        <div className="absolute bottom-3 right-3 flex gap-2">
          <button 
            title="Speech to Text (Simulated)"
            className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
          >
            <Mic className="w-4 h-4" />
          </button>
          <button 
             title="YouTube Link (Simulated)"
             className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
          >
            <Video className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 text-[10px] text-slate-400">
        <Type className="w-3 h-3" />
        <span>Supports multi-lingual input. Gemini detects source automatically.</span>
      </div>
    </div>
  );
};

export default InputSection;
