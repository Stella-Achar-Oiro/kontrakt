import { useApp } from '../context/AppContext';
import { formatCurrency, getCategoryColor, capitalize, getStatusBadgeVariant, formatShortDate } from '../utils/format';
import Badge from '../components/Badge';
import { Link } from 'react-router-dom';
import { TrendingUp, Briefcase, DollarSign, PieChart, ArrowRight, CheckCircle, AlertTriangle, Clock } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

function StatCard({ icon: Icon, label, value, subtext, color = 'primary' }) {
  const colors = {
    primary: 'bg-blue-50 text-primary',
    success: 'bg-emerald-50 text-success',
    warning: 'bg-amber-50 text-warning',
    danger: 'bg-red-50 text-danger',
  };
  return (
    <div className="bg-white rounded-xl border border-border p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-text-secondary font-medium">{label}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {subtext && <p className="text-xs text-text-muted mt-0.5">{subtext}</p>}
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { contracts, expenses, invoices, lpos } = useApp();

  const totalBudget = contracts.reduce((s, c) => s + c.budget, 0);
  const totalSpent = contracts.reduce((s, c) => s + c.spent, 0);
  const activeContracts = contracts.filter(c => c.status === 'active').length;
  const overBudget = contracts.filter(c => c.budgetStatus === 'over-budget').length;

  const categoryTotals = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({ name: capitalize(name), value }));

  const barData = contracts.map(c => ({
    name: c.name.length > 20 ? c.name.substring(0, 18) + '...' : c.name,
    Budget: c.budget,
    Spent: c.spent,
  }));

  const recentExpenses = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary mt-1">Overview of your construction contracts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <StatCard icon={Briefcase} label="Active Contracts" value={activeContracts} subtext={`${contracts.length} total`} color="primary" />
        <StatCard icon={DollarSign} label="Total Budget" value={formatCurrency(totalBudget)} color="success" />
        <StatCard icon={TrendingUp} label="Total Spent" value={formatCurrency(totalSpent)} subtext={`${Math.round((totalSpent / totalBudget) * 100)}% utilized`} color="warning" />
        <StatCard icon={PieChart} label="Budget Health" value={overBudget > 0 ? `${overBudget} Over Budget` : 'All On Track'} color={overBudget > 0 ? 'danger' : 'success'} />
      </div>

      <div className="bg-white rounded-xl border border-border mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Contract Overview</h2>
          <Link to="/contracts" className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Contract</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Client</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Budget</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Spent</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Progress</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Days Left</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {contracts.map(contract => (
                <tr key={contract.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <Link to={`/contracts/${contract.id}`} className="font-medium text-text-primary hover:text-primary">{contract.name}</Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{contract.client}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium">{formatCurrency(contract.budget)}</td>
                  <td className="px-6 py-4 text-sm text-right font-medium">{formatCurrency(contract.spent)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: `${contract.progress}%` }} />
                      </div>
                      <span className="text-xs text-text-secondary font-medium">{contract.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={getStatusBadgeVariant(contract.budgetStatus)}>{capitalize(contract.budgetStatus)}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-right text-text-secondary">{contract.daysRemaining} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="100%" height={280}>
            <RechartsPie>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={2}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={getCategoryColor(entry.name.toLowerCase())} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
            </RechartsPie>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-border p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Budget vs Actual</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Bar dataKey="Budget" fill="#0369A1" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Spent" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Recent Expenses</h2>
          <Link to="/expenses" className="text-sm text-primary hover:text-primary-hover font-medium flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentExpenses.map(expense => (
            <div key={expense.id} className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(expense.category) }} />
                <div>
                  <p className="text-sm font-medium text-text-primary">{expense.description}</p>
                  <p className="text-xs text-text-muted">{expense.contractName} &middot; {formatShortDate(expense.date)}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-text-primary">{formatCurrency(expense.amount)}</span>
                {expense.etims ? (
                  <CheckCircle className="w-4 h-4 text-success" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-warning" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
