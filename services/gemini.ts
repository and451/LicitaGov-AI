import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é um especialista sênior em licitações públicas brasileiras e contratos administrativos.
Sua base de conhecimento prioritária é a Lei nº 14.133/2021 (Nova Lei de Licitações), a Constituição Federal de 1988 e a jurisprudência do Tribunal de Contas da União (TCU).

Ao responder a consultas, você DEVE seguir estritamente este formato estruturado:

1. **Fundamentação Legal:** Cite o artigo específico da lei, parágrafo ou o acórdão relevante.
2. **Documentos Necessários:** Liste em tópicos (bullets) os documentos, modelos ou declarações indispensáveis para o caso.
3. **Passos Operacionais:** Enumere de 3 a 5 ações práticas e sequenciais que o comprador público deve tomar.

Regras de Segurança:
- Se a informação não for clara na legislação, responda: "Esta situação específica requer análise jurídica detalhada da procuradoria do órgão."
- Mantenha tom formal, técnico e direto.
- Não invente leis ou artigos.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3, // Low temperature for more factual/legal accuracy
      },
    });
    
    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error) {
    console.error("Error communicating with Gemini:", error);
    return "Erro ao consultar o assistente. Verifique sua conexão ou tente novamente mais tarde.";
  }
};

export const generateDocumentDraft = async (
  docType: string,
  object: string,
  justification: string,
  quantity: string
): Promise<string> => {
  const prompt = `
  Aja como um assistente administrativo experiente.
  Gere uma **minuta simplificada** de um ${docType} para a seguinte demanda:
  
  - Objeto: ${object}
  - Quantidade/Estimativa: ${quantity}
  - Justificativa da Necessidade: ${justification}
  
  A minuta deve conter campos entre colchetes [COMO ESTE] para preenchimento posterior onde faltarem dados.
  Use linguagem formal adequada à administração pública.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a minuta.";
  } catch (error) {
    console.error("Error generating document:", error);
    return "Erro ao gerar a minuta. Tente novamente.";
  }
};