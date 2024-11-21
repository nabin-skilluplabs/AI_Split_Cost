import React from 'react';
import { Calculator, PlusCircle } from 'lucide-react';

export function Header({ onAddExpense }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
        <Calculator className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
        Split Cost
      </h1>
      <button
        onClick={onAddExpense}
        className="bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
      >
        <PlusCircle className="w-5 h-5" />
        Add Expense
      </button>
    </div>
  );
}