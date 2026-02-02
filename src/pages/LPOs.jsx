import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatCurrency, formatDate, capitalize, getStatusBadgeVariant } from '../utils/format';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { Plus, Eye, Download, ClipboardList } from 'lucide-react';

function LpoPreview({ lpo }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="border border-border rounded-lg p-8 bg-white">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-bold text-text-primary">LOCAL PURCHASE ORDER</h2>
            <p className="text-sm text-text-secondary mt-1">{lpo.lpoNumber}</p>
          </div>
          <Badge variant={getStatusBadgeVariant(lpo.status)}>{capitalize(lpo.status)}</Badge>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2">From</p>
            <p className="text-sm font-semibold">Njuguna Construction Ltd</p>
            <p className="text-sm text-text-secondary">P.O. Box 12345, Nairobi</p>
            <p className="text-sm text-text-secondary">Tel: 0720 745 954</p>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider mb-2">To</p>
            <p className="text-sm font-semibold">{lpo.supplier}</p>
            <p className="text-sm text-text-secondary">Contact: {lpo.supplierContact}</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <p className="text-xs text-text-muted font-medium">Project</p>
            <p className="text-sm font-medium">{lpo.contractName}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">Issue Date</p>
            <p className="text-sm font-medium">{formatDate(lpo.issueDate)}</p>
          </div>
          <div>
            <p className="text-xs text-text-muted font-medium">Required By</p>
            <p className="text-sm font-medium">{formatDate(lpo.deliveryDate)}</p>
          </div>
        </div>

        <table className="w-full mb-6">
          <thead>
            <tr className="border-b-2 border-text-primary">
              <th className="text-left py-2 text-xs font-semibold text-text-primary uppercase">Item Description</th>
              <th className="text-center py-2 text-xs font-semibold text-text-primary uppercase w-16">Qty</th>
              <th className="text-right py-2 text-xs font-semibold text-text-primary uppercase">Unit Price</th>
              <th className="text-right py-2 text-xs font-semibold text-text-primary uppercase">Amount</th>
            </tr>
          </thead>
          <tbody>
            {lpo.items.map((item, i) => (
              <tr key={i} className="border-b border-border">
                <td className="py-3 text-sm">{item.description}</td>
                <td className="py-3 text-sm text-center">{item.quantity}</td>
                <td className="py-3 text-sm text-right">{formatCurrency(item.unitPrice)}</td>
                <td className="py-3 text-sm text-right font-medium">{formatCurrency(item.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-8">
          <div className="w-64 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Subtotal</span>
              <span className="font-medium">{formatCurrency(lpo.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">VAT (16%)</span>
              <span className="font-medium">{formatCurrency(lpo.vat)}</span>
            </div>
            <div className="flex justify-between text-base font-bold border-t-2 border-text-primary pt-2">
              <span>TOTAL</span>
              <span>{formatCurrency(lpo.total)}</span>
            </div>
          </div>
        </div>

        {lpo.notes && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-amber-800 font-medium uppercase mb-1">Notes</p>
            <p className="text-sm text-amber-900">{lpo.notes}</p>
          </div>
        )}

        <div className="border-t border-border pt-4">
          <p className="text-sm text-text-secondary">Authorized by: ___________________________</p>
          <p className="text-xs text-text-muted mt-2">Njuguna Construction Ltd</p>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <button className="px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors flex items-center gap-1.5">
          <Download className="w-4 h-4" /> Download PDF
        </button>
      </div>
    </div>
  );
}

function NewLpoForm({ contracts, onSave, onCancel }) {
  const [form, setForm] = useState({
    contractId: '',
    supplier: '',
    supplierContact: '',
    issueDate: new Date().toISOString().split('T')[0],
    deliveryDate: '',
    items: [{ description: '', quantity: 1, unitPrice: '', total: 0 }],
    notes: '',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const updateItem = (index, field, value) => {
    setForm(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      if (field === 'quantity' || field === 'unitPrice') {
        const qty = field === 'quantity' ? Number(value) : Number(items[index].quantity);
        const price = field === 'unitPrice' ? Number(value) : Number(items[index].unitPrice);
        items[index].total = qty * price;
      }
      return { ...prev, items };
    });
  };

  const addItem = () => {
    setForm(prev => ({ ...prev, items: [...prev.items, { description: '', quantity: 1, unitPrice: '', total: 0 }] }));
  };

  const removeItem = (index) => {
    if (form.items.length <= 1) return;
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== index) }));
  };

  const subtotal = form.items.reduce((s, i) => s + i.total, 0);
  const vat = Math.round(subtotal * 0.16);

  const handleSubmit = (e) => {
    e.preventDefault();
    const contract = contracts.find(c => c.id === Number(form.contractId));
    if (!contract) return;
    onSave({
      lpoNumber: `LPO-2026-${String(Date.now()).slice(-3)}`,
      contractId: contract.id,
      contractName: contract.name,
      supplier: form.supplier,
      supplierContact: form.supplierContact,
      issueDate: form.issueDate,
      deliveryDate: form.deliveryDate,
      items: form.items.map(i => ({ ...i, quantity: Number(i.quantity), unitPrice: Number(i.unitPrice), total: Number(i.total) })),
      subtotal,
      vat,
      total: subtotal + vat,
      status: 'pending',
      notes: form.notes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Contract</label>
        <select required value={form.contractId} onChange={e => update('contractId', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
          <option value="">Select Contract</option>
          {contracts.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Supplier</label>
          <input type="text" required value={form.supplier} onChange={e => update('supplier', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Supplier Contact</label>
          <input type="text" required value={form.supplierContact} onChange={e => update('supplierContact', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Issue Date</label>
          <input type="date" required value={form.issueDate} onChange={e => update('issueDate', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
        <div>
          <label className="block text-sm font-medium text-text-primary mb-1">Required By</label>
          <input type="date" required value={form.deliveryDate} onChange={e => update('deliveryDate', e.target.value)} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">Items</label>
        {form.items.map((item, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 mb-2">
            <input type="text" required placeholder="Description" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} className="col-span-5 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <input type="number" required min="1" placeholder="Qty" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} className="col-span-2 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <input type="number" required min="0" placeholder="Unit Price" value={item.unitPrice} onChange={e => updateItem(i, 'unitPrice', e.target.value)} className="col-span-3 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
            <div className="col-span-1 flex items-center justify-center text-xs font-medium text-text-secondary">{formatCurrency(item.total)}</div>
            <button type="button" onClick={() => removeItem(i)} className="col-span-1 text-danger hover:text-red-700 text-sm font-bold">X</button>
          </div>
        ))}
        <button type="button" onClick={addItem} className="text-sm text-primary hover:text-primary-hover font-medium mt-1">+ Add Item</button>
      </div>

      <div>
        <label className="block text-sm font-medium text-text-primary mb-1">Notes</label>
        <textarea value={form.notes} onChange={e => update('notes', e.target.value)} rows={2} className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none" placeholder="Delivery instructions, contact person, etc." />
      </div>

      <div className="text-right space-y-1 text-sm">
        <p>Subtotal: <span className="font-medium">{formatCurrency(subtotal)}</span></p>
        <p>VAT (16%): <span className="font-medium">{formatCurrency(vat)}</span></p>
        <p className="text-base font-bold">Total: {formatCurrency(subtotal + vat)}</p>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="button" onClick={onCancel} className="px-4 py-2 bg-white text-text-secondary text-sm font-medium rounded-lg border border-border hover:bg-slate-50 transition-colors">Cancel</button>
        <button type="submit" className="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">Create LPO</button>
      </div>
    </form>
  );
}

export default function LPOs() {
  const { contracts, lpos, addLpo, updateLpoStatus } = useApp();
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [previewLpo, setPreviewLpo] = useState(null);

  const statuses = ['all', 'pending', 'approved', 'received', 'cancelled'];
  const filtered = filter === 'all' ? lpos : lpos.filter(l => l.status === filter);

  const handleSave = (lpo) => {
    addLpo(lpo);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Local Purchase Orders</h1>
          <p className="text-text-secondary mt-1">Create and manage purchase orders for suppliers</p>
        </div>
        <button onClick={() => setShowModal(true)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <Plus className="w-4 h-4" /> New LPO
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === s ? 'bg-primary text-white' : 'bg-white text-text-secondary border border-border hover:bg-slate-50'}`}>
            {capitalize(s)}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filtered.map(lpo => (
          <div key={lpo.id} className="bg-white rounded-xl border border-border p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary">{lpo.lpoNumber}</h3>
                  <p className="text-sm text-text-secondary">{lpo.contractName}</p>
                </div>
              </div>
              <Badge variant={getStatusBadgeVariant(lpo.status)}>{capitalize(lpo.status)}</Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-text-muted">Supplier</p>
                <p className="text-sm font-medium">{lpo.supplier}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Issue Date</p>
                <p className="text-sm font-medium">{formatDate(lpo.issueDate)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Delivery Date</p>
                <p className="text-sm font-medium">{formatDate(lpo.deliveryDate)}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted">Amount</p>
                <p className="text-sm font-bold">{formatCurrency(lpo.total)}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setPreviewLpo(lpo)} className="px-3 py-1.5 text-sm font-medium text-primary border border-primary/20 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" /> View
              </button>
              {lpo.status === 'pending' && (
                <>
                  <button onClick={() => updateLpoStatus(lpo.id, 'approved')} className="px-3 py-1.5 text-sm font-medium text-success border border-success/20 rounded-lg hover:bg-emerald-50 transition-colors">
                    Approve
                  </button>
                  <button onClick={() => updateLpoStatus(lpo.id, 'cancelled')} className="px-3 py-1.5 text-sm font-medium text-danger border border-danger/20 rounded-lg hover:bg-red-50 transition-colors">
                    Cancel
                  </button>
                </>
              )}
              {lpo.status === 'approved' && (
                <button onClick={() => updateLpoStatus(lpo.id, 'received')} className="px-3 py-1.5 text-sm font-medium text-info border border-info/20 rounded-lg hover:bg-blue-50 transition-colors">
                  Mark Received
                </button>
              )}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-text-muted">No LPOs found.</div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Create New LPO" wide>
        <NewLpoForm contracts={contracts} onSave={handleSave} onCancel={() => setShowModal(false)} />
      </Modal>

      <Modal isOpen={!!previewLpo} onClose={() => setPreviewLpo(null)} title="LPO Preview" wide>
        {previewLpo && <LpoPreview lpo={previewLpo} />}
      </Modal>
    </div>
  );
}
