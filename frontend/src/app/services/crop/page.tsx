"use client"
import { useState } from 'react';
import axios from 'axios';
import { Sprout, Loader2, Info } from 'lucide-react';

export default function CropRecommendation() {
  const [formData, setFormData] = useState({
    rainfall: '', 
    temperature: '', 
    humidity: '', 
    soil_type: '',
    ph: '', 
    season: '',
    farm_size: '',
    water_availability: '',
    experience: '',
    market_preference: ''
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
        rainfall: parseFloat(formData.rainfall) || 0,
        temperature: parseFloat(formData.temperature) || 0,
        humidity: parseFloat(formData.humidity) || 0,
        ph: parseFloat(formData.ph) || 7.0,
        soil_type: formData.soil_type || 'Loamy Soil',
        season: formData.season || 'Kharif',
        farm_size: parseFloat(formData.farm_size) || 1.0,
        water_availability: formData.water_availability || 'Medium',
        experience: formData.experience || 'Intermediate',
        market_preference: formData.market_preference || 'Mixed'
      };
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const res = await axios.post(`${API_URL}/api/crop/predict`, formattedData);
      setResult(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to get recommendation. Make sure the backend is running.');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
          <Sprout className="h-10 w-10 text-agri" /> Smart Crop Recommendation
        </h1>
        <p className="text-xl text-gray-600">Get personalized crop suggestions based on your location and farming conditions</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
        <div className="p-8 w-full lg:w-[60%] border-r border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Annual Rainfall (mm) *</label>
                <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g., 850" />
                <p className="text-xs text-gray-500 mt-1">Historical average or meteorological forecast</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Average Temperature (°C) *</label>
                <input type="number" name="temperature" value={formData.temperature} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g., 25" />
                <p className="text-xs text-gray-500 mt-1">Annual average temperature</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Average Humidity (%) *</label>
                <input type="number" name="humidity" value={formData.humidity} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="e.g., 80" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Soil Type *</label>
                <select name="soil_type" value={formData.soil_type} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                  <option value="" disabled>Select Soil Type</option>
                  <option value="Clay Soil">Clay Soil</option>
                  <option value="Sandy Soil">Sandy Soil</option>
                  <option value="Loamy Soil">Loamy Soil</option>
                  <option value="Black Cotton Soil">Black Cotton Soil</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Alluvial Soil">Alluvial Soil</option>
                  <option value="Laterite Soil">Laterite Soil</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Soil pH Level</label>
                <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="7.0" />
                <p className="text-xs text-gray-500 mt-1">If unknown, leave as 7.0 (neutral)</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preferred Season *</label>
                <select name="season" value={formData.season} onChange={handleChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                  <option value="" disabled>Select Season</option>
                  <option value="Kharif">Kharif (Monsoon)</option>
                  <option value="Rabi">Rabi (Winter)</option>
                  <option value="Zaid">Zaid (Summer)</option>
                  <option value="All Year">All Year / Greenhouse</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Farm Size (hectares)</label>
                <input type="number" step="0.1" name="farm_size" value={formData.farm_size} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri" placeholder="1.0" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Water Availability</label>
                <select name="water_availability" value={formData.water_availability} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                  <option value="" disabled>Select Water Availability</option>
                  <option value="High">High (Good irrigation)</option>
                  <option value="Medium">Medium (Partial irrigation)</option>
                  <option value="Low">Low (Rainfed only)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Farming Experience</label>
                <select name="experience" value={formData.experience} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                  <option value="" disabled>Select Experience</option>
                  <option value="Beginner">Beginner (0-2 years)</option>
                  <option value="Intermediate">Intermediate (3-10 years)</option>
                  <option value="Expert">Expert (10+ years)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Market Preference</label>
                <select name="market_preference" value={formData.market_preference} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-agri focus:border-agri bg-white">
                  <option value="" disabled>Select Preference</option>
                  <option value="Local">Local Market</option>
                  <option value="Export">Export / Commercial</option>
                  <option value="Mixed">Mixed Farming</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    <strong>Smart Recommendation:</strong> Our AI analyzes multiple factors including climate, soil conditions, market trends, and your farming experience to suggest the most suitable crops for your farm.
                  </p>
                </div>
              </div>
            </div>
            
            <button type="submit" disabled={loading} className="w-full bg-agri hover:bg-agri-dark text-white font-bold py-4 px-4 rounded-xl transition duration-200 flex items-center justify-center text-lg shadow-md">
              {loading ? <><Loader2 className="animate-spin mr-2 h-6 w-6" /> Analyzing Data...</> : 'Get Crop Recommendations'}
            </button>
          </form>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-agri-light p-8 w-full lg:w-[40%] flex flex-col justify-center items-center text-center">
          {result ? (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                <p className="text-gray-500 font-bold uppercase tracking-widest mb-3 text-sm">Recommended Crop</p>
                <h2 className="text-5xl font-extrabold text-agri-dark mb-6 capitalize">{result.recommended_crop}</h2>
                <div className="bg-green-100 text-agri-dark px-6 py-2 rounded-full inline-block font-bold mb-8">
                  Match Confidence: {result.confidence}%
                </div>
                
                <div className="text-left mt-4 border-t pt-6 border-gray-100">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Info className="h-5 w-5 text-agri" /> Why this crop?
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                    {result.explanation}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 p-8">
              <div className="bg-white p-8 rounded-full shadow-sm inline-block mb-6">
                <Sprout className="h-20 w-20 text-agri-light opacity-80" />
              </div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">Awaiting Data</h3>
              <p className="text-gray-500">Fill the comprehensive form and submit to receive your personalized AI crop recommendation along with a detailed explanation.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
