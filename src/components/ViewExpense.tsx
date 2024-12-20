import React, { useContext } from "react";
import { AppContext } from "../App";

const ViewExpense: React.FC = () => {
  const { expenses, editExpense, deleteExpense, totalExpense } =
    useContext(AppContext)!;

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gray-100">
      {(expenses.length !== 0)?(<h2 className="text-2xl font-bold text-gray-800 text-center mb-6 my-10">
        Expense List
      </h2>):(<h2 className="text-2xl font-bold text-gray-800 text-center mb-6 my-10 ">
        List is Empty
      </h2>)}
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md ">
        {expenses.length > 0 ? (
          <ul className="space-y-4">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border-b border-gray-300 rounded-md hover:bg-gray-50"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {expense.description}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${expense.amount.toFixed(2)} on{" "}
                    {new Date(expense.date).toISOString().split("T")[0]}
                  </p>
                </div>
                <div className="flex space-x-4">
                  <button
                    onClick={() => editExpense(index)}
                    className="text-white font-medium hover:bg-yellow-200 bg-yellow-500 rounded w-12"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpense(index)}
                    className="text-white font-medium hover:bg-red-300 bg-red-500 rounded w-16"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No expenses to show.</p>
        )}
        {expenses.length > 0 && (
          <div className="mt-6 border-t border-gray-300 pt-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Total Expense: ${totalExpense.toFixed(2)}
            </h3>
          </div>
        )}
      </div>
      {/* Navigating to Add expense page */}
      <div className="rounded-lg text-center w-full max-w-md my-4">
        <a
          className="text-xl font-bold text-blue-700 text-center mt-4 hover:text-blue-400"
          href="/expense"
        >
          Add more
        </a>
      </div>
    </div>
  );
};

export default ViewExpense;
