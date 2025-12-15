import React, { useState } from 'react';
import { Card } from './ui/Card';
import { TransactionType, UnitStatus } from '../types';
import { Save, UploadCloud } from 'lucide-react';

export const ListingForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Listing created successfully!');
      (e.target as HTMLFormElement).reset();
      setFileCount(0);
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileCount(e.target.files.length);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <Card title="Owner Details" description="Contact information for the property owner.">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Client Name</label>
                <input 
                  required 
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Jane Smith"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Phone Number</label>
                <input 
                  required 
                  type="tel" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="+1 (555) 999-9999"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <input 
                  required 
                  type="email" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="jane@example.com"
                />
              </div>
              <div className="col-span-1 md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Client Notes</label>
                <textarea 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                  placeholder="Owner's availability for viewings, urgency, etc."
                />
              </div>
            </div>
          </Card>

          <Card title="Unit Details" description="Specifications of the property being listed.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Transaction Type</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value={TransactionType.SALE}>For Sale</option>
                  <option value={TransactionType.RENT}>For Rent</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Property Location</label>
                <input 
                  required
                  type="text" 
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="123 Main St, City, State"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Area (sqm)</label>
                <input 
                  required
                  type="number" 
                  min="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="150"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bedrooms</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Bathrooms</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Unit Status</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white">
                  <option value={UnitStatus.FINISHED}>Finished</option>
                  <option value={UnitStatus.UNFINISHED}>Unfinished</option>
                  <option value={UnitStatus.NEW}>New</option>
                  <option value={UnitStatus.USED}>Used</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-slate-700">Asking Price ($)</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500">$</span>
                  <input 
                    required
                    type="number" 
                    min="0"
                    className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="750,000"
                  />
                </div>
              </div>

              <div className="md:col-span-3 pt-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Property Photos</label>
                <div className="relative border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 transition-colors text-center cursor-pointer">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <UploadCloud size={24} />
                    </div>
                    <div className="text-sm text-slate-600">
                      {fileCount > 0 
                        ? <span className="font-semibold text-blue-600">{fileCount} file(s) selected</span>
                        : <span><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</span>
                      }
                    </div>
                    <p className="text-xs text-slate-400">SVG, PNG, JPG or GIF (max. 10MB)</p>
                  </div>
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
              <span>{loading ? 'Processing...' : 'Submit Listing'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
