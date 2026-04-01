import React from 'react';

export default function Insights({ highestCategory, balance, totalIncome, totalExpense }) {
  // ✅ FIX: NaN% Bug Handle Kiya (Edge Case: income = 0)
  const savingsRate = totalIncome > 0 
    ? ((balance / totalIncome) * 100).toFixed(1) 
    : "0.0";
  
  const expenseRatio = totalIncome > 0 
    ? ((totalExpense / totalIncome) * 100).toFixed(0) 
    : "0";

  // ✅ SMART INSIGHT: Data-driven messages
  const getAnalysis = () => {
    if (totalIncome === 0 && totalExpense === 0) return "Start adding transactions to see analysis.";
    if (totalIncome === 0) return "No income recorded yet. Monitor your spending!";
    if (expenseRatio > 80) return `Alert: You've spent ${expenseRatio}% of your budget!`;
    if (expenseRatio > 50) return `Careful: Expenses are ${expenseRatio}% of income.`;
    return `Great! You've saved ${savingsRate}% of your earnings.`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-5 transition-all h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-black text-slate-800 dark:text-white">Smart Insights</h2>
        <span className="text-[10px] bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 px-2 py-1 rounded-md font-bold uppercase tracking-tighter">Live Analysis</span>
      </div>
      
      <div className="space-y-4">
        {/* Savings Rate Card */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500">
          <p className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">Savings Rate</p>
          <p className="text-xl font-black dark:text-white">{savingsRate}%</p>
        </div>

        {/* 🚀 FIXED & SMART ANALYSIS LINE */}
        <div className={`p-4 rounded-xl border-l-4 ${Number(expenseRatio) > 80 ? 'bg-rose-50 border-rose-500' : 'bg-emerald-50 border-emerald-500'} dark:bg-slate-800/50`}>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Trend Analysis</p>
          <p className={`text-sm font-bold mt-1 ${Number(expenseRatio) > 80 ? 'text-rose-700 dark:text-rose-400' : 'text-emerald-700 dark:text-emerald-400'}`}>
            {getAnalysis()}
          </p>
        </div>

        {/* Top Spending Card */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border-l-4 border-slate-400">
          <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Top Category</p>
          <p className="text-lg font-black dark:text-white truncate">{highestCategory[0] || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}