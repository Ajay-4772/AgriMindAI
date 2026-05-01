"use client"
import { useState } from 'react';
import axios from 'axios';
import { Sprout, Loader2 } from 'lucide-react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorus: '', potassium: '', temperature: '', humidity: '', ph: '', rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, parseFloat(val as string) || 0])
      );
      const res = await axios.post('http://localhost:8000/api/crop/predict', formattedData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to get recommendation. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-agri-light mb-4">
          <Sprout className="h-8 w-8 text-agri" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Crop Recommendation</h1>
        <p className="text-xl text-gray-600">Enter your soil and weather conditions to get the best crop suggestion.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="p-8 w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
                <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 90" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
                <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 42" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
                <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 43" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 20.8" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Humidity (%)</label>
                <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 82.0" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">pH Level</label>
                <input type="number" name="ph" value={formData.ph} onChange={handleChange} required step="0.1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 6.5" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rainfall (mm)</label>
              <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 202.9" />
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-agri hover:bg-agri-dark text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">
              {loading ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Processing...</> : 'Get Recommendation'}
            </button>
          </form>
        </div>
        
        <div className="bg-agri-light p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-500">
              <p className="text-gray-500 font-medium uppercase tracking-wider mb-2">Recommended Crop</p>
              <h2 className="text-5xl font-extrabold text-agri-dark mb-4 capitalize">{result.recommended_crop}</h2>
              <div className="bg-white px-6 py-3 rounded-full inline-block shadow-sm">
                <p className="text-agri-dark font-semibold">Confidence Score: {result.confidence}%</p>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <Sprout className="h-24 w-24 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Fill the form and submit to see the magic of AI.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
