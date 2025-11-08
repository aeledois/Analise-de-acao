export type Recommendation = 'COMPRAR' | 'VENDER' | 'MANTER';
export type Sentiment = 'POSITIVO' | 'NEGATIVO' | 'NEUTRO';

export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface SentimentAnalysis {
  sentiment: Sentiment;
  summary: string;
}

export interface AnalysisResult {
  recommendation: Recommendation;
  analysisText: string;
  historicalData: ChartDataPoint[];
  sentimentAnalysis: SentimentAnalysis;
}

export interface Ticker {
  label: string;
  value: string;
}