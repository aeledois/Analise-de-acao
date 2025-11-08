export type Recommendation = 'COMPRAR' | 'VENDER' | 'MANTER';

export interface ChartDataPoint {
  date: string;
  price: number;
}

export interface AnalysisResult {
  recommendation: Recommendation;
  analysisText: string;
  historicalData: ChartDataPoint[];
}

export interface Ticker {
  label: string;
  value: string;
}
