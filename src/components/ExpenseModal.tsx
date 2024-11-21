import React from 'react';
import { Friend } from '../types';

interface ExpenseModalProps {
  show: boolean;
  friends: Friend[];
  newExpense: {
    description: string;
    amount: string;
    paidBy: string;
    splitWith: string[];
  };
  onClose: () => void;
  onAdd: () => void;
  onChange: (expense: typeof newExpense) => void;
}

export function ExpenseModal({
  show,
  friends,
  newExpense,
  onClose,
  onAdd,
  onChange,
}: ExpenseModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Add New Expense</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
            <input
              type="text"
              value={newExpense.description}
              onChange={(e) => onChange({...newExpense, description: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Amount</label>
            <input
              type="number"
              value={newExpense.amount}
              onChange={(e) => onChange({...newExpense, amount: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Paid By</label>
            <select
              value={newExpense.paidBy}
              onChange={(e) => onChange({...newExpense, paidBy: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Select friend</option>
              {friends.map(friend => (
                <option key={friend.id} value={friend.id}>{friend.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Split With</label>
            <div className="space-y-2">
              {friends.map(friend => (
                <label key={friend.id} className="flex items-center text-gray-900 dark:text-white">
                  <input
                    type="checkbox"
                    checked={newExpense.splitWith.includes(friend.id)}
                    onChange={(e) => {
                      const newSplitWith = e.target.checked
                        ? [...newExpense.splitWith, friend.id]
                        : newExpense.splitWith.filter(id => id !== friend.id);
                      onChange({...newExpense, splitWith: newSplitWith});
                    }}
                    className="mr-2"
                  />
                  {friend.name}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={onAdd}
            className="flex-1 bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
          >
            Add Expense
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}