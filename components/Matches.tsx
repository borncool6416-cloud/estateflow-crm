import React from 'react';
import { Card } from './ui/Card';
import { FileText, ArrowRight } from 'lucide-react';
import { Match } from '../types';

const MOCK_MATCHES: Match[] = [
  { requestId: '101', listingId: '505', matchScore: 95, requestClient: 'John Doe', listingAddress: '123 Palm Ave, Miami' },
  { requestId: '102', listingId: '509', matchScore: 88, requestClient: 'Sarah Connor', listingAddress: '445 Tech Blvd, Austin' },
  { requestId: '105', listingId: '512', matchScore: 82, requestClient: 'Michael Scott', listingAddress: '1725 Slough Rd, Scranton' },
  { requestId: '108', listingId: '520', matchScore: 75, requestClient: 'Dwight Schrute', listingAddress: 'Schrute Farms, PA' },
  { requestId: '110', listingId: '533', matchScore: 60, requestClient: 'Jim Halpert', listingAddress: '12 Stamford Branch, CT' },
];

export const Matches: React.FC = () => {
  const generatePDF = (requestId: string, listingId: string) => {
    // Simulated PDF generation as requested
    alert(`PDF generation successful for Match ${requestId}-${listingId}! Starting download...`);
  };

  return (
    <Card title="Matching Results" description="AI-powered matches between client requests and available listings.">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Client Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Matched Listing
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Match Score
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {MOCK_MATCHES.map((match) => (
              <tr key={`${match.requestId}-${match.listingId}`} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  #{match.requestId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {match.requestClient}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-800">#{match.listingId}</span>
                    <span className="text-xs text-slate-500">{match.listingAddress}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${match.matchScore >= 90 ? 'bg-green-100 text-green-800' : 
                      match.matchScore >= 75 ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}>
                    {match.matchScore}% Match
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => generatePDF(match.requestId, match.listingId)}
                    className="text-blue-600 hover:text-blue-900 flex items-center justify-end space-x-1 ml-auto"
                  >
                    <FileText size={16} />
                    <span>Generate Offer PDF</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between">
        <span className="text-sm text-slate-500">Showing 1-5 of 12 results</span>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-white disabled:opacity-50">Previous</button>
          <button className="px-3 py-1 border border-slate-300 rounded-md text-sm text-slate-600 hover:bg-white">Next</button>
        </div>
      </div>
    </Card>
  );
};
