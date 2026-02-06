
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Você é o LicitaGov AI, um Agente Especialista em Licitações Públicas (Lei 14.133/2021) e Contratos Administrativos.
Sua arquitetura é baseada em Agentic AI: você deve planejar, raciocinar e citar fontes antes de responder.

ESTRUTURA OBRIGATÓRIA DE RESPOSTA:
Sempre inicie sua resposta com um bloco de pensamento oculto separado por "|||THOUGHT|||" e termine com "|||RESPONSE|||".

Formato:
|||THOUGHT|||
1. **Análise da Demanda:** O que o usuário realmente quer?
2. **Fundamentação Legal (GraphRAG Simulado):** Quais artigos da Lei 14.133/21, INs ou Acórdãos do TCU se conectam a isso?
3. **Verificação de Riscos:** Há pegadinhas ou vedações legais?
4. **Plano de Resposta:** Definir a melhor abordagem.
|||RESPONSE|||
[Sua resposta final ao usuário aqui, formatada em Markdown, com citações explícitas aos artigos analisados]

Regras de Segurança:
- Se a informação não for clara na legislação, responda: "Esta situação específica requer análise jurídica detalhada da procuradoria do órgão."
- Use tom formal, técnico, mas acessível ao comprador público.
- Priorize a Lei 14.133/2021 sobre a Lei 8.666/1993 (revogada).
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
  Aja como um Agente Redator Jurídico especializado na Lei 14.133/2021.
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

  **PRAZOS E DETALHES DE EXECUÇÃO:**
  - Vigência: ${formData.vigencia ? formData.vigencia + ' ' + formData.unidadeVigencia : 'A definir'}
  - Prazo de Entrega/Execução: ${formData.prazoEntrega ? formData.prazoEntrega + ' dias' : 'Conforme cronograma'}
  - Garantia Contratual: ${formData.temGarantia ? 'Sim, 5% do valor do contrato' : 'Não exigida'}
  - Matriz de Riscos: ${formData.temMatrizRiscos ? 'Incluir cláusula/anexo de Matriz de Riscos' : 'Não aplicável'}

  **INSTRUÇÕES DE ESTRUTURA E AGENTE:**
  1. Atue com rigor técnico (citando artigos da Lei 14.133).
  2. Estruture o documento com cláusulas claras.
  3. Se for TR/ETP, inclua seções de sustentabilidade e análise de riscos.
  4. Utilize os dados de vigência e garantia para criar as respectivas cláusulas.
  
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
