"use client"
import Link from 'next/link';
import { useState } from 'react';
import { Leaf, Menu, X, ChevronDown } from 'lucide-react';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const services = [
    { name: 'Crop Recommendation', href: '/services/crop' },
    { name: 'Yield Prediction', href: '/services/yield' },
    { name: 'Disease Detection', href: '/services/disease' },
    { name: 'Fertilizer Guide', href: '/services/fertilizer' },
    { name: 'Weather Forecast', href: '/services/weather' },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-agri-dark font-bold text-xl gap-2">
              <Leaf className="h-6 w-6 text-agri" />
              AgriMindAI
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-agri font-medium">Home</Link>
            <div className="relative group">
              <button 
                className="flex items-center text-gray-700 hover:text-agri font-medium focus:outline-none"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                AI Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {/* Dropdown for desktop */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-50">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-agri-light hover:text-agri-dark"
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="text-gray-700 hover:text-agri font-medium">About</Link>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-agri">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri hover:bg-agri-light">Home</Link>
            <div className="px-3 py-2">
              <p className="text-sm font-semibold text-gray-500 mb-2">AI Services</p>
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="block pl-4 py-2 text-base font-medium text-gray-700 hover:text-agri hover:bg-agri-light"
                  onClick={() => setIsOpen(false)}
                >
                  {service.name}
                </Link>
              ))}
            </div>
            <Link href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-agri hover:bg-agri-light">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
