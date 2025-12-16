# 🎉 LicitaGov AI v1.0.0 - Lançamento Inicial

**Data de Lançamento**: 16 de dezembro de 2025

## 📖 Sobre o Projeto

O **LicitaGov AI** é um assistente inteligente desenvolvido para auxiliar compradores públicos e agentes de contratação em processos licitatórios brasileiros, com foco na Lei 14.133/2021 (Nova Lei de Licitações e Contratos).

## ✨ Principais Funcionalidades

### 💬 Assistente de Chat Inteligente
- Respostas especializadas sobre licitações públicas
- Fundamentação legal automática (Lei 14.133/2021, CF/88, TCU)
- Formato estruturado: Fundamentação Legal + Documentos + Passos Operacionais
- Powered by Google Gemini AI

### 📄 Gerador de Minutas
Crie rascunhos profissionais de documentos essenciais:
- ✅ Termo de Referência (TR)
- ✅ Estudo Técnico Preliminar (ETP)
- ✅ Edital de Pregão Eletrônico
- ✅ Minuta de Contrato

Com exportação em TXT e função copiar para área de transferência.

### 📚 Base de Conhecimento
Acesso organizado a:
- **Legislação Federal**: Lei 14.133/2021, CF/88, INs
- **Jurisprudência TCU**: Súmulas e Acórdãos relevantes
- **Modelos AGU**: Templates oficiais padronizados

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript 5.8 + Vite 6
- **IA**: Google Gemini 2.5 Flash
- **UI**: Tailwind CSS + Lucide Icons
- **Deploy**: GitHub Actions + GKE (Google Kubernetes Engine)

## 🚀 Como Começar

### Instalação Local

```bash
# 1. Clone o repositório
git clone https://github.com/and451/LicitaGov-AI.git
cd LicitaGov-AI

# 2. Instale dependências
npm install

# 3. Configure sua API Key
echo "GEMINI_API_KEY=sua_chave_aqui" > .env.local

# 4. Execute o projeto
npm run dev
```

### Acesso Online
👉 **[Acesse o LicitaGov AI no Google AI Studio](https://ai.studio/apps/drive/1ybVBUvkcSnNl4lF8vmXRoZPSUprqTrp6)**

## 📋 Casos de Uso

1. **"Como comprar 50 notebooks pelo Pregão Eletrônico?"**
   - Receba orientação passo a passo com base legal

2. **"Gere um Termo de Referência para aquisição de material de escritório"**
   - Obtenha uma minuta profissional em segundos

3. **"Qual documentação é necessária para um Pregão?"**
   - Liste completa com fundamento na Lei 14.133/2021

4. **"Consulte modelos oficiais da AGU"**
   - Acesse templates padronizados rapidamente

## 🎯 Público-Alvo

- 👔 Compradores Públicos
- 📊 Agentes de Contratação
- 🏛️ Servidores de Setores de Licitação
- 🎓 Estudantes de Administração Pública
- 💼 Consultores em Licitações

## ⚠️ Observações Importantes

- ✅ Respostas baseadas em legislação oficial vigente
- ✅ Ambiente seguro e isolado para processamento
- ✅ Temperatura IA reduzida (0.3) para maior precisão legal
- ⚠️ Para casos complexos, consulte a procuradoria jurídica do órgão
- ⚠️ Requer chave de API do Google Gemini para uso local

## 📊 Estatísticas da Release

- **17 arquivos** adicionados
- **1.004 linhas** de código
- **3 componentes** principais React
- **4 tipos** de documentos suportados
- **3 categorias** na base de conhecimento
- **100%** em TypeScript

## 🔄 Deploy e CI/CD

- ✅ GitHub Actions configurado
- ✅ Workflow de build e deploy para GKE
- ✅ Publicação automática no Google Container Registry
- ✅ Pipeline de NPM packages

## 🐛 Problemas Conhecidos

Nenhum problema crítico identificado nesta versão inicial.

## 🔮 Roadmap Futuro

- [ ] Autenticação de usuários
- [ ] Histórico persistente de conversas
- [ ] Upload de documentos customizados
- [ ] Exportação em PDF e DOCX
- [ ] Integração com COMPRASNET
- [ ] API REST para integrações
- [ ] Modo offline
- [ ] Dashboard administrativo

## 👤 Autor

**Anderson Malta da Silva**
- GitHub: [@and451](https://github.com/and451)
- Email: 252103074@aluno.unb.br

## 📄 Licença

Projeto privado - MVP para demonstração e uso governamental.

---

## 🙏 Agradecimentos

Este projeto foi desenvolvido como um MVP (Produto Mínimo Viável) para auxiliar a administração pública brasileira na complexa tarefa de realizar licitações em conformidade com a Lei 14.133/2021.

**Feedbacks, sugestões e contribuições são muito bem-vindos!**

---

### 📞 Suporte

Para dúvidas, sugestões ou reportar problemas:
- 🐛 [Abra uma issue no GitHub](https://github.com/and451/LicitaGov-AI/issues)
- 📧 Entre em contato: 252103074@aluno.unb.br

---

**⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

---

*Desenvolvido com ❤️ para modernizar e facilitar as licitações públicas no Brasil*
