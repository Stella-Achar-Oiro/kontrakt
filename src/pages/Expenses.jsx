import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, capitalize, getCategoryColor } from '../utils/format';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { Plus, CheckCircle, AlertTriangle, Filter } from 'lucide-react';

const categories = ['labor', 'materials', 'equipment', 'subcontractor', 'transport', 'other'];
const paymentMethods = ['M-Pesa', 'Bank Transfer', 'Cash', 'Cheque'];

function AddExpenseForm({ contracts, onSave, onCancel, defaultContractId }) {
  const [form, setForm] = useState({
    contractId: defaultContractId || '',
    date: new Date().toISOString().split('T')[0],
    category: '',
    description: '',
    supplier: '',
    amount: '',
    paymentMethod: 'M-Pesa',
    reference: '',
    receiptNumber: '',
    etims: false,
    etimsCode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const contract = contracts.find(c => c.id === Number(form.contractId));
    onSave({
      ...form,
      contractId: Number(form.contractId),
      contractName: contract?.name || '',
      amount: Number(form.amount),
      etimsCode: form.etims ? form.etimsCode : null,
    });
  };

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Contract</label>
        <select
          required
          value={form.contractId}
          onChange={e => update('contractId', e.target.value)}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="">Select Contract</option>
          {contracts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Date</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={e => update('date', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Category</label>
          <select
            required
            value={form.category}
            onChange={e => update('category', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          >
            <option value="">Select Category</option>
            {categories.map(c => <option key={c} value={c}>{capitalize(c)}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Description</label>
        <textarea
          required
          value={form.description}
          onChange={e => update('description', e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
          <input
            type="text"
            required
            value={form.supplier}
            onChange={e => update('supplier', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Amount (KES)</label>
          <input
            type="number"
            required
            min="1"
            value={form.amount}
            onChange={e => update('amount', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Payment Method</label>
        <div className="flex gap-3 flex-wrap">
          {paymentMethods.map(m => (
            <label key={m} className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={m}
                checked={form.paymentMethod === m}
                onChange={e => update('paymentMethod', e.target.value)}
                className="accent-primary"
              />
              {m}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Reference No.</label>
          <input
            type="text"
            value={form.reference}
            onChange={e => update('reference', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Receipt No.</label>
          <input
            type="text"
            value={form.receiptNumber}
            onChange={e => update('receiptNumber', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={form.etims}
            onChange={e => update('etims', e.target.checked)}
            className="accent-primary w-4 h-4"
          />
          <span className="font-medium text-text-primary">eTIMS Invoice Received</span>
        </label>
        {form.etims && (
          <input
            type="text"
            placeholder="eTIMS Code (optional)"
            value={form.etimsCode}
            onChange={e => update('etimsCode', e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          Save Expense
        </button>
      </div>
    </form>
  );
}

export default function Expenses() {
  const { contracts, expenses, addExpense } = useApp();
  const [searchParams] = useSearchParams();
  const contractFilter = searchParams.get('contract');

  const [showModal, setShowModal] = useState(false);
  const [filterContract, setFilterContract] = useState(contractFilter || 'all');
  const [filterCategory, setFilterCategory] = useState('all');

  const filtered = useMemo(() => {
    let result = [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date));
    if (filterContract !== 'all') result = result.filter(e => e.contractId === Number(filterContract));
    if (filterCategory !== 'all') result = result.filter(e => e.category === filterCategory);
    return result;
  }, [expenses, filterContract, filterCategory]);

  const totalAmount = filtered.reduce((s, e) => s + e.amount, 0);
  const etimsAmount = filtered.filter(e => e.etims).reduce((s, e) => s + e.amount, 0);
  const etimsPercent = totalAmount > 0 ? Math.round((etimsAmount / totalAmount) * 100) : 0;

  const handleSave = (expense) => {
    addExpense(expense);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Expenses</h1>
          <p className="text-text-secondary mt-1">Track and manage project expenses</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          <Plus className="w-4 h-4" /> New Expense
        </button>
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
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
        >
          <option value="all">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{capitalize(c)}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Date</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Contract</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Category</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Description</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Supplier</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Amount</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">Payment</th>
                <th className="text-center px-6 py-3 text-xs font-medium text-text-muted uppercase tracking-wider">eTIMS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(expense => (
                <tr key={expense.id} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm text-text-secondary whitespace-nowrap">{formatDate(expense.date)}</td>
                  <td className="px-6 py-3 text-sm font-medium text-text-primary whitespace-nowrap">{expense.contractName}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getCategoryColor(expense.category) }} />
                      <span className="text-sm text-text-secondary">{capitalize(expense.category)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-text-primary max-w-[200px] truncate">{expense.description}</td>
                  <td className="px-6 py-3 text-sm text-text-secondary">{expense.supplier}</td>
                  <td className="px-6 py-3 text-sm font-semibold text-text-primary text-right whitespace-nowrap">{formatCurrency(expense.amount)}</td>
                  <td className="px-6 py-3 text-center">
                    <Badge variant="default">{expense.paymentMethod}</Badge>
                  </td>
                  <td className="px-6 py-3 text-center">
                    {expense.etims ? (
                      <CheckCircle className="w-5 h-5 text-success mx-auto" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-warning mx-auto" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-border bg-slate-50 rounded-b-xl">
          <p className="text-sm text-text-secondary">
            Showing {filtered.length} expense{filtered.length !== 1 ? 's' : ''}
          </p>
          <div className="flex items-center gap-6">
            <div className="text-sm">
              <span className="text-text-muted">Total: </span>
              <span className="font-bold text-text-primary">{formatCurrency(totalAmount)}</span>
            </div>
            <div className="text-sm">
              <span className="text-text-muted">eTIMS Verified: </span>
              <span className="font-bold text-success">{formatCurrency(etimsAmount)} ({etimsPercent}%)</span>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Record New Expense">
        <AddExpenseForm
          contracts={contracts}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          defaultContractId={filterContract !== 'all' ? filterContract : ''}
        />
      </Modal>
    </div>
  );
}
