import React from 'react';

export default function SummaryCards({ balance, totalIncome, totalExpense }) {
  const cards = [
    { title: 'Total Balance', value: balance, color: 'border-t-blue-500', text: 'text-slate-900 dark:text-white' },
    { title: 'Total Income', value: totalIncome, color: 'border-t-emerald-500', text: 'text-emerald-600 dark:text-emerald-400' },
    { title: 'Total Expenses', value: totalExpense, color: 'border-t-rose-500', text: 'text-rose-600 dark:text-rose-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <div key={i} className={`bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 border-t-4 ${card.color} transition-all`}>
          <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[2px]">{card.title}</h3>
          <p className={`text-3xl font-black mt-2 ${card.text}`}>${card.value.toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}