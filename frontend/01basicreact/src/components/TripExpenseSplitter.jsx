import { useState } from "react";

export default function TripExpenseSplitter() {
  const [names, setNames] = useState(Array(6).fill(""));
  const [expenses, setExpenses] = useState([]);
  
  const addExpense = () => {
    setExpenses([...expenses, { description: "", amount: "", excluded: [] }]);
  };

  const updateExpense = (index, field, value) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[index][field] = value;
    setExpenses(updatedExpenses);
  };

  const toggleExclusion = (expenseIndex, personIndex) => {
    const updatedExpenses = [...expenses];
    const { excluded } = updatedExpenses[expenseIndex];
    if (excluded.includes(personIndex)) {
      updatedExpenses[expenseIndex].excluded = excluded.filter(i => i !== personIndex);
    } else {
      updatedExpenses[expenseIndex].excluded.push(personIndex);
    }
    setExpenses(updatedExpenses);
  };

  const calculateSplits = () => {
    let totals = Array(6).fill(0);
    expenses.forEach(({ amount, excluded }) => {
      const validAmount = parseFloat(amount) || 0;
      const splitAmong = 6 - excluded.length;
      if (splitAmong > 0) {
        const share = validAmount / splitAmong;
        names.forEach((_, i) => {
          if (!excluded.includes(i)) totals[i] += share;
        });
      }
    });
    return totals;
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Trip Expense Splitter</h1>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {names.map((name, i) => (
          <input
            key={i}
            type="text"
            value={name}
            onChange={(e) => {
              const newNames = [...names];
              newNames[i] = e.target.value;
              setNames(newNames);
            }}
            placeholder={`Person ${i + 1}`}
            className="border p-2 rounded w-full"
          />
        ))}
      </div>
      <h2 className="text-lg font-semibold mb-2">Expenses</h2>
      {expenses.map((expense, i) => (
        <div key={i} className="border p-2 mb-2 rounded">
          <input
            type="text"
            placeholder="Expense description"
            value={expense.description}
            onChange={(e) => updateExpense(i, "description", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => updateExpense(i, "amount", e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          <div className="grid grid-cols-3 gap-1">
            {names.map((name, j) => (
              <button
                key={j}
                onClick={() => toggleExclusion(i, j)}
                className={`p-1 border rounded ${expense.excluded.includes(j) ? "bg-red-300" : "bg-green-300"}`}
              >
                {name || `Person ${j + 1}`}
              </button>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addExpense} className="bg-blue-500 text-white p-2 rounded mb-4">
        Add Expense
      </button>
      <h2 className="text-lg font-semibold mt-4">Splits</h2>
      <ul>
        {calculateSplits().map((amount, i) => (
          <li key={i} className="p-2 border rounded mb-1">
            {names[i] || `Person ${i + 1}`}: ₹{amount.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}
