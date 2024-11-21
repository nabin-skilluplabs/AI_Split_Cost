import React from 'react';
import { Receipt, Trash2 } from 'lucide-react';
import { Expense, Friend } from '../types';

interface ExpensesListProps {
  expenses: Expense[];
  friends: Friend[];
  onDeleteExpense: (id: string) => void;
}

export function ExpensesList({ expenses, friends, onDeleteExpense }: ExpensesListProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
        <Receipt className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Expenses
      </h2>
      <div className="space-y-4">
        {expenses.map(expense => (
          <div
            key={expense.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{expense.description}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Paid by: {friends.find(f => f.id === expense.paidBy)?.name}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</span>
              <button
                onClick={() => onDeleteExpense(expense.id)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}