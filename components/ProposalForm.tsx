import React, { useState } from 'react';
import { Card } from './ui/Card';
import { 
  UploadCloud, 
  Printer, 
  Edit2, 
  Bed, 
  Bath, 
  Maximize, 
  Star,
  Phone,
  Mail,
  Calendar,
  Building,
  Image as ImageIcon
} from 'lucide-react';

interface ProposalData {
  customerName: string;
  proposalDate: string;
  unitTitle: string;
  propertyAddress: string;
  heroImage: string | null;
  bedrooms: number;
  bathrooms: number;
  totalArea: string;
  specialFeature: string;
  offerPrice: number;
  currencySymbol: string;
  hoaFees: string;
  paymentTerms: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  companyLogo: string | null;
}

export const ProposalForm: React.FC = () => {
  const [isPreview, setIsPreview] = useState(false);
  
  const [formData, setFormData] = useState<ProposalData>({
    customerName: '',
    proposalDate: new Date().toISOString().split('T')[0],
    unitTitle: '',
    propertyAddress: '',
    heroImage: null,
    bedrooms: 0,
    bathrooms: 0,
    totalArea: '',
    specialFeature: '',
    offerPrice: 0,
    currencySymbol: 'USD',
    hoaFees: '',
    paymentTerms: '',
    agentName: 'Sarah Davis',
    agentPhone: '(0012) 456-6000',
    agentEmail: 'sarahdavis@gmail.com',
    companyLogo: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'companyLogo') => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setFormData(prev => ({ ...prev, [field]: url }));
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isPreview) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">Proposal Preview</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setIsPreview(false)}
              className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Edit2 size={16} />
              <span>Edit Details</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Printer size={16} />
              <span>Print / Save as PDF</span>
            </button>
          </div>
        </div>

        {/* This section represents the PDF Design */}
        <div id="proposal-preview" className="bg-white w-full max-w-[210mm] mx-auto min-h-[297mm] shadow-lg print:shadow-none p-12 relative print:w-full print:max-w-none print:m-0 print:h-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start mb-10 border-b border-slate-100 pb-6">
            <div className="flex items-center space-x-3">
              {formData.companyLogo ? (
                <img src={formData.companyLogo} alt="Logo" className="h-16 w-auto object-contain" />
              ) : (
                <div className="h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  <Building />
                </div>
              )}
              {!formData.companyLogo && <span className="text-xl font-bold text-slate-900">Apex Properties</span>}
            </div>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-slate-900 uppercase tracking-wide">Exclusive Unit Proposal</h1>
              <div className="mt-2 text-slate-500">
                <p className="text-sm">Prepared for</p>
                <p className="font-semibold text-slate-900 text-lg">{formData.customerName || '[Customer Name]'}</p>
                <p className="text-sm mt-1 flex items-center justify-end gap-1"><Calendar size={14}/> {formData.proposalDate}</p>
              </div>
            </div>
          </div>

          {/* Hero Section */}
          <div className="w-full h-80 bg-slate-100 rounded-2xl overflow-hidden mb-8 shadow-inner flex items-center justify-center relative">
            {formData.heroImage ? (
              <img src={formData.heroImage} alt="Unit View" className="w-full h-full object-cover" />
            ) : (
              <div className="text-slate-400 flex flex-col items-center">
                <ImageIcon size={48} className="mb-2" />
                <span className="text-sm">Hero Image Placeholder</span>
              </div>
            )}
          </div>

          {/* Property Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{formData.unitTitle || 'The Aurora Unit - 14B'}</h2>
            <p className="text-lg text-slate-500 font-light">{formData.propertyAddress || '123 Skyline Ave, Downtown'}</p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Bed className="w-8 h-8 text-blue-600 mb-3" />
              <span className="text-slate-500 text-sm uppercase tracking-wider mb-1">Bedroom Count</span>
              <span className="text-2xl font-bold text-slate-900">{formData.bedrooms}</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Bath className="w-8 h-8 text-blue-600 mb-3" />
              <span className="text-slate-500 text-sm uppercase tracking-wider mb-1">Bathroom Count</span>
              <span className="text-2xl font-bold text-slate-900">{formData.bathrooms}</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Maximize className="w-8 h-8 text-blue-600 mb-3" />
              <span className="text-slate-500 text-sm uppercase tracking-wider mb-1">Total Area</span>
              <span className="text-2xl font-bold text-slate-900">{formData.totalArea || '0 Sq Ft'}</span>
            </div>
            <div className="flex flex-col items-center p-6 bg-slate-50 rounded-xl border border-slate-100">
              <Star className="w-8 h-8 text-blue-600 mb-3" />
              <span className="text-slate-500 text-sm uppercase tracking-wider mb-1">Special Feature</span>
              <span className="text-xl font-bold text-slate-900 text-center">{formData.specialFeature || '-'}</span>
            </div>
          </div>

          {/* Financial Offer */}
          <div className="bg-slate-900 text-white rounded-2xl p-8 mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-slate-400 uppercase tracking-widest text-sm font-semibold mb-2">Offer Price</p>
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold tracking-tight">{formData.offerPrice.toLocaleString()}</span>
                  <span className="text-xl ml-2 text-slate-400">{formData.currencySymbol}</span>
                </div>
              </div>
              <div className="w-full md:w-px h-px md:h-20 bg-slate-700"></div>
              <div className="space-y-3 flex-1">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Maintenance/HOA Fees:</span>
                  <span className="font-medium">{formData.hoaFees || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-xs uppercase mb-1">Payment Terms Note:</span>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {formData.paymentTerms || 'Standard payment terms apply.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer & Agent Info */}
          <div className="mt-auto pt-8 border-t border-slate-200">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <p className="font-bold text-slate-900 text-lg">{formData.agentName}</p>
                <div className="flex items-center text-slate-600 space-x-2">
                  <Phone size={16} />
                  <span>{formData.agentPhone}</span>
                </div>
                <div className="flex items-center text-slate-600 space-x-2">
                  <Mail size={16} />
                  <span>{formData.agentEmail}</span>
                </div>
              </div>
              
              <div className="flex space-x-4 no-print">
                <button className="px-6 py-2 border border-slate-900 text-slate-900 rounded-lg font-medium hover:bg-slate-50">
                  Schedule Viewing
                </button>
                <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800">
                  Submit Offer
                </button>
              </div>
              
              {/* Print Only CTA mockups to look good on PDF */}
              <div className="hidden print:flex space-x-4">
                <div className="px-6 py-2 border border-slate-900 text-slate-900 rounded-lg font-medium">
                  Schedule Viewing
                </div>
                <div className="px-6 py-2 bg-slate-900 text-white rounded-lg font-medium">
                  Submit Offer
                </div>
              </div>
            </div>
          </div>

        </div>

        <style>
          {`
            @media print {
              @page { margin: 0; size: auto; }
              body { background: white; }
              .no-print { display: none !important; }
              /* Force background graphics for correct color printing */
              * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Proposal Generator</h2>
          <p className="text-slate-500">Create beautiful PDF proposals for your clients.</p>
        </div>
        <button 
          onClick={() => setIsPreview(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center space-x-2"
        >
          <Printer size={18} />
          <span>Generate Preview</span>
        </button>
      </div>

      <form className="space-y-6">
        <Card title="1. Client Information" description="Who is this proposal for?">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Customer Name</label>
              <input 
                type="text" 
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="John Smith"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Proposal Date</label>
              <input 
                type="date" 
                name="proposalDate"
                value={formData.proposalDate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        <Card title="2. Property Header & Visuals" description="Main listing details and hero image.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Unit Title / Number</label>
              <input 
                type="text" 
                name="unitTitle"
                value={formData.unitTitle}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='e.g., "The Aurora Unit - 14B"'
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Property Address</label>
              <input 
                type="text" 
                name="propertyAddress"
                value={formData.propertyAddress}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='e.g., "123 Skyline Ave, Downtown"'
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700 block mb-1">Hero Image</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 hover:bg-slate-50 transition-colors text-center relative">
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'heroImage')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.heroImage ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <ImageIcon size={20} />
                      <span className="font-medium">Image Selected</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-slate-500">
                      <UploadCloud size={24} className="mb-2" />
                      <span>Click to upload high-res photo</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Card>

        <Card title="3. Unit Specifications" description="Key statistics for the grid display.">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bedrooms</label>
              <input 
                type="number" 
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Bathrooms</label>
              <input 
                type="number" 
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Total Area</label>
              <input 
                type="text" 
                name="totalArea"
                value={formData.totalArea}
                onChange={handleInputChange}
                placeholder="1,250 Sq Ft"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Special Feature</label>
              <input 
                type="text" 
                name="specialFeature"
                value={formData.specialFeature}
                onChange={handleInputChange}
                placeholder="Sea View"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        <Card title="4. Financial Offer" description="Pricing and terms configuration.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Offer Price</label>
              <input 
                type="number" 
                name="offerPrice"
                value={formData.offerPrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Currency Symbol</label>
              <input 
                type="text" 
                name="currencySymbol"
                value={formData.currencySymbol}
                onChange={handleInputChange}
                placeholder="USD"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Maintenance / HOA Fees</label>
              <input 
                type="text" 
                name="hoaFees"
                value={formData.hoaFees}
                onChange={handleInputChange}
                placeholder="$450/month"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Payment Terms Note</label>
              <textarea 
                name="paymentTerms"
                value={formData.paymentTerms}
                onChange={handleInputChange}
                placeholder="Short note on installments or cash: 20% down payment..."
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              />
            </div>
          </div>
        </Card>

        <Card title="5. Agent / Company Details" description="Contact info for the footer.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Agent Name</label>
              <input 
                type="text" 
                name="agentName"
                value={formData.agentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Agent Phone</label>
              <input 
                type="text" 
                name="agentPhone"
                value={formData.agentPhone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Agent Email</label>
              <input 
                type="email" 
                name="agentEmail"
                value={formData.agentEmail}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block mb-1">Company Logo</label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 hover:bg-slate-50 transition-colors text-center relative flex items-center justify-center h-[42px]">
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'companyLogo')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {formData.companyLogo ? (
                    <span className="text-sm text-green-600 font-medium">Logo Uploaded</span>
                  ) : (
                    <span className="text-xs text-slate-500">Upload Logo</span>
                  )}
              </div>
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
};
