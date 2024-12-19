import React, { useContext } from "react";
import { AppContext } from "../App";

const ViewExpense: React.FC = () => {
  const { expenses, editExpense, deleteExpense, totalExpense } = useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h2 className="text-2xl font-bold text-gray-700 text-center my-10">Expense List</h2>
      <div className="w-full max-w-2xl">
        {expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.map((expense, index) => (
              <li key={index} className="flex justify-between items-center bg-white p-4 rounded-lg">
                <div>
                  <p className="text-lg font-semibold">{expense.description}</p>
                  <p>${expense.amount.toFixed(2)} on {new Date(expense.date).toISOString().split("T")[0]}</p>
                </div>
                <button onClick={() => editExpense(index)} className="text-yellow text-right hover:text-yellow-300 font-medium rounded-lg">Edit</button>
                <button onClick={() => deleteExpense(index)} className="text-yellow text-left hover:text-red-500 font-medium rounded-lg">Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center">No expenses to show.</p>
        )}
        {expenses.length > 0 && (
          <div className="mt-4">
            <h3>Total Expense: ${totalExpense.toFixed(2)}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewExpense;