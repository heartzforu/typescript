import React, { useEffect, useState, createContext, ReactNode } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Expenses from "./components/Expense";
import View from "./components/ViewExpense";
import Login from './components/Login';
import ResponsiveAppBar from "./components/AppBar";

// Interfaces for the context
interface Expense {
  description: string;
  amount: number;
  date: string;
}

interface AppContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  expenses: Expense[];
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>;
  editExpense: (index: number) => Expense;
  deleteExpense: (index: number) => void;
  totalExpense: number;
}

// Create Context
export const AppContext = createContext<AppContextProps>({} as AppContextProps);

interface AppProviderProps {
  children: ReactNode;
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      navigate('/expense');
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      const storedExpenses = JSON.parse(localStorage.getItem('expenses') || "[]");
      setExpenses(storedExpenses);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  }, [expenses, isLoggedIn]);

  const editExpense = (index: number): Expense => {
    return expenses[index];
    navigate('/expense')
  };

  const deleteExpense = (index: number): void => {
    const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
    if (isConfirmed) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }
  };

  const totalExpense = expenses.reduce((total, expense) => total + expense.amount, 0);

  return (
    <AppContext.Provider value={{
      isLoggedIn,
      setIsLoggedIn,
      expenses,
      setExpenses,
      editExpense,
      deleteExpense,
      totalExpense
    }}>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/expense" element={<Expenses />} />
        <Route path="/view" element={<View />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;