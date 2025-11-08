

import React from 'react';
import { AnalysisResult, Recommendation, SentimentAnalysis } from '../types';
import StockChart from './StockChart';
import { BuyIcon, SellIcon, HoldIcon, PositiveSentimentIcon, NegativeSentimentIcon, NeutralSentimentIcon } from './icons';

interface AnalysisDisplayProps {
  analysis: AnalysisResult;
  ticker: string;
}

const RecommendationCard: React.FC<{ recommendation: Recommendation }> = ({ recommendation }) => {
  const styles = {
    COMPRAR: {
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      icon: <BuyIcon className="h-8 w-8" />,
    },
    VENDER: {
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      icon: <SellIcon className="h-8 w-8" />,
    },
    MANTER: {
      bgColor: 'bg-gray-500/10',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/30',
      icon: <HoldIcon className="h-8 w-8" />,
    },
  };

  const currentStyle = styles[recommendation];

  return (
    <div className={`p-6 rounded-lg border ${currentStyle.bgColor} ${currentStyle.borderColor} ${currentStyle.textColor} flex flex-col items-center justify-center text-center`}>
      {currentStyle.icon}
      <span className="text-sm font-semibold uppercase tracking-wider mt-2">Recomendação</span>
      <p className="text-3xl font-bold mt-1">{recommendation}</p>
    </div>
  );
};

const SentimentCard: React.FC<{ sentimentAnalysis: SentimentAnalysis }> = ({ sentimentAnalysis }) => {
  const styles = {
    POSITIVO: {
      bgColor: 'bg-green-500/10',
      textColor: 'text-green-400',
      borderColor: 'border-green-500/30',
      icon: <PositiveSentimentIcon className="h-8 w-8" />,
    },
    NEGATIVO: {
      bgColor: 'bg-red-500/10',
      textColor: 'text-red-400',
      borderColor: 'border-red-500/30',
      icon: <NegativeSentimentIcon className="h-8 w-8" />,
    },
    NEUTRO: {
      bgColor: 'bg-gray-500/10',
      textColor: 'text-gray-400',
      borderColor: 'border-gray-500/30',
      icon: <NeutralSentimentIcon className="h-8 w-8" />,
    },
  };

  const currentStyle = styles[sentimentAnalysis.sentiment];

  return (
    <div className={`p-6 rounded-lg border ${currentStyle.bgColor} ${currentStyle.borderColor} ${currentStyle.textColor} flex flex-col items-start text-left h-full`}>
      <div className="flex items-center gap-3">
        {currentStyle.icon}
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider">Sentimento</span>
          <p className="text-2xl font-bold">{sentimentAnalysis.sentiment}</p>
        </div>
      </div>
      <p className="text-sm text-dark-text-secondary mt-4">
        {sentimentAnalysis.summary}
      </p>
    </div>
  );
};

const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysis, ticker }) => {
  return (
    <div className="mt-8 animate-fade-in space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-8">
          <RecommendationCard recommendation={analysis.recommendation} />
          <SentimentCard sentimentAnalysis={analysis.sentimentAnalysis} />
        </div>
        <div className="md:col-span-2 bg-dark-card p-6 rounded-lg border border-dark-border shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-dark-text">Análise para {ticker}</h2>
          <p className="text-dark-text-secondary leading-relaxed whitespace-pre-wrap">
            {analysis.analysisText}
          </p>
        </div>
      </div>
      
      <div className="bg-dark-card p-4 sm:p-6 rounded-lg border border-dark-border shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-dark-text">Desempenho Histórico (Últimos 90 dias)</h3>
        <div className="h-80 w-full">
          <StockChart data={analysis.historicalData} />
        </div>
      </div>
    </div>
  );
};

export default AnalysisDisplay;