import { createContext, useContext, useState, useEffect } from 'react';
import { contracts as defaultContracts, expenses as defaultExpenses, invoices as defaultInvoices, lpos as defaultLpos, documents as defaultDocuments } from '../data/mockData';

const AppContext = createContext();

function loadFromStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [contracts, setContracts] = useState(() => loadFromStorage('bt_contracts', defaultContracts));
  const [expenses, setExpenses] = useState(() => loadFromStorage('bt_expenses', defaultExpenses));
  const [invoices, setInvoices] = useState(() => loadFromStorage('bt_invoices', defaultInvoices));
  const [lpos, setLpos] = useState(() => loadFromStorage('bt_lpos', defaultLpos));
  const [documents, setDocuments] = useState(() => loadFromStorage('bt_documents', defaultDocuments));

  useEffect(() => { localStorage.setItem('bt_contracts', JSON.stringify(contracts)); }, [contracts]);
  useEffect(() => { localStorage.setItem('bt_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('bt_invoices', JSON.stringify(invoices)); }, [invoices]);
  useEffect(() => { localStorage.setItem('bt_lpos', JSON.stringify(lpos)); }, [lpos]);
  useEffect(() => { localStorage.setItem('bt_documents', JSON.stringify(documents)); }, [documents]);

  const addExpense = (expense) => {
    const newExpense = { ...expense, id: Math.max(0, ...expenses.map(e => e.id)) + 1 };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const addInvoice = (invoice) => {
    const newInvoice = { ...invoice, id: Math.max(0, ...invoices.map(i => i.id)) + 1 };
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const addLpo = (lpo) => {
    const newLpo = { ...lpo, id: Math.max(0, ...lpos.map(l => l.id)) + 1 };
    setLpos(prev => [newLpo, ...prev]);
  };

  const updateInvoiceStatus = (id, status, paymentDate = null) => {
    setInvoices(prev => prev.map(inv =>
      inv.id === id ? { ...inv, status, paymentDate } : inv
    ));
  };

  const updateLpoStatus = (id, status) => {
    setLpos(prev => prev.map(lpo =>
      lpo.id === id ? { ...lpo, status } : lpo
    ));
  };

  const resetData = () => {
    setContracts(defaultContracts);
    setExpenses(defaultExpenses);
    setInvoices(defaultInvoices);
    setLpos(defaultLpos);
    setDocuments(defaultDocuments);
  };

  const value = {
    contracts,
    expenses,
    invoices,
    lpos,
    documents,
    addExpense,
    addInvoice,
    addLpo,
    updateInvoiceStatus,
    updateLpoStatus,
    resetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
