"use client"
import { useState } from 'react';
import axios from 'axios';
import { Beaker, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function FertilizerGuide() {
  const [formData, setFormData] = useState({
    nitrogen: '', phosphorus: '', potassium: '', crop_type: ''
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
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
      };
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await axios.post(`${API_URL}/api/fertilizer/recommend`, formattedData);
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
          <Beaker className="h-8 w-8 text-agri" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Fertilizer Guide</h1>
        <p className="text-xl text-gray-600">Get tailored fertilizer recommendations based on your soil nutrient levels.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">
        <div className="p-8 w-full md:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Target Crop</label>
              <select name="crop_type" value={formData.crop_type} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                <option value="">Select a crop</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="maize">Maize</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="pt-4 pb-2 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800">Current Soil Nutrients (kg/ha)</h3>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nitrogen (N)</label>
              <input type="number" name="nitrogen" value={formData.nitrogen} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phosphorus (P)</label>
              <input type="number" name="phosphorus" value={formData.phosphorus} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Potassium (K)</label>
              <input type="number" name="potassium" value={formData.potassium} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g. 15" />
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-agri hover:bg-agri-dark text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center mt-6">
              {loading ? <><Loader2 className="animate-spin mr-2 h-5 w-5" /> Analyzing...</> : 'Get Recommendations'}
            </button>
          </form>
        </div>
        
        <div className="bg-agri-light p-8 w-full md:w-1/2 flex flex-col justify-center items-center text-center">
          {result ? (
            <div className="animate-in fade-in zoom-in duration-500 w-full text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="text-agri mr-2 h-6 w-6" /> Recommended Fertilizers
              </h3>
              
              <ul className="space-y-3 mb-8">
                {result.recommended_fertilizers.map((fert: string, idx: number) => (
                  <li key={idx} className="bg-white p-4 rounded-lg shadow-sm font-semibold text-agri-dark border-l-4 border-agri">
                    {fert}
                  </li>
                ))}
              </ul>

              <div className="bg-white p-5 rounded-xl shadow-sm">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" /> Nutrient Deficiencies
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>Nitrogen (N):</span>
                    <span className={`font-bold ${result.n_deficiency > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {result.n_deficiency > 0 ? `-${result.n_deficiency} kg/ha` : 'Sufficient'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Phosphorus (P):</span>
                    <span className={`font-bold ${result.p_deficiency > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {result.p_deficiency > 0 ? `-${result.p_deficiency} kg/ha` : 'Sufficient'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Potassium (K):</span>
                    <span className={`font-bold ${result.k_deficiency > 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {result.k_deficiency > 0 ? `-${result.k_deficiency} kg/ha` : 'Sufficient'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">
              <Beaker className="h-24 w-24 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Input your soil details to see what your crops need.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
