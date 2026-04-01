import React, { useState, useMemo, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import { initialTransactions } from './data/mockData';
import SummaryCards from './components/SummaryCards';
import SpendingChart from './components/SpendingChart';
import Insights from './components/Insights';
import TransactionTable from './components/TransactionTable';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finance_dashboard_data');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  const [role, setRole] = useState('Viewer');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTx, setNewTx] = useState({ date: new Date().toISOString().split('T')[0], category: '', amount: '', type: 'expense' });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) html.classList.add('dark'); else html.classList.remove('dark');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('finance_dashboard_data', JSON.stringify(transactions));
  }, [transactions]);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    return transactions.reduce((acc, curr) => {
      if (curr.type === 'income') acc.totalIncome += Number(curr.amount);
      if (curr.type === 'expense') acc.totalExpense += Number(curr.amount);
      acc.balance = acc.totalIncome - acc.totalExpense;
      return acc;
    }, { totalIncome: 0, totalExpense: 0, balance: 0 });
  }, [transactions]);

  const balanceTrend = useMemo(() => {
    let runningBalance = 0;
    const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    const trend = [];
    sorted.forEach(tx => {
      runningBalance += tx.type === 'income' ? Number(tx.amount) : -Number(tx.amount);
      trend.push({ day: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), bal: runningBalance });
    });
    return trend.slice(-7);
  }, [transactions]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setTransactions([{ id: Date.now(), ...newTx, amount: Number(newTx.amount) }, ...transactions]);
    setShowAddForm(false);
    setNewTx({ date: new Date().toISOString().split('T')[0], category: '', amount: '', type: 'expense' });
    toast.success('Added!');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(t => t.id !== id));
    toast.error('Removed!');
  };

  const filtered = transactions.filter(t => t.category.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 p-4 md:p-8">
      <Toaster position="bottom-center" />
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* --- STICKY HEADER --- */}
        <header className="sticky top-0 z-50 flex flex-col md:flex-row justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-5 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-5">
            <button 
              onClick={() => setDarkMode(!darkMode)} 
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shadow-inner"
            >
              <span className="text-2xl">{darkMode ? '☀️' : '🌙'}</span>
            </button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white truncate">Finance Dash</h1>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{role} MODE</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <select 
              value={role} onChange={(e) => {setRole(e.target.value); setShowAddForm(false);}} 
              className="bg-transparent border-none px-4 py-1.5 text-xs font-black text-slate-700 dark:text-slate-200 outline-none cursor-pointer"
            >
              <option value="Viewer">Viewer Mode</option>
              <option value="Admin">Admin Mode</option>
            </select>
          </div>
        </header>

        <SummaryCards balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <SpendingChart totalExpense={totalExpense} balanceTrend={balanceTrend} />
          <Insights highestCategory={filtered[0] ? [filtered[0].category, filtered[0].amount] : ['None', 0]} balance={balance} totalIncome={totalIncome} />
        </div>

        <TransactionTable 
          filteredTransactions={filtered} role={role} searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
          showAddForm={showAddForm} setShowAddForm={setShowAddForm} newTx={newTx} setNewTx={setNewTx} 
          handleAddTransaction={handleAddTransaction} handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}