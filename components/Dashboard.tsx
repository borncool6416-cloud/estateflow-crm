import React from 'react';
import { 
  Users, 
  Home, 
  CheckCircle, 
  TrendingUp 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card } from './ui/Card';

const data = [
  { name: 'Mon', requests: 4, listings: 2 },
  { name: 'Tue', requests: 3, listings: 5 },
  { name: 'Wed', requests: 7, listings: 3 },
  { name: 'Thu', requests: 2, listings: 4 },
  { name: 'Fri', requests: 6, listings: 6 },
  { name: 'Sat', requests: 4, listings: 1 },
  { name: 'Sun', requests: 3, listings: 3 },
];

export const Dashboard: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
  // Placeholder: implement search logic as needed
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearchChange}
          className="w-full max-w-xs px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Search contact by name or number..."
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Requests</p>
            <h3 className="text-2xl font-bold text-slate-800">1,234</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-lg">
            <Home size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Listings</p>
            <h3 className="text-2xl font-bold text-slate-800">856</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Active Matches</p>
            <h3 className="text-2xl font-bold text-slate-800">142</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center space-x-4">
          <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Conversion Rate</p>
            <h3 className="text-2xl font-bold text-slate-800">24%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Activity Overview" className="lg:col-span-2">
          {/* Added min-w-0 to prevent flex item overflow and ensure Recharts can measure width correctly */}
          <div className="h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} 
                />
                <Bar dataKey="requests" fill="#3b82f6" radius={[4, 4, 0, 0]} name="New Requests" />
                <Bar dataKey="listings" fill="#22c55e" radius={[4, 4, 0, 0]} name="New Listings" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card title="Recent Notifications">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-slate-800">New Match Found</p>
                  <p className="text-xs text-slate-500">Request #10{i} matches Listing #50{i}</p>
                </div>
                <span className="text-xs text-slate-400 ml-auto">2h</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};