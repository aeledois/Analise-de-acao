
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    recommendation: {
      type: Type.STRING,
      description: "A recomendação de investimento. Deve ser estritamente 'COMPRAR', 'VENDER' ou 'MANTER'.",
      enum: ['COMPRAR', 'VENDER', 'MANTER'],
    },
    analysisText: {
      type: Type.STRING,
      description: "Uma análise detalhada em texto, em português, justificando a recomendação. Deve ter pelo menos 2 parágrafos."
    },
    historicalData: {
      type: Type.ARRAY,
      description: "Uma lista de dados de preços históricos de fechamento para os últimos 90 dias.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { 
            type: Type.STRING, 
            description: "A data no formato YYYY-MM-DD" 
          },
          price: { 
            type: Type.NUMBER, 
            description: "O preço de fechamento da ação nesse dia." 
          }
        },
        required: ['date', 'price']
      }
    }
  },
  required: ['recommendation', 'analysisText', 'historicalData']
};

export const getStockAnalysis = async (ticker: string): Promise<AnalysisResult> => {
  const prompt = `
    Por favor, atue como um analista financeiro sênior.
    Para o ticker de ação dos EUA '${ticker}', forneça uma análise detalhada.
    Sua resposta deve ser um objeto JSON.
    A análise deve incluir:
    1. Uma recomendação clara ('COMPRAR', 'VENDER' ou 'MANTER').
    2. Um parágrafo de análise fundamentalista e técnica explicando o porquê da recomendação.
    3. Dados históricos de preços de fechamento para os últimos 90 dias, com um ponto de dados para cada dia.
    
    O objeto JSON deve seguir estritamente o esquema fornecido. Não inclua nenhuma formatação markdown como \`\`\`json no início ou \`\`\` no final.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonText = response.text.trim();
    const result: AnalysisResult = JSON.parse(jsonText);
    
    // Validate the result structure again on the client side for robustness
    if (!result.recommendation || !result.analysisText || !Array.isArray(result.historicalData)) {
        throw new Error("Resposta da IA está malformada.");
    }

    // Sort data just in case it comes out of order
    result.historicalData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return result;

  } catch (error) {
    console.error(`Erro ao analisar o ticker ${ticker}:`, error);
    throw new Error(`Não foi possível gerar a análise para ${ticker}. A API pode estar indisponível ou a resposta foi inválida.`);
  }
};
