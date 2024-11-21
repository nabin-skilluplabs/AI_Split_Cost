import React, { useState } from 'react';
import { Header } from './components/Header';
import { FriendsList } from './components/FriendsList';
import { ExpensesList } from './components/ExpensesList';
import { ExpenseModal } from './components/ExpenseModal';
import { SettleModal } from './components/SettleModal';
import { ThemeToggle } from './components/ThemeToggle';
import { calculateSettlements } from './utils/settlements';
import { Friend, Expense } from './types';

function App() {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newFriendName, setNewFriendName] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [showSettleModal, setShowSettleModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    paidBy: '',
    splitWith: [] as string[],
  });

  const addFriend = () => {
    if (newFriendName.trim()) {
      setFriends([...friends, { id: crypto.randomUUID(), name: newFriendName.trim() }]);
      setNewFriendName('');
    }
  };

  const addExpense = () => {
    if (newExpense.description && newExpense.amount && newExpense.paidBy && newExpense.splitWith.length > 0) {
      setExpenses([
        ...expenses,
        {
          id: crypto.randomUUID(),
          description: newExpense.description,
          amount: parseFloat(newExpense.amount),
          paidBy: newExpense.paidBy,
          splitWith: newExpense.splitWith,
        },
      ]);
      setNewExpense({ description: '', amount: '', paidBy: '', splitWith: [] });
      setShowExpenseForm(false);
    }
  };

  const calculateBalances = () => {
    const balances: { [key: string]: number } = {};
    friends.forEach(friend => balances[friend.id] = 0);

    expenses.forEach(expense => {
      const payer = expense.paidBy;
      const splitAmount = expense.amount / expense.splitWith.length;
      
      balances[payer] += expense.amount;
      expense.splitWith.forEach(personId => {
        balances[personId] -= splitAmount;
      });
    });

    return balances;
  };

  const handleSettle = () => {
    setExpenses([]);
    setShowSettleModal(false);
  };

  const balances = calculateBalances();
  const settlements = calculateSettlements(friends, { ...balances });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 p-6 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-colors duration-200">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <Header onAddExpense={() => setShowExpenseForm(true)} />
          
          <FriendsList
            friends={friends}
            balances={balances}
            newFriendName={newFriendName}
            onNewFriendNameChange={setNewFriendName}
            onAddFriend={addFriend}
          />

          <ExpensesList
            expenses={expenses}
            friends={friends}
            onDeleteExpense={(id) => setExpenses(expenses.filter(e => e.id !== id))}
          />

          {friends.length > 0 && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowSettleModal(true)}
                className="bg-green-600 dark:bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors text-lg font-semibold"
              >
                Settle Now
              </button>
            </div>
          )}
        </div>

        <ExpenseModal
          show={showExpenseForm}
          friends={friends}
          newExpense={newExpense}
          onClose={() => setShowExpenseForm(false)}
          onAdd={addExpense}
          onChange={setNewExpense}
        />

        <SettleModal
          show={showSettleModal}
          onClose={() => setShowSettleModal(false)}
          onSettle={handleSettle}
          settlements={settlements}
        />
      </div>
    </div>
  );
}

export default App;