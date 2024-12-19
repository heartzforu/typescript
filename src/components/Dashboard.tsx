import { useContext } from "react";
import { AppContext } from "../App";

function Dashboard() {
  const { totalExpense } = useContext(AppContext)!;

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center">
      <div className="bg-white bg-opacity-80 p-10 rounded-lg shadow-xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to Your Dashboard!
        </h1>
        <p className="text-lg text-gray-600">
          Track and manage your expenses efficiently.
        </p>
        <h3 className="text-lg font-bold text-gray-700 my-4">
          You had a Total Expense of ${totalExpense.toFixed(2)}
        </h3>
        <a
          href="/expense"
          className="text-blue-700 text-xl font-bold hover:text-blue-300 transition"
        >
          Add more Expense
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
