import React from 'react';
import { Users } from 'lucide-react';

export function FriendsList({
  friends,
  balances,
  newFriendName,
  onNewFriendNameChange,
  onAddFriend,
}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-white">
        <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Friends
      </h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          value={newFriendName}
          onChange={(e) => onNewFriendNameChange(e.target.value)}
          placeholder="Enter friend's name"
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
        <button
          onClick={onAddFriend}
          className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors"
        >
          Add Friend
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {friends.map(friend => (
          <div
            key={friend.id}
            className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex items-center justify-between"
          >
            <span className="font-medium text-gray-900 dark:text-white">{friend.name}</span>
            <span className={`font-semibold ${
              balances[friend.id] > 0
                ? 'text-green-600 dark:text-green-400'
                : balances[friend.id] < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              ${balances[friend.id].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}