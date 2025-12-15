import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  GitCompare, 
  Menu, 
  X,
  Bell,
  FileText,
  Users,
  BarChart
} from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { RequestForm } from './components/RequestForm';
import { ListingForm } from './components/ListingForm';
import { Matches } from './components/Matches';
import { ProposalForm } from './components/ProposalForm';
import { ContactsForm } from './components/ContactsForm';
import { Report } from './components/Report';

type View = 'dashboard' | 'contacts' | 'new-request' | 'new-listing' | 'matches' | 'proposal-generator';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'contacts', name: 'Contacts', icon: Users },
    { id: 'new-request', name: 'New Request', icon: PlusCircle },
    { id: 'new-listing', name: 'New Listing', icon: Building2 },
    { id: 'matches', name: 'Matches', icon: GitCompare },
    { id: 'proposal-generator', name: 'Offer PDF', icon: FileText },
    { id: 'report', name: 'Report', icon: BarChart },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'contacts': return <ContactsForm />;
      case 'new-request': return <RequestForm />;
      case 'new-listing': return <ListingForm />;
      case 'matches': return <Matches />;
      case 'proposal-generator': return <ProposalForm />;
      case 'report': return <Report />;
      default: return <Dashboard />;
    }
  };

  const getPageTitle = () => {
    const item = navigation.find(n => n.id === currentView);
    return item ? item.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white fixed h-full z-10 no-print">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Building2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">EstateFlow</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id as View)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  currentView === item.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-2">
            <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold">
              JD
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-slate-500">Senior Broker</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64 transition-all">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-20 no-print">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <button 
                className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-xl font-bold text-slate-800">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white border-t border-slate-200 p-4 space-y-2 absolute w-full shadow-lg">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id as View);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${
                    currentView === item.id 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 overflow-y-auto print:p-0 print:overflow-visible">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
