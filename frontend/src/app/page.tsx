"use client"
import Link from 'next/link';
import { Sprout, TrendingUp, Bug, Beaker, CloudRain, ChevronRight } from 'lucide-react';

export default function Home() {
  const features = [
    { title: 'Crop Recommendation', icon: Sprout, desc: 'AI-powered suggestions for the best crops to grow based on soil and climate.', link: '/services/crop' },
    { title: 'Yield Prediction', icon: TrendingUp, desc: 'Predict crop yields with high accuracy using environmental data.', link: '/services/yield' },
    { title: 'Disease Detection', icon: Bug, desc: 'Upload a plant leaf image to instantly detect diseases and get prevention tips.', link: '/services/disease' },
    { title: 'Fertilizer Guide', icon: Beaker, desc: 'Get personalized fertilizer recommendations based on soil NPK levels.', link: '/services/fertilizer' },
    { title: 'Weather Forecast', icon: CloudRain, desc: 'Advanced weather predictions to help you plan farming activities.', link: '/services/weather' },
  ];

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-br from-agri to-agri-dark text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Smart Agriculture with <span className="text-agri-light">AI Predictions</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-3xl mx-auto font-light">
            Revolutionize your farming with cutting-edge AI technology. Get accurate crop yield predictions, disease alerts, fertilizer recommendations, and weather forecasts all in one platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#features" className="bg-white text-agri-dark px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center">
              Start Predicting <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-agri mb-2">10,000+</p>
              <p className="text-gray-600 font-medium">Happy Farmers</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-agri mb-2">95%</p>
              <p className="text-gray-600 font-medium">Prediction Accuracy</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-agri mb-2">50+</p>
              <p className="text-gray-600 font-medium">Crop Types</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-agri mb-2">24/7</p>
              <p className="text-gray-600 font-medium">Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features for Modern Farming</h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">Leverage the power of artificial intelligence to make informed decisions and maximize your agricultural productivity.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col"
              >
                <div className="p-8 flex-grow">
                  <div className="w-16 h-16 bg-agri-light rounded-full flex items-center justify-center mx-auto mb-6">
                    <feat.icon className="h-8 w-8 text-agri" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feat.title}</h3>
                  <p className="text-gray-600 mb-8">{feat.desc}</p>
                </div>
                <div className="p-4 bg-gray-50 border-t mt-auto">
                  <Link href={feat.link} className="text-agri font-semibold hover:text-agri-dark flex items-center justify-center">
                    Try Now <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="w-full py-24 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 mb-16">Our AI-powered platform makes agricultural predictions simple and accurate in just three steps.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-[16%] right-[16%] h-0.5 bg-agri-light -z-10"></div>
            
            <div className="relative">
              <div className="w-12 h-12 bg-agri text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">1</div>
              <h4 className="text-xl font-bold mb-2">Input Data</h4>
              <p className="text-gray-600">Enter your soil conditions, crop type, or upload a leaf image.</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-agri text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">2</div>
              <h4 className="text-xl font-bold mb-2">AI Analysis</h4>
              <p className="text-gray-600">Our advanced machine learning models analyze the data instantly.</p>
            </div>
            <div className="relative">
              <div className="w-12 h-12 bg-agri text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-lg">3</div>
              <h4 className="text-xl font-bold mb-2">Get Results</h4>
              <p className="text-gray-600">Receive accurate predictions, actionable recommendations and alerts.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
