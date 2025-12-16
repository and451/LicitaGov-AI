import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { FileText, Wand2, Download, Copy, Check, Loader2, ArrowRight } from 'lucide-react';
import { generateDocumentDraft } from '../services/gemini';

const DocGenerator: React.FC = () => {
  const [step, setStep] = useState(1);
  const [docType, setDocType] = useState('Termo de Referência (TR)');
  const [object, setObject] = useState('');
  const [quantity, setQuantity] = useState('');
  const [justification, setJustification] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!object || !quantity || !justification) return;
    setIsGenerating(true);
    const content = await generateDocumentDraft(docType, object, justification, quantity);
    setGeneratedContent(content);
    setIsGenerating(false);
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Minuta_${docType.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const resetForm = () => {
    setGeneratedContent('');
    setStep(1);
    setCopied(false);
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto">
      <div className="bg-white border-b border-slate-200 px-6 py-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
          <FileText className="text-blue-600" />
          Gerador de Minutas
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Crie rascunhos iniciais de documentos essenciais com auxílio de IA.
        </p>
      </div>

      <div className="flex-1 p-6 max-w-5xl mx-auto w-full">
        {step === 1 ? (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8 animate-fade-in">
            <h3 className="text-lg font-medium text-slate-800 mb-6 border-b pb-2">1. Dados da Demanda</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Documento</label>
                <select 
                  value={docType}
                  onChange={(e) => setDocType(e.target.value)}
                  className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                >
                  <option>Termo de Referência (TR)</option>
                  <option>Estudo Técnico Preliminar (ETP)</option>
                  <option>Justificativa de Contratação Direta</option>
                  <option>Aviso de Dispensa</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Objeto (O que será comprado?)</label>
                  <input
                    type="text"
                    value={object}
                    onChange={(e) => setObject(e.target.value)}
                    placeholder="Ex: 50 Caixas de Papel A4"
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Quantidade/Estimativa</label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Ex: 500 resmas para 12 meses"
                    className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Justificativa da Necessidade</label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  placeholder="Por que essa compra é necessária para a administração pública?"
                  rows={4}
                  className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={handleGenerate}
                  disabled={!object || !quantity || !justification || isGenerating}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    !object || !quantity || !justification || isGenerating
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Gerando Minuta...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Gerar Minuta com IA
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
               <button 
                onClick={resetForm}
                className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-1"
               >
                 ← Voltar e editar dados
               </button>
               <div className="flex gap-2">
                 <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors text-sm font-medium"
                 >
                   {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                   {copied ? 'Copiado!' : 'Copiar Texto'}
                 </button>
                 <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium shadow-sm"
                 >
                   <Download className="w-4 h-4" />
                   Baixar (.txt)
                 </button>
               </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 min-h-[500px] prose prose-slate max-w-none">
                <h3 className="text-center text-slate-400 text-sm uppercase tracking-widest mb-8 border-b pb-4">Minuta Sugerida</h3>
                <ReactMarkdown>{generatedContent}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocGenerator;