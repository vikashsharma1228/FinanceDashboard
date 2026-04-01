import React from 'react';

export default function TransactionTable({
  filteredTransactions, role, searchTerm, setSearchTerm,
  showAddForm, setShowAddForm, newTx, setNewTx, handleAddTransaction, handleDelete
}) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-lg font-black text-slate-900 dark:text-white">Transactions</h2>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input 
            type="text" placeholder="Search category..." value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:w-56 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl text-sm outline-none focus:ring-2 ring-blue-500 dark:text-white transition-all"
          />
          {role === 'Admin' && (
            <button onClick={() => setShowAddForm(!showAddForm)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-black hover:bg-blue-700 shadow-lg active:scale-95 transition-all">
              {showAddForm ? 'Cancel' : '+ Add New'}
            </button>
          )}
        </div>
      </div>

      {/* Admin Add Form */}
      {role === 'Admin' && showAddForm && (
        <form onSubmit={handleAddTransaction} className="mb-8 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl flex flex-wrap gap-4 items-end animate-in fade-in slide-in-from-top-4">
          <div className="flex-1 min-w-35">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Date</label>
            <input type="date" required value={newTx.date} onChange={(e) => setNewTx({...newTx, date: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-white text-sm" />
          </div>
          <div className="flex-1 min-w-35">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Category</label>
            <input type="text" required placeholder="Rent, Salary..." value={newTx.category} onChange={(e) => setNewTx({...newTx, category: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-white text-sm" />
          </div>
          <div className="w-32">
            <label className="block text-[10px] font-black text-slate-400 uppercase mb-2">Amount</label>
            <input type="number" required value={newTx.amount} onChange={(e) => setNewTx({...newTx, amount: e.target.value})} className="w-full p-2.5 rounded-xl border border-slate-200 dark:bg-slate-900 dark:border-slate-700 dark:text-white text-sm" />
          </div>
          <button type="submit" className="bg-emerald-600 text-white px-8 py-2.5 rounded-xl text-sm font-black hover:bg-emerald-700 shadow-md">Save</button>
        </form>
      )}

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest">
              <th className="py-4 px-4">Date</th>
              <th className="py-4 px-4">Category</th>
              <th className="py-4 px-4 text-right">Amount</th>
              {role === 'Admin' && <th className="py-4 px-4 text-right">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b border-slate-50 dark:border-slate-800/30 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-all">
                  <td className="py-5 px-4 text-sm text-slate-500 dark:text-slate-400">{tx.date}</td>
                  <td className="py-5 px-4">
                    <p className="text-sm font-black text-slate-800 dark:text-slate-200">{tx.category}</p>
                    <span className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-5 px-4 text-sm font-black text-right ${tx.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-100'}`}>
                    {tx.type === 'income' ? '+' : '-'}${Number(tx.amount).toLocaleString()}
                  </td>
                  {role === 'Admin' && (
                    <td className="py-5 px-4 text-right">
                      <button onClick={() => handleDelete(tx.id)} className="text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900/30 px-3 py-1.5 rounded-lg text-xs font-black transition-all">Delete</button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              // 🚀 PRO FEATURE: EMPTY STATE UI
              <tr>
                <td colSpan="4" className="py-24 text-center">
                  <div className="flex flex-col items-center justify-center opacity-40 grayscale">
                    <span className="text-6xl mb-4">📭</span>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-[4px]">No Transactions</p>
                    <p className="text-xs font-bold text-slate-400 mt-2">Add your first transaction to see the analysis.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}