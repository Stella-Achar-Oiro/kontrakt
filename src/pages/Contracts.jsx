import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency, capitalize, getStatusBadgeVariant } from '../utils/format';
import Badge from '../components/Badge';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function Contracts() {
  const { contracts } = useApp();
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? contracts : contracts.filter(c => c.status === filter);
  const statuses = ['all', 'active', 'completed', 'on-hold'];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Contracts</h1>
          <p className="text-text-secondary mt-1">Manage your construction contracts</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {statuses.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === s ? 'bg-primary text-white' : 'bg-white text-text-secondary border border-border hover:bg-slate-50'
            }`}
          >
            {capitalize(s)}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {filtered.map(contract => {
          const budgetPercent = Math.round((contract.spent / contract.budget) * 100);
          return (
            <div key={contract.id} className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">{contract.name}</h3>
                  <p className="text-sm text-text-secondary mt-0.5">Client: {contract.client}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(contract.budgetStatus)}>{capitalize(contract.budgetStatus)}</Badge>
              </div>

              <div className="flex flex-wrap gap-4 text-sm text-text-secondary mb-4">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" />{contract.location}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" />{contract.daysRemaining} days remaining</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-xs text-text-muted font-medium">Budget</p>
                  <p className="text-sm font-semibold">{formatCurrency(contract.budget)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Spent</p>
                  <p className="text-sm font-semibold">{formatCurrency(contract.spent)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Remaining</p>
                  <p className="text-sm font-semibold">{formatCurrency(contract.budget - contract.spent)}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium">Budget Used</p>
                  <p className="text-sm font-semibold">{budgetPercent}%</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-text-muted mb-1">
                  <span>Progress</span>
                  <span>{contract.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${contract.progress}%`,
                      backgroundColor: contract.budgetStatus === 'over-budget' ? '#EF4444' : '#0369A1',
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/contracts/${contract.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
                >
                  View Details <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={`/expenses?contract=${contract.id}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors"
                >
                  View Expenses
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
