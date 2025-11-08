import React, { useState, useCallback } from 'react';
import { AnalysisResult, Ticker } from './types';
import { getStockAnalysis } from './services/geminiService';
import TickerSelector from './components/TickerSelector';
import AnalysisDisplay from './components/AnalysisDisplay';
import { LogoIcon, LoadingSpinner } from './components/icons';
import { SP500_TICKERS } from './data/tickers';

const App: React.FC = () => {
  const [tickers] = useState<Ticker[]>(SP500_TICKERS);
  
  const findDefaultTicker = () => {
    if (tickers.length > 0) {
      // Define um valor padrão, ex: Apple (AAPL) se disponível
      const defaultTicker = tickers.find(t => t.value === 'AAPL') || tickers[0];
      return defaultTicker.value;
    }
    return '';
  };

  const [selectedTicker, setSelectedTicker] = useState<string>(findDefaultTicker());
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = useCallback(async () => {
    if (!selectedTicker) {
      setError("Por favor, selecione um ticker.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await getStockAnalysis(selectedTicker);
      setAnalysis(result);
    } catch (err) {
      setError("Falha ao obter a análise. Verifique o console para mais detalhes.");
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  }, [selectedTicker]);

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="flex items-center justify-center mb-8">
          <LogoIcon className="h-10 w-10 text-brand-blue" />
          <h1 className="text-3xl sm:text-4xl font-bold ml-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            Analisador de Ações com IA
          </h1>
        </header>

        <main>
          <div className="bg-dark-card rounded-xl shadow-2xl p-6 border border-dark-border">
            <p className="text-center text-dark-text-secondary mb-6">
              Selecione uma ação da lista S&P 500 para obter uma análise completa e recomendação gerada por IA.
            </p>
            <TickerSelector
              tickers={tickers}
              selectedTicker={selectedTicker}
              onTickerChange={setSelectedTicker}
              onAnalyze={handleAnalysis}
              isAnalyzing={isAnalyzing}
            />
          </div>

          {isAnalyzing && (
            <div className="flex flex-col items-center justify-center mt-12">
              <LoadingSpinner className="h-12 w-12 text-brand-blue" />
              <p className="mt-4 text-lg text-dark-text-secondary animate-pulse">
                Analisando {selectedTicker}... Isso pode levar um momento.
              </p>
            </div>
          )}

          {error && !isAnalyzing && (
            <div className="mt-8 text-center bg-red-900/50 text-red-300 p-4 rounded-lg border border-red-700">
              <h3 className="font-bold">Ocorreu um Erro</h3>
              <p>{error}</p>
            </div>
          )}
          
          {analysis && !isAnalyzing && (
            <AnalysisDisplay analysis={analysis} ticker={selectedTicker} />
          )}

        </main>
         <footer className="text-center mt-12 text-sm text-dark-text-secondary">
          <p>
            Esta análise é gerada por IA e não deve ser considerada como conselho financeiro.
          </p>
          <p>
             Faça sua própria pesquisa antes de tomar qualquer decisão de investimento.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default App;