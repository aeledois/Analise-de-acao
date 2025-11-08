import React from 'react';
import { Ticker } from '../types';

interface TickerSelectorProps {
  tickers: Ticker[];
  selectedTicker: string;
  onTickerChange: (ticker: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

const TickerSelector: React.FC<TickerSelectorProps> = ({
  tickers,
  selectedTicker,
  onTickerChange,
  onAnalyze,
  isAnalyzing,
}) => {
  const isDisabled = isAnalyzing;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-full sm:w-2/3">
        <select
          value={selectedTicker}
          onChange={(e) => onTickerChange(e.target.value)}
          disabled={isDisabled}
          className="w-full pl-4 pr-10 py-3 bg-dark-bg border border-dark-border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-blue transition duration-200 appearance-none text-dark-text disabled:opacity-50 disabled:cursor-wait"
          aria-label="Selecione uma ação"
        >
          {tickers.map((stock) => (
            <option key={stock.value} value={stock.value}>
              {stock.label}
            </option>
          ))}
        </select>
         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
      <button
        onClick={onAnalyze}
        disabled={isDisabled}
        className="w-full sm:w-1/3 py-3 px-6 bg-brand-blue text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-card focus:ring-brand-blue transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isAnalyzing ? 'Analisando...' : 'Analisar'}
      </button>
    </div>
  );
};

export default TickerSelector;