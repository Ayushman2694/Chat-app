/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, Settings, User, Menu } from "lucide-react";

function Navbar() {
  const { logout, authUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate()

  return (
    <header className="flex flex-row w-full justify-between bg-slate-900 h-14 items-center px-4 z-50">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex flex-row justify-center items-center transition-colors"
        >
          <h1 className="text-2xl text-white font-semibold">Convo</h1>
          <h1 className="text-2xl bg-orange-600 text-black font-semibold rounded-md ml-1 px-1 shadow-sm">
            hub
          </h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden lg:flex items-center gap-2">

        {authUser && (
          <>
          <Link
          title="settings"
          to="/settings"
          className="btn btn-sm bg-slate-700 gap-2 transition-colors flex items-center"
        >
          <Settings className="size-4" />
          <span className="hidden lg:inline">Settings</span>
        </Link>
            <Link
              title="profile"
              to="/profile"
              className="btn btn-sm bg-slate-700 gap-2 transition-colors"
            >
              <User className="size-4" />
              <span className="hidden lg:inline">Profile</span>
            </Link>
            <button
              onClick={() =>{ logout()
                navigate("/")}
              }
              title="logout"
              className="btn btn-sm bg-slate-700 gap-2 transition-colors"
              type="button"
            >
              <LogOut className="size-4" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </>
        )}
      </div>

      {/* Hamburger Menu */}
      <div className="lg:hidden flex items-center">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="btn btn-sm bg-slate-700 p-2 rounded-md"
          aria-label="Toggle menu"
        >
          <Menu className="size-5 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-14 right-4 bg-slate-800 shadow-lg rounded-lg p-4 z-50">
          <nav className="flex flex-col items-start gap-2">
            <Link
              title="settings"
              to="/settings"
              className="btn btn-sm bg-slate-700 w-full text-left"
              onClick={() => setIsMenuOpen(false)}
            >
              <Settings className="size-4 inline" /> Settings
            </Link>

            {authUser && (
              <>
                <Link
                  title="profile"
                  to="/profile"
                  className="btn btn-sm bg-slate-700 w-full text-left"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="size-4 inline" /> Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/")
                    setIsMenuOpen(false);
                  }}
                  title="logout"
                  className="btn btn-sm bg-slate-700 w-full text-left"
                  type="button"
                >
                  <LogOut className="size-4 inline" /> Logout
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
