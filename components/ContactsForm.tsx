import React, { useState, useEffect } from 'react';
import { Card } from './ui/Card';
import { Save, RefreshCw, Trash2 } from 'lucide-react';

interface Contact {
  id: number;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

export const ContactsForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [fetching, setFetching] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    notes: ''
  });

  const fetchContacts = async () => {
    setFetching(true);
    try {
      const response = await fetch('http://192.168.1.2:4000/contacts');
      const result = await response.json();
      if (result.success) {
        setContacts(result.contacts || []);
      } else {
        console.error('Failed to fetch contacts:', result.error);
        alert('Failed to fetch contacts. Make sure backend is running.');
      }
    } catch (err) {
      console.error('Error fetching contacts:', err);
      alert('Cannot connect to backend. Make sure server is running on port 4000.');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
const response = await fetch('http://192.168.1.2:4000/add-contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
      const result = await response.json();
      if (result.success) {
        // Refresh contacts list
        fetchContacts();
        // Reset form
        setForm({ name: '', phone: '', email: '', notes: '' });
        alert('✅ Contact saved successfully to Google Sheets!');
      } else {
        alert('❌ Failed to save contact: ' + (result.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('❌ Failed to connect to backend. Make sure server is running on port 4000.');
    }
    setLoading(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      // Note: This is a frontend-only delete. For Google Sheets deletion, you'd need a backend endpoint.
      setContacts(contacts.filter(contact => contact.id !== id));
      alert('Contact deleted from local view (not from Google Sheets).');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card 
        title="Add New Contact" 
        description="Save a new client contact (no unit info required). Contacts are saved to Google Sheets."
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Name *</label>
              <input
                required
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Client Name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Email Address *</label>
              <input
                required
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="client@example.com"
              />
            </div>
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-slate-700">Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[80px]"
                placeholder="Notes about the client..."
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save to Google Sheets'}</span>
            </button>
          </div>
        </form>
      </Card>

      <Card 
        title="My Contacts" 
        description={`Contacts from Google Sheets (${contacts.length} total)`}
        className="mt-8"
      >
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={fetchContacts}
            disabled={fetching}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={fetching ? 'animate-spin' : ''} />
            <span>{fetching ? 'Refreshing...' : 'Refresh Contacts'}</span>
          </button>
          <span className="text-sm text-slate-500">
            {fetching ? 'Loading...' : `Showing ${contacts.length} contacts`}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Phone</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-slate-400 py-6">
                    {fetching ? 'Loading contacts...' : 'No contacts found. Add your first contact above!'}
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-800 font-medium">{contact.name}</td>
                    <td className="px-4 py-3 text-slate-800">{contact.phone}</td>
                    <td className="px-4 py-3 text-slate-800">
                      <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                        {contact.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-slate-800 max-w-xs truncate">{contact.notes}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        title="Delete contact"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-medium text-blue-800 mb-2">ℹ️ Google Sheets Integration Status</h3>
        <p className="text-sm text-blue-700">
          Backend server should be running on port 4000. Open{' '}
          <a href="http://localhost:4000/test" target="_blank" rel="noopener noreferrer" 
             className="underline font-medium">
            http://localhost:4000/test
          </a>{' '}
          to test the connection.
        </p>
      </div>
    </div>
  );
};