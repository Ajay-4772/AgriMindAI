"use client"
import { useState, useRef } from 'react';
import axios from 'axios';
import { Bug, Loader2, Upload, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function DiseaseDetection() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
      setResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:8080/api/disease/detect', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to detect disease. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agri-light mb-4">
          <Bug className="h-8 w-8 text-agri" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Disease Detection</h1>
        <p className="text-xl text-gray-600">Upload a picture of a plant leaf to instantly identify diseases and get prevention methods.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="p-8 w-full md:w-1/2 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col h-full justify-center">
            
            <div 
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${previewUrl ? 'border-agri bg-agri-light/30' : 'border-gray-300 hover:border-agri hover:bg-gray-50'}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
              
              {previewUrl ? (
                <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden shadow-md">
                  <Image src={previewUrl} alt="Leaf Preview" layout="fill" objectFit="cover" />
                </div>
              ) : (
                <div className="py-8">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 font-medium mb-1">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                </div>
              )}
            </div>

            {previewUrl && (
              <button 
                type="button" 
                onClick={(e) => { e.stopPropagation(); setFile(null); setPreviewUrl(null); setResult(null); }}
                className="text-sm text-red-500 font-medium text-center w-full hover:underline"
              >
                Remove Image
              </button>
            )}
            
            <button 
              type="submit" 
              disabled={loading || !file} 
              className={`w-full font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center ${file ? 'bg-agri hover:bg-agri-dark text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              {loading ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Analyzing Image...</> : 'Analyze Leaf'}
            </button>
          </form>
        </div>
        
        <div className="bg-gray-50 p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center border-l">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-500 w-full">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-sm mb-4">
                {result.disease_name.toLowerCase().includes('healthy') ? (
                  <CheckCircle2 className="h-8 w-8 text-green-500" />
                ) : (
                  <Bug className="h-8 w-8 text-red-500" />
                )}
              </div>
              <p className="text-gray-500 font-medium uppercase tracking-wider mb-2">Detection Result</p>
              <h2 className={`text-3xl font-bold mb-2 ${result.disease_name.toLowerCase().includes('healthy') ? 'text-green-600' : 'text-red-600'}`}>
                {result.disease_name}
              </h2>
              
              <div className="bg-white px-4 py-2 rounded-full inline-block shadow-sm mb-8">
                <p className="text-gray-700 font-medium">Confidence: <span className="font-bold">{result.confidence}%</span></p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm w-full text-left border-l-4 border-agri">
                <h4 className="font-bold text-gray-900 mb-2">Prevention & Treatment</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{result.prevention_suggestions}</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <div className="relative w-48 h-48 mx-auto opacity-30 mb-4 border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center">
                <Bug className="h-12 w-12" />
              </div>
              <p className="text-lg">Results will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
