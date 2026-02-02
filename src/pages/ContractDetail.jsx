import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, capitalize, getStatusBadgeVariant, getCategoryColor } from '../utils/format';
import Badge from '../components/Badge';
import { ArrowLeft, MapPin, Calendar, CheckCircle2, Clock, Circle } from 'lucide-react';

export default function ContractDetail() {
  const { id } = useParams();
  const { contracts, expenses } = useApp();
  const contract = contracts.find(c => c.id === Number(id));

  if (!contract) {
    return (
      <div className="text-center py-20">
        <p className="text-text-secondary">Contract not found.</p>
        <Link to="/contracts" className="text-primary hover:underline mt-2 inline-block">Back to contracts</Link>
      </div>
    );
  }

  const contractExpenses = expenses.filter(e => e.contractId === contract.id);
  const categoryBreakdown = contractExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const budgetPercent = Math.round((contract.spent / contract.budget) * 100);

  const milestoneIcon = (status) => {
    if (status === 'completed') return <CheckCircle2 className="w-5 h-5 text-success" />;
    if (status === 'in-progress') return <Clock className="w-5 h-5 text-info" />;
    return <Circle className="w-5 h-5 text-text-muted" />;
  };

  return (
    <div>
      <Link to="/contracts" className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Contracts
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{contract.name}</h1>
          <p className="text-text-secondary mt-1">{contract.description}</p>
        </div>
        <Badge variant={getStatusBadgeVariant(contract.budgetStatus)}>{capitalize(contract.budgetStatus)}</Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Contract Information</h2>
          <div className="grid grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Client</p>
              <p className="text-sm font-medium mt-1">{contract.client}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Location</p>
              <p className="text-sm font-medium mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{contract.location}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Start Date</p>
              <p className="text-sm font-medium mt-1">{formatDate(contract.startDate)}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">End Date</p>
              <p className="text-sm font-medium mt-1">{formatDate(contract.endDate)}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Duration</p>
              <p className="text-sm font-medium mt-1">{contract.duration} days</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Days Remaining</p>
              <p className="text-sm font-medium mt-1 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{contract.daysRemaining} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Financial Overview</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-text-muted font-medium">Budget</p>
              <p className="text-xl font-bold text-text-primary">{formatCurrency(contract.budget)}</p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium">Spent ({budgetPercent}%)</p>
              <p className="text-xl font-bold" style={{ color: contract.budgetStatus === 'over-budget' ? '#EF4444' : '#0369A1' }}>
                {formatCurrency(contract.spent)}
              </p>
            </div>
            <div>
              <p className="text-xs text-text-muted font-medium">Remaining</p>
              <p className="text-xl font-bold text-success">{formatCurrency(contract.budget - contract.spent)}</p>
            </div>
            <div className="pt-2">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(budgetPercent, 100)}%`,
                    backgroundColor: contract.budgetStatus === 'over-budget' ? '#EF4444' : '#0369A1',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Progress: {contract.progress}%</h2>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-primary rounded-full" style={{ width: `${contract.progress}%` }} />
          </div>
          <h3 className="text-sm font-semibold text-text-primary mb-3">Milestones</h3>
          <div className="space-y-3">
            {contract.milestones.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                {milestoneIcon(m.status)}
                <div className="flex-1">
                  <p className="text-sm font-medium text-text-primary">{m.name}</p>
                  <p className="text-xs text-text-muted">Due: {formatDate(m.dueDate)}</p>
                </div>
                <Badge variant={getStatusBadgeVariant(m.status)}>{capitalize(m.status)}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Expense Summary</h2>
          {Object.keys(categoryBreakdown).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(categoryBreakdown)
                .sort(([, a], [, b]) => b - a)
                .map(([cat, amount]) => (
                  <div key={cat} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getCategoryColor(cat) }} />
                      <span className="text-sm font-medium text-text-primary">{capitalize(cat)}</span>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(amount)}</span>
                  </div>
                ))}
              <div className="pt-3 mt-3 border-t border-border flex items-center justify-between">
                <span className="text-sm font-semibold text-text-primary">Total</span>
                <span className="text-sm font-bold text-text-primary">{formatCurrency(contractExpenses.reduce((s, e) => s + e.amount, 0))}</span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-muted">No expenses recorded yet.</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Link to={`/expenses?contract=${contract.id}`} className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          View Expenses
        </Link>
        <Link to="/invoices" className="px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors">
          Generate Invoice
        </Link>
        <Link to={`/documents?contract=${contract.id}`} className="px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors">
          View Documents
        </Link>
      </div>
    </div>
  );
}
