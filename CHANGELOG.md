# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2025-12-16

### 🎉 Lançamento Inicial

Primeira versão do **LicitaGov AI** - Assistente inteligente para sustentação normativa e operacional em licitações públicas brasileiras, focado na Lei 14.133/2021.

### ✨ Funcionalidades Principais

#### 💬 Interface de Chat Inteligente
- Assistente conversacional especializado em licitações públicas
- Respostas estruturadas baseadas em fundamentação legal
- Citação automática de artigos da Lei nº 14.133/2021
- Integração com Google Gemini AI (modelo gemini-2.5-flash)
- Histórico de conversas persistente durante a sessão
- Interface responsiva com suporte a markdown
- Função de limpar conversa

#### 📄 Gerador de Minutas
- Geração automática de documentos para licitações
- Tipos de documentos suportados:
  - Termo de Referência (TR)
  - Estudo Técnico Preliminar (ETP)
  - Edital de Pregão Eletrônico
  - Minuta de Contrato
- Formulário guiado em etapas para coleta de informações
- Campos personalizáveis: objeto, quantidade, justificativa
- Exportação em formato texto (.txt)
- Função de copiar para área de transferência
- Visualização com formatação markdown

#### 📚 Base de Conhecimento
- Catálogo organizado de documentos de referência
- Três categorias principais:
  - **Legislação Federal**: Lei nº 14.133/2021, Constituição Federal, IN SEGES/ME nº 65/2021
  - **Jurisprudência TCU**: Súmulas, Acórdãos 2023-2024, Boletins
  - **Modelos AGU**: Termos de Referência, Editais, Minutas de Contratos
- Interface visual para gerenciamento de documentos
- Indicação de ambiente seguro e isolado

#### 🎨 Interface do Usuário
- Design moderno e profissional com Tailwind CSS
- Layout responsivo para desktop e mobile
- Navegação por abas entre funcionalidades
- Ícones intuitivos com Lucide React
- Paleta de cores institucional (azul e cinza)
- Feedback visual para ações do usuário
- Estados de carregamento animados

### 🔧 Tecnologias Implementadas

#### Frontend
- **React 19.2.3** - Biblioteca principal
- **TypeScript 5.8.2** - Tipagem estática
- **Vite 6.2.0** - Build tool e dev server
- **React Markdown 10.1.0** - Renderização de markdown
- **Lucide React 0.561.0** - Biblioteca de ícones
- **Tailwind CSS** (via inline classes) - Estilização

#### Backend/Serviços
- **Google GenAI SDK 1.33.0** - Integração com Gemini AI
- Sistema de instruções customizado para contexto legal brasileiro
- Temperatura de 0.3 para maior precisão factual
- Tratamento de erros e fallbacks

#### Infraestrutura
- **GitHub Actions** - CI/CD configurado
- **Google Kubernetes Engine (GKE)** - Workflow de deployment
- **Google Container Registry** - Armazenamento de imagens Docker
- Configuração para build, publicação e deploy automatizados

### 📋 Características de Segurança
- Validações de entrada do usuário
- Tratamento de erros robusto
- Instruções de sistema para prevenir alucinações da IA
- Respostas sempre baseadas em legislação oficial
- Disclaimer para casos que requerem análise jurídica especializada
- Ambiente isolado para processamento de dados

### 🚀 Configuração e Deployment
- Configuração via variável de ambiente `GEMINI_API_KEY`
- Suporte para desenvolvimento local com hot reload
- Scripts npm para desenvolvimento, build e preview
- Arquivo `.env.local` para configuração local
- Workflow de GitHub Actions para deploy em produção

### 📝 Documentação
- README.md com instruções de instalação
- Instruções para execução local
- Link para aplicação no AI Studio
- Metadata.json com descrição do projeto

### 🎯 Casos de Uso Suportados
- Consultas sobre procedimentos licitatórios
- Esclarecimentos sobre a Lei 14.133/2021
- Geração de documentos padronizados
- Orientação sobre documentação necessária
- Sugestões de passos operacionais para compradores públicos
- Acesso rápido a jurisprudência e modelos oficiais

### 🔄 Arquitetura da Aplicação
- Arquitetura de componentes React modulares
- Gerenciamento de estado com React Hooks
- Separação de serviços (camada de integração com IA)
- Tipagem forte com TypeScript
- Sistema de roteamento por views (Chat, Gerador, Base de Conhecimento)

### 📦 Estrutura do Projeto
```
LicitaGov-AI/
├── components/          # Componentes React
│   ├── ChatInterface.tsx
│   ├── DocGenerator.tsx
│   ├── KnowledgeBase.tsx
│   └── Layout.tsx
├── services/           # Serviços de integração
│   └── gemini.ts
├── .github/           # Workflows CI/CD
│   └── workflows/
│       ├── google.yml
│       └── npm-publish-github-packages.yml
├── App.tsx            # Componente principal
├── index.tsx          # Entry point
├── types.ts           # Definições TypeScript
└── vite.config.ts     # Configuração Vite
```

### 👥 Público-Alvo
- Compradores públicos
- Agentes de contratação
- Servidores de setores de licitação
- Estudantes de administração pública
- Consultores em licitações

### ⚠️ Limitações Conhecidas
- Requer chave de API do Google Gemini
- Funciona melhor com navegadores modernos
- Dependente de conexão com internet
- Respostas limitadas ao conhecimento da IA até data de treinamento

### 🔮 Próximas Melhorias Planejadas
- Autenticação de usuários
- Histórico persistente de conversas
- Mais tipos de documentos no gerador
- Upload de documentos personalizados na base de conhecimento
- Integração com sistemas de compras governamentais
- Modo offline para consultas básicas
- Exportação em múltiplos formatos (PDF, DOCX)
- Dashboard de analytics para administradores

---

## Como Usar Este Release

### Instalação Local

```bash
# Clone o repositório
git clone https://github.com/and451/LicitaGov-AI.git
cd LicitaGov-AI

# Instale as dependências
npm install

# Configure a chave de API
# Crie um arquivo .env.local e adicione:
# GEMINI_API_KEY=sua_chave_aqui

# Execute em modo desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Acesso Online
Visite: https://ai.studio/apps/drive/1ybVBUvkcSnNl4lF8vmXRoZPSUprqTrp6

---

## Contribuidores

- Anderson Malta da Silva ([@and451](https://github.com/and451))

## Licença

Este é um projeto privado desenvolvido como MVP para auxiliar compradores públicos.

---

**Nota**: Esta é a primeira versão pública do LicitaGov AI. Feedbacks e sugestões são bem-vindos!
