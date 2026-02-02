import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatDate, capitalize } from '../utils/format';
import { FileText, Image, FileSpreadsheet, Shield, Filter, Download, Eye, FolderOpen } from 'lucide-react';

const typeIcons = {
  contract: FileText,
  drawing: Image,
  invoice: FileSpreadsheet,
  permit: Shield,
};

const typeColors = {
  contract: 'bg-blue-50 text-blue-600',
  drawing: 'bg-purple-50 text-purple-600',
  invoice: 'bg-emerald-50 text-emerald-600',
  permit: 'bg-amber-50 text-amber-600',
};

const badgeColors = {
  contract: 'bg-blue-50 text-blue-700 border-blue-200',
  drawing: 'bg-purple-50 text-purple-700 border-purple-200',
  invoice: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  permit: 'bg-amber-50 text-amber-700 border-amber-200',
};

export default function Documents() {
  const { contracts, documents } = useApp();
  const [searchParams] = useSearchParams();
  const contractParam = searchParams.get('contract');

  const [filterContract, setFilterContract] = useState(contractParam || 'all');
  const [filterType, setFilterType] = useState('all');
  const [search, setSearch] = useState('');

  const types = [...new Set(documents.map(d => d.type))];

  const filtered = useMemo(() => {
    let result = [...documents];
    if (filterContract !== 'all') result = result.filter(d => d.contractId === Number(filterContract));
    if (filterType !== 'all') result = result.filter(d => d.type === filterType);
    if (search) result = result.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
    return result.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
  }, [documents, filterContract, filterType, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Documents</h1>
          <p className="text-text-secondary mt-1">View and manage contract documents</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Filter className="w-4 h-4 text-text-muted" />
        <select
          value={filterContract}
          onChange={e => setFilterContract(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Contracts</option>
          {contracts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Types</option>
          {types.map(t => <option key={t} value={t}>{capitalize(t)}</option>)}
        </select>
        <input
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64"
        />
      </div>

      <div className="bg-white rounded-xl border border-border">
        {filtered.length > 0 ? (
          <div className="divide-y divide-border">
            {filtered.map(doc => {
              const Icon = typeIcons[doc.type] || FileText;
              const colorClass = typeColors[doc.type] || 'bg-slate-50 text-slate-600';
              const badgeClass = badgeColors[doc.type] || 'bg-slate-50 text-slate-600 border-slate-200';
              const contract = contracts.find(c => c.id === doc.contractId);
              return (
                <div key={doc.id} className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{doc.name}</p>
                    <p className="text-xs text-text-muted">{contract?.name || 'Unknown'} -- {doc.size}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${badgeClass}`}>
                      {capitalize(doc.type)}
                    </span>
                    <p className="text-xs text-text-muted mt-1">{formatDate(doc.uploadDate)}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-text-secondary transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-text-secondary transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-text-muted">
            <FolderOpen className="w-12 h-12 mb-3" />
            <p className="font-medium">No documents found</p>
            <p className="text-sm mt-1">Try adjusting your filters</p>
          </div>
        )}

        <div className="px-6 py-3 border-t border-border bg-slate-50 rounded-b-xl">
          <p className="text-sm text-text-secondary">{filtered.length} document{filtered.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
    </div>
  );
}
