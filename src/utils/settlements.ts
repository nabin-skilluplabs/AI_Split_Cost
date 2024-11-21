import { Friend } from '../types';

interface Balance {
  [key: string]: number;
}

export function calculateSettlements(friends: Friend[], balances: Balance) {
  const settlements: { from: Friend, to: Friend, amount: number }[] = [];
  const debtors = friends.filter(f => balances[f.id] < 0)
    .sort((a, b) => balances[a.id] - balances[b.id]);
  const creditors = friends.filter(f => balances[f.id] > 0)
    .sort((a, b) => balances[b.id] - balances[a.id]);

  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    
    const debtAmount = Math.abs(balances[debtor.id]);
    const creditAmount = balances[creditor.id];
    const settleAmount = Math.min(debtAmount, creditAmount);
    
    if (settleAmount > 0.01) { // Avoid tiny transactions
      settlements.push({
        from: debtor,
        to: creditor,
        amount: Number(settleAmount.toFixed(2))
      });
    }

    balances[debtor.id] += settleAmount;
    balances[creditor.id] -= settleAmount;

    if (Math.abs(balances[debtor.id]) < 0.01) i++;
    if (Math.abs(balances[creditor.id]) < 0.01) j++;
  }

  return settlements;
}