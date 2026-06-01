import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import SideBar from "../../SideBar/SideBar";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function MasterLayout() {
  const { theme } = useContext(ThemeContext) || {};
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-200 ${theme === "dark" ? "dark bg-slate-900 text-white" : "bg-white"}`}>

      {/* Navbar */}
      <div className="shrink-0">
        <Navbar onMenuClick={() => setMobileOpen(true)} />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Sidebar — hidden on mobile */}
        <div className="hidden md:block relative z-50 bg-[#0E382F] text-white shrink-0 h-full">
          <SideBar />
        </div>

        {/* Mobile backdrop */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Mobile drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 h-full z-50 md:hidden shadow-2xl"
            >
              <SideBar onClose={() => setMobileOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-gray-200 dark:bg-slate-900 text-gray-800 dark:text-gray-100 transition-colors duration-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
}