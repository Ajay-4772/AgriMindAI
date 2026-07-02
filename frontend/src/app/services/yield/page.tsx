"use client"
import { useState } from 'react';
import axios from 'axios';
import { TrendingUp, Loader2 } from 'lucide-react';

export default function YieldPrediction() {
  const [formData, setFormData] = useState({
    crop_type: '', area: '', rainfall: '', temperature: '', fertilizer_used: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedData = {
        crop_type: formData.crop_type,
        area: parseFloat(formData.area),
        rainfall: parseFloat(formData.rainfall),
        temperature: parseFloat(formData.temperature),
        fertilizer_used: parseFloat(formData.fertilizer_used),
      };
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await axios.post(`${API_URL}/api/yield/predict`, formattedData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to get prediction. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agri-light mb-4">
          <TrendingUp className="h-8 w-8 text-agri" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Yield Prediction</h1>
        <p className="text-xl text-gray-600">Estimate your crop yield based on farm area, weather, and fertilizer usage.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="p-8 w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Crop Type</label>
              <select name="crop_type" value={formData.crop_type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                <option value="">Select a crop</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="maize">Maize</option>
                <option value="cotton">Cotton</option>
                <option value="sugarcane">Sugarcane</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Area (Hectares)</label>
                <input type="number" name="area" value={formData.area} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 10" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm)</label>
                <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 150" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 25" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fertilizer Used (kg)</label>
                <input type="number" name="fertilizer_used" value={formData.fertilizer_used} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 50" />
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-agri hover:bg-agri-dark text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center mt-6">
              {loading ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Calculating...</> : 'Predict Yield'}
            </button>
          </form>
        </div>
        
        <div className="bg-agri-light p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-500 w-full">
              <p className="text-gray-500 font-medium uppercase tracking-wider mb-2">Expected Total Yield</p>
              <h2 className="text-5xl font-extrabold text-agri-dark mb-2">{result.expected_yield_tons} <span className="text-2xl font-semibold text-agri">Tons</span></h2>
              
              <div className="mt-8 bg-white p-4 rounded-xl shadow-sm w-full">
                <p className="text-sm text-gray-500 mb-1">Yield per Hectare</p>
                <p className="text-2xl font-bold text-gray-800">{result.yield_per_hectare} t/ha</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <TrendingUp className="h-24 w-24 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Enter your farm details to get an AI-powered yield estimate.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
