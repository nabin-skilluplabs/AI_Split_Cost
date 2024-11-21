import React from 'react';
import { Friend } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface Settlement {
  from: Friend;
  to: Friend;
  amount: number;
}

interface SettleModalProps {
  show: boolean;
  onClose: () => void;
  onSettle: () => void;
  settlements: Settlement[];
}

export function SettleModal({ show, onClose, onSettle, settlements }: SettleModalProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Settlement Plan</h2>
        <div className="space-y-4">
          {settlements.length === 0 ? (
            <div className="text-center py-6">
              <CheckCircle2 className="w-16 h-16 text-green-500 dark:text-green-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg">All balances are settled!</p>
            </div>
          ) : (
            settlements.map((settlement, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-lg">
                  <span className="font-medium text-red-600 dark:text-red-400">{settlement.from.name}</span>
                  {' pays '}
                  <span className="font-medium text-green-600 dark:text-green-400">{settlement.to.name}</span>
                </p>
                <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                  ${settlement.amount.toFixed(2)}
                </p>
              </div>
            ))
          )}
        </div>
        <div className="mt-6 space-y-3">
          {settlements.length > 0 && (
            <button
              onClick={onSettle}
              className="w-full bg-green-600 dark:bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Settle & Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}