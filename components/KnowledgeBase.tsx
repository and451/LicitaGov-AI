import React from 'react';
import { FolderOpen, FileText, Database, ShieldCheck } from 'lucide-react';

const KnowledgeBase: React.FC = () => {
  const folders = [
    {
      name: 'Legislação Federal',
      files: ['Lei nº 14.133/2021 (NLLC)', 'Constituição Federal (Arts. 37-41)', 'IN SEGES/ME nº 65/2021'],
      color: 'bg-blue-100 text-blue-700',
    },
    {
      name: 'Jurisprudência TCU',
      files: ['Súmulas Selecionadas', 'Acórdãos Relevantes 2023-2024', 'Boletins de Jurisprudência'],
      color: 'bg-amber-100 text-amber-700',
    },
    {
      name: 'Modelos AGU',
      files: ['Termo de Referência Padrão', 'Edital de Pregão Eletrônico', 'Minutas de Contratos'],
      color: 'bg-emerald-100 text-emerald-700',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <Database className="text-blue-600" />
          Base de Conhecimento
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Documentos carregados no contexto do Agente de IA para fundamentar as respostas.
        </p>
      </div>

      <div className="p-6 max-w-6xl mx-auto w-full grid gap-6">
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
                <h4 className="font-semibold text-blue-800">Ambiente Seguro</h4>
                <p className="text-sm text-blue-700 mt-1">
                    Esta base de conhecimento é processada pelo Google AI Studio dentro de um contêiner isolado. 
                    As respostas do chat utilizam exclusivamente este contexto para garantir conformidade legal.
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {folders.map((folder, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className={`px-4 py-3 border-b border-slate-100 flex items-center gap-2 ${folder.color}`}>
                <FolderOpen className="w-5 h-5" />
                <span className="font-semibold">{folder.name}</span>
              </div>
              <ul className="divide-y divide-slate-100">
                {folder.files.map((file, fIdx) => (
                  <li key={fIdx} className="px-4 py-3 flex items-center gap-3 text-sm text-slate-600 hover:bg-slate-50">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {file}
                  </li>
                ))}
              </ul>
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-medium text-slate-500 hover:text-blue-600 uppercase tracking-wider">
                  Gerenciar Arquivos
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;