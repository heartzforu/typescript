import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";

const Expense: React.FC = () => {
  const { expenses, setExpenses } = useContext(AppContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    setDate(new Date().toISOString().split("T")[0]);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = { description, amount: parseFloat(amount), date };

      if (editIndex !== null) {
        const updatedExpenses = expenses.map((expense, index) =>
          index === editIndex ? newExpense : expense
        );
        setExpenses(updatedExpenses);
        setEditIndex(null);
      } else {
        setExpenses([...expenses, newExpense]);
      }

      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      navigate("/view"); // Navigate to View after adding/editing
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-4">
          Add Expense
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
            className="w-full bg-blue-500 text-white py-3 rounded-lg"
          >
            {editIndex !== null ? "Update Expense" : "Add Expense"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Expense;