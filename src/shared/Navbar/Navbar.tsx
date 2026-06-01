import { useContext, useState, useRef, useEffect } from "react";
import logo from "../../assets/Logo.svg";
import darkLogo from "../../assets/PMS3.png";
import defaultUser from "../../assets/user-image.jpg";
import { FaBell } from "react-icons/fa";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { BiLoaderCircle } from "react-icons/bi";
import { toast } from "react-toastify";
import ProfileModal from "../ProfileModal/ProfileModal";
import { ThemeContext } from "../../context/ThemeContext";
import { FiSun, FiMoon, FiMenu, FiUser, FiLock, FiLogOut, FiChevronDown } from "react-icons/fi";
import ConfirmationModal from "../../pages/Projects/DeleteConfirmationModal/DeleteConfirmation";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const { userData, setUserToken } = useContext(userContext) || {};
  const { theme, toggleTheme } = useContext(ThemeContext) || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    if (setUserToken) {
      setUserToken(null);
      toast.success("Logged out successfully");
      navigate("/login");
    }
    setIsDropdownOpen(false);
    setIsLogoutModalOpen(false);
  };

  const avatarSrc = userData?.imagePath
    ? `https://upskilling-egypt.com:3003/${userData.imagePath}`
    : defaultUser;

  return (
    <nav className="flex relative z-50 items-center justify-between bg-white dark:bg-[#0E382F]/95 px-3 sm:px-6 py-2.5 shadow-sm border-b border-gray-100 dark:border-white/10 transition-colors duration-200">

      {/* Left — hamburger + logo */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-xl text-[#0E382F] dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <FiMenu className="w-5 h-5" />
          </button>
        )}
        <img
          src={theme === "dark" ? darkLogo : logo}
          alt="PMS Logo"
          className="h-8 sm:h-10 w-auto"
        />
      </div>

      {/* Right — theme + bell + user */}
      <div className="flex items-center gap-1 sm:gap-3">

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-[#EF9B28] transition-all focus:outline-none"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark"
            ? <FiSun className="w-4 h-4 sm:w-5 sm:h-5" />
            : <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>

        {/* Bell */}
        <button className="relative p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
          <FaBell className="w-4 h-4 sm:w-5 sm:h-5 text-[#EF9B28]" />
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#EF9B28] text-[9px] font-bold text-white border-2 border-white dark:border-[#0E382F]">
            1
          </span>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-200 dark:bg-white/15 hidden sm:block mx-1" />

        {/* User dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsDropdownOpen((p) => !p)}
            className="flex items-center gap-2 sm:gap-2.5 px-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-colors focus:outline-none"
          >
            <img
              src={avatarSrc}
              alt="User Avatar"
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border-2 border-[#EF9B28]/40 shrink-0"
            />
            <div className="hidden md:flex flex-col text-left leading-tight">
              <span className="text-sm font-semibold text-[#003d29] dark:text-white">
                {userData?.userName || <BiLoaderCircle className="animate-spin" />}
              </span>
              <span className="text-[11px] text-gray-400 dark:text-gray-400">
                {userData?.email || <BiLoaderCircle className="animate-spin" />}
              </span>
            </div>
            <motion.div
              animate={{ rotate: isDropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-400 hidden sm:block" />
            </motion.div>
          </button>

          {/* Dropdown panel */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute right-0 mt-2 w-64 origin-top-right z-50"
              >
                <div className="bg-white dark:bg-[#1a3a30] rounded-2xl shadow-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">

                  {/* User info header */}
                  <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-r from-[#0E382F] to-[#1e5c4a]">
                    <img
                      src={avatarSrc}
                      alt="avatar"
                      className="h-11 w-11 rounded-full object-cover border-2 border-[#EF9B28]/60 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">
                        {userData?.userName || "..."}
                      </p>
                      <p className="text-[11px] text-white/60 truncate">
                        {userData?.email || "..."}
                      </p>
                      {userData?.group?.name && (
                        <span className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#EF9B28]/20 text-[#EF9B28] border border-[#EF9B28]/30">
                          {userData.group.name}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="py-2 px-2">
                    <button
                      onClick={() => { setIsDropdownOpen(false); setIsModalOpen(true); }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/15 text-blue-500 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/25 transition-colors shrink-0">
                        <FiUser className="w-4 h-4" />
                      </span>
                      <span className="font-medium">My Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => { navigate("/change-password"); setIsDropdownOpen(false); }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors group"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-50 dark:bg-amber-500/15 text-amber-500 group-hover:bg-amber-100 dark:group-hover:bg-amber-500/25 transition-colors shrink-0">
                        <FiLock className="w-4 h-4" />
                      </span>
                      <span className="font-medium">Change Password</span>
                    </button>

                    <div className="my-2 border-t border-gray-100 dark:border-white/10" />

                    <button
                      type="button"
                      onClick={() => { setIsDropdownOpen(false); setIsLogoutModalOpen(true); }}
                      className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors group"
                    >
                      <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 dark:bg-red-500/15 text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-500/25 transition-colors shrink-0">
                        <FiLogOut className="w-4 h-4" />
                      </span>
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <ProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        variant="logout"
      />
    </nav>
  );
}