import React, { useState } from 'react';
import { Card } from './ui/Card';
import { TransactionType } from '../types';
import { Save } from 'lucide-react';

export const RequestForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Request saved successfully!');
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="Client Details" description="Contact information for the client searching for a property.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Client Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Client Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                  placeholder="Specific requirements, preferences, or availability..."
                />
              </div>
            </div>
          </Card>

          <Card title="Property Requirements" description="Details of the unit the client is looking for.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Transaction Type</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value={TransactionType.SALE}>For Sale</option>
                  <option value={TransactionType.RENT}>For Rent</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Preferred Location</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="e.g. Downtown, Suburbs, Specific City"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Min Area (sqm)</label>
                <input 
                  required
                  type="number" 
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="100"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bedrooms</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bathrooms</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>

              <div className="md:col-span-3 space-y-2">
                <label className="text-sm font-medium text-slate-700">Target Budget ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500">$</span>
                  <input 
                    required
                    type="number" 
                    min="0"
                    className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="500,000"
                  />
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Submit Request'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
