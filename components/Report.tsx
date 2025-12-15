import React from 'react';
import { Card } from './ui/Card';
import { Download, Printer, FileText, BarChart2 } from 'lucide-react';

export const Report: React.FC = () => {
  const stats = [
    { label: 'Total Requests', value: 1234, change: '+12%', icon: '📊' },
    { label: 'Total Listings', value: 856, change: '+5%', icon: '🏠' },
    { label: 'Active Matches', value: 142, change: '+23%', icon: '🤝' },
    { label: 'Conversion Rate', value: '24%', change: '+3%', icon: '📈' },
    { label: 'Total Contacts', value: 89, change: '+8%', icon: '👥' },
    { label: 'Revenue Estimate', value: '$456K', change: '+15%', icon: '💰' },
  ];

  const recentActivities = [
    { id: 1, action: 'New Contact Added', details: 'John Smith', time: '2 hours ago' },
    { id: 2, action: 'Property Listing Created', details: '123 Palm Ave', time: '1 day ago' },
    { id: 3, action: 'Match Found', details: 'Request #101 → Listing #505', time: '2 days ago' },
    { id: 4, action: 'Proposal Generated', details: 'For Michael Scott', time: '3 days ago' },
  ];

  const generateCSV = () => {
    // Create CSV content
    const headers = ['Metric', 'Value', 'Change'];
    const csvRows = [
      headers.join(','),
      ...stats.map(stat => `${stat.label},${stat.value},${stat.change}`)
    ];
    
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'estateflow-report.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('CSV report downloaded!');
  };

  const generatePDF = () => {
    alert('PDF generation would be implemented here. For now, you can use the browser print function.');
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card title="Dashboard Report" description="Comprehensive overview of your CRM metrics">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="text-2xl">{stat.icon}</div>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.change.startsWith('+') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-800 mb-1">{stat.value}</div>
              <div className="text-slate-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-center space-x-4 p-3 hover:bg-slate-50 rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.action}</p>
                    <p className="text-sm text-slate-500">{activity.details}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Export Options</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={generateCSV}
                  className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="p-3 bg-green-50 text-green-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                    <FileText size={24} />
                  </div>
                  <span className="font-medium text-slate-800">CSV Export</span>
                  <span className="text-sm text-slate-500 mt-1">Spreadsheet format</span>
                </button>

                <button
                  onClick={generatePDF}
                  className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                >
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-lg mb-3 group-hover:scale-110 transition-transform">
                    <Download size={24} />
                  </div>
                  <span className="font-medium text-slate-800">PDF Report</span>
                  <span className="text-sm text-slate-500 mt-1">Printable format</span>
                </button>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <h4 className="font-medium text-slate-800 mb-2">Quick Actions</h4>
                <div className="flex space-x-3">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
                  >
                    <Printer size={16} />
                    <span>Print Report</span>
                  </button>
                  <button
                    onClick={() => alert('Charts would open in new view')}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <BarChart2 size={16} />
                    <span>View Charts</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="bg-white p-6 rounded-xl shadow border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Summary</h3>
        <div className="text-slate-600 space-y-3">
          <p>This report provides a snapshot of your CRM performance. Key highlights:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>High conversion rate</strong> of 24% indicates effective matching</li>
            <li><strong>Growing contact database</strong> with 89 total contacts</li>
            <li><strong>Active matching system</strong> with 142 current matches</li>
            <li><strong>Revenue projections</strong> show positive growth trends</li>
          </ul>
          <p className="pt-2 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  );
};