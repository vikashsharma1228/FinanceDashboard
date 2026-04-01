import React from 'react';

export default function SpendingChart({ totalExpense, balanceTrend }) {
  // Sabse bada balance nikalna taaki bars scale ho sakein
  const maxBal = Math.max(...balanceTrend.map(d => d.bal), 1);

  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all">
        <h2 className="text-lg font-black text-slate-800 dark:text-white mb-2">Balance Trend</h2>
        <p className="text-xs text-slate-400 mb-6 font-bold uppercase tracking-widest">Last 7 Transactions</p>
        
        <div className="flex items-end h-48 gap-3 mt-4 pt-8">
          {balanceTrend.length > 0 ? (
            balanceTrend.map((data, i) => {
              const height = (data.bal / maxBal) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end items-center group relative h-full">
                  {/* Tooltip */}
                  <div className="absolute -top-10 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded shadow-xl z-20">
                    ${data.bal.toLocaleString()}
                  </div>
                  {/* Bar with Dynamic Color */}
                  <div 
                    className={`w-full rounded-t-lg transition-all duration-700 cursor-pointer ${data.bal > 0 ? 'bg-blue-500 hover:bg-blue-400' : 'bg-rose-500 hover:bg-rose-400'}`}
                    style={{ height: `${Math.max(8, height)}%` }}
                  ></div>
                  <span className="text-[10px] text-slate-400 mt-3 font-black uppercase">{data.day}</span>
                </div>
              );
            })
          ) : (
            <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 font-bold uppercase">No Trend Data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}