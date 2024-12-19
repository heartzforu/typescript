import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdAutoGraph } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { AppContext } from "../App"; // Use the correct context

function ResponsiveNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Using the correct AppContext type directly
  const context = useContext(AppContext);

  // If context is undefined, throw an error or return null
  if (!context) {
    throw new Error(
      "AppContext is not available, ensure the AppProvider is wrapping this component."
    );
  }

  const { setIsLoggedIn, totalExpense } = context;

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <>
      {location.pathname !== "/register" && location.pathname !== "/" && (
        <nav className="fixed w-full bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <MdAutoGraph className="text-yellow-300 text-4xl mr-3" />
                <a
                  href="/dashboard"
                  className="text-white text-2xl font-bold hover:text-yellow-300 transition"
                >
                  Expense Tracker
                </a>
                <div>
                  {location.pathname === "/expense" ? (
                    <button
                      className="block w-full text-white text-left hover:text-yellow-300 font-medium py-3 mx-6"
                      onClick={() => navigate("/view")}
                    >
                      View
                    </button>
                  ) : (
                    <button
                      className="block w-full text-white text-left hover:text-yellow-300 font-medium py-3 mx-6"
                      onClick={() => navigate("/expense")}
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div >
                  <h3 className="text-md text-yellow-300 mx-2">
                    ${totalExpense.toFixed(2)}
                  </h3> 
                </div>
                <FaUserCircle className="text-white text-3xl hover:text-yellow-300 transition cursor-pointer mx-2" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-white text-left hover:text-yellow-300 font-medium py-2"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default ResponsiveNavbar;
