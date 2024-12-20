import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

const Expense: React.FC = () => {
  const { expenses, setExpenses, totalExpense } = useContext(AppContext)!;
  const location = useLocation();
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Set initial date to today
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Check if we're in editing mode and pre-fill the form with data
  useEffect(() => {
    const state = location.state as { editIndex: number };
    if (state && state.editIndex !== undefined) {
      const expenseToEdit = expenses[state.editIndex];
      setDescription(expenseToEdit.description);
      setAmount(expenseToEdit.amount.toString());
      setDate(expenseToEdit.date);
      setEditIndex(state.editIndex);
    }
  }, [location.state, expenses]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = { description, amount: parseFloat(amount), date };

      if (editIndex !== null) {
        // Update existing expense
        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? newExpense : expense
        );
        setExpenses(updatedExpenses);
      } else {
        // Add new expense
        setExpenses([...expenses, newExpense]);
      }

      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md my-10">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          {editIndex !== null ? "Edit Expense" : "Add Expense"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="w-full p-3 border rounded-lg"
          />
          <input
            placeholder="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-400"
          >
            {editIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>
      <div>
        <h3>You had a total expense of ${totalExpense.toFixed(2)}</h3>
        <div className="bg-white rounded-lg text-center w-full max-w-md my-4">
          <a
            className="text-xl font-bold text-blue-700 text-center mt-4 hover:text-blue-400"
            href="/view"
          >
            View list
          </a>
        </div>
      </div>
    </div>
  );
};

export default Expense;
