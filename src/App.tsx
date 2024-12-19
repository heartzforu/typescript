import React, { useEffect, useState, createContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Expense from "./components/Expense";
import ViewExpense from "./components/ViewExpense";
import Login from "./components/Login";
import ResponsiveAppBar from "./components/AppBar";

interface Expenses {
  description: string;
  amount: number;
  date: string;
}

interface AppContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  expenses: Expenses[];
  setExpenses: React.Dispatch<React.SetStateAction<Expenses[]>>;
  editExpense: (index: number) => void;
  deleteExpense: (index: number) => void;
  totalExpense: number;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expenses[]>(() => {
    const storedExpenses = localStorage.getItem("expenses");
    return storedExpenses ? JSON.parse(storedExpenses) : [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const editExpense = (index: number): void => {
    navigate("/expense", { state: { editIndex: index } });
  };

  const deleteExpense = (index: number): void => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
    }
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        expenses,
        setExpenses,
        editExpense,
        deleteExpense,
        totalExpense,
      }}
    >
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense" element={<Expense />} />
        <Route path="/view" element={<ViewExpense />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
