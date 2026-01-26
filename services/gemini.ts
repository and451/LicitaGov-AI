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

/**
 * Função para testar a saúde da API. 
 * Útil para verificar se process.env.API_KEY está configurada e funcional.
 */
export const testApiConnection = async (): Promise<{ success: boolean; message: string }> => {
  if (!process.env.API_KEY || process.env.API_KEY === 'undefined') {
    return { success: false, message: "Chave API não configurada no ambiente (process.env.API_KEY)." };
  }

  try {
    // Chamada ultra-leve apenas para validar a chave
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Ping',
      config: { maxOutputTokens: 5 }
    });
    
    if (response.text) {
      return { success: true, message: "Conexão com Gemini API estabelecida com sucesso." };
    }
    return { success: false, message: "Resposta vazia da API." };
  } catch (error: any) {
    console.error("Erro de conexão API:", error);
    if (error.message?.includes('401') || error.message?.includes('403')) {
      return { success: false, message: "Chave API Inválida ou sem permissão (401/403)." };
    }
    return { success: false, message: `Erro na API: ${error.message || 'Erro desconhecido'}` };
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.3,
      },
    });
    
    return response.text || "Não foi possível gerar uma resposta no momento.";
  } catch (error: any) {
    console.error("Error communicating with Gemini:", error);
    if (error.message?.includes('401')) return "Erro de Autenticação: Verifique se a API_KEY foi configurada corretamente no servidor.";
    return "Erro ao consultar o assistente. Verifique sua conexão ou tente novamente mais tarde.";
  }
};

export const generateDocumentDraft = async (
  formData: any
): Promise<string> => {
  const prompt = `
  Aja como um consultor jurídico especializado na Lei 14.133/2021.
  Gere uma minuta técnica de **${formData.docType}** utilizando os seguintes parâmetros:

  **IDENTIFICAÇÃO:**
  - Órgão: ${formData.orgao} (CNPJ: ${formData.cnpj})
  - Setor: ${formData.setor}
  - Objeto: ${formData.objeto}
  ${formData.justificativa ? `- Justificativa Base: ${formData.justificativa}` : ''}
  - Processo: ${formData.processo}
  ${formData.numeroEdital ? `- Edital nº: ${formData.numeroEdital}` : ''}

  **LOCALIZAÇÃO:**
  - Endereço: ${formData.endereco}, ${formData.bairro}, ${formData.cidade}-${formData.uf} (CEP: ${formData.cep})

  **PARÂMETROS DA CONTRATAÇÃO:**
  - Modalidade: ${formData.modalidade}
  - Critério de Julgamento: ${formData.criterio}
  - Registro de Preços (SRP): ${formData.isSRP ? 'Sim' : 'Não'}
  - TIC: ${formData.isTIC ? 'Sim' : 'Não'}
  - Benefício ME/EPP: ${formData.isMEEPP ? 'Sim' : 'Não'}
  - Valor Estimado: ${formData.valorEstimadoStatus === 'divulgado' ? 'R$ ' + formData.valorEstimado : 'Sigiloso'}
  - Modo de Disputa: ${formData.modoDisputa}

  **INSTRUÇÕES DE ESTRUTURA:**
  1. Se for Edital: Inclua Capa formal, Capítulos de Objeto, Participação, Julgamento, Sanções e Foro.
  2. Se for TR: Foque em Descrição do Objeto, Especificações Técnicas, Entrega e Critérios de Aceitação.
  3. Se for ETP: Foque em Descrição da Necessidade, Estimativa de Quantidades, Levantamento de Mercado e Viabilidade.
  4. Se for Pesquisa de Preços: Estruture como um relatório de orçamentos e metodologia de preço médio/mediana.
  
  Utilize linguagem jurídica formal mas moderna da Lei 14.133/2021. Use colchetes [ ] para campos que o usuário deve preencher manualmente.
  `;

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "Não foi possível gerar a minuta.";
  } catch (error: any) {
    console.error("Error generating document:", error);
    if (error.message?.includes('401')) return "Erro de Autenticação: A chave API não é válida para este modelo (Gemini 1.5 Pro).";
    return "Erro ao gerar a minuta. Tente novamente.";
  }
};