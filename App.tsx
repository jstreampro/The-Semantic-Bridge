
import React, { useState, useCallback, useRef } from 'react';
import { ConflictDomain, BridgeResult, UserAdjustments } from './types';
import { processBridge } from './services/geminiService';
import Header from './components/Header';
import InputSection from './components/InputSection';
import AnalysisPanel from './components/AnalysisPanel';
import ReExpressionPanel from './components/ReExpressionPanel';
import { Loader2, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [domain, setDomain] = useState<ConflictDomain>(ConflictDomain.INTERNATIONAL);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BridgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adjustments, setAdjustments] = useState<UserAdjustments>({
    intensity: 30,
    formality: 70,
    directness: 50
  });

  const handleProcess = useCallback(async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await processBridge(input, domain, adjustments);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError('Failed to process. The system might be under high load or the input was too ambiguous.');
    } finally {
      setLoading(false);
    }
  }, [input, domain, adjustments]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input and Controls */}
          <div className="lg:col-span-5 space-y-6">
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-indigo-600" />
                Input Source
              </h2>
              <InputSection 
                input={input} 
                setInput={setInput} 
                domain={domain} 
                setDomain={setDomain}
                disabled={loading}
              />
              
              <div className="mt-6 space-y-4">
                <label className="block text-sm font-medium text-slate-700">Refinement Sliders</label>
                <div className="space-y-3">
                  <Slider 
                    label="Emotional Intensity" 
                    value={adjustments.intensity} 
                    onChange={(v) => setAdjustments(prev => ({ ...prev, intensity: v }))} 
                  />
                  <Slider 
                    label="Target Formality" 
                    value={adjustments.formality} 
                    onChange={(v) => setAdjustments(prev => ({ ...prev, formality: v }))} 
                  />
                  <Slider 
                    label="Target Directness" 
                    value={adjustments.directness} 
                    onChange={(v) => setAdjustments(prev => ({ ...prev, directness: v }))} 
                  />
                </div>
              </div>

              <button
                onClick={handleProcess}
                disabled={loading || !input.trim()}
                className={`mt-8 w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2
                  ${loading 
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Bridging Context...
                  </>
                ) : (
                  <>
                    Analyze & Bridge
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </section>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Right Column: Output and Analysis */}
          <div className="lg:col-span-7 space-y-6">
            {!result && !loading && (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <ArrowRight className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-600">Waiting for analysis</h3>
                <p className="text-slate-400 max-w-xs mx-auto mt-2">
                  Input a message or transcript on the left to begin the semantic bridging process.
                </p>
              </div>
            )}

            {loading && (
              <div className="animate-pulse space-y-6">
                <div className="h-48 bg-white rounded-2xl border border-slate-200" />
                <div className="h-64 bg-white rounded-2xl border border-slate-200" />
              </div>
            )}

            {result && !loading && (
              <div className="space-y-6">
                <AnalysisPanel analysis={result.analysis} />
                <ReExpressionPanel reExpression={result.reExpression} original={result.original} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-slate-200 text-center text-slate-400 text-sm">
        Built for global de-escalation and semantic clarity. Use with ethical discretion.
      </footer>
    </div>
  );
};

const Slider: React.FC<{ label: string, value: number, onChange: (v: number) => void }> = ({ label, value, onChange }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs text-slate-500 mb-1">
      <span>{label}</span>
      <span className="font-mono">{value}%</span>
    </div>
    <input 
      type="range" 
      min="0" 
      max="100" 
      value={value} 
      onChange={(e) => onChange(parseInt(e.target.value))}
      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
    />
  </div>
);

export default App;
