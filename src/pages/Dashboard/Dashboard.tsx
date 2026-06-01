import { motion, type Variants } from "framer-motion";
import React, { useContext, useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { userContext } from "../../context/userContext";
import axiosClient from "../../services/api/axiosClient";

interface TaskCount { toDo: number; inProgress: number; done: number; }
interface UserCount { activatedEmployeeCount: number; deactivatedEmployeeCount: number; }

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
};

// ── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, bg, darkBg, index }: {
  icon: React.ReactNode; label: string; value: number | string;
  bg: string; darkBg: string; index: number;
}) {
  return (
    <motion.div
      custom={index} variants={fadeUp} initial="hidden" animate="visible"
      className={`${bg} ${darkBg} rounded-2xl p-3 xs:p-4 sm:p-5 flex flex-col gap-2 sm:gap-3 shadow-sm min-w-0 transition-colors duration-200`}
    >
      <div className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl bg-white/60 dark:bg-white/10 shrink-0">
        {icon}
      </div>
      <p className="text-[11px] xs:text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-medium leading-tight truncate">{label}</p>
      <p className="text-base xs:text-lg sm:text-xl font-bold text-gray-800 dark:text-white">{value}</p>
    </motion.div>
  );
}

// ── Donut Card ────────────────────────────────────────────────────────────────
const CHART_COLORS = ["#4C9BE8", "#EF9B28", "#315951"];

function DonutCard({ title, subtitle, data, index }: {
  title: string; subtitle: string; data: { name: string; value: number }[]; index: number;
}) {
  const total = data.reduce((s, d) => s + d.value, 0);
  const pct = total > 0 ? Math.round((data[0].value / total) * 100) : 0;

  return (
    <motion.div
      custom={index} variants={fadeUp} initial="hidden" animate="visible"
      className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm h-full transition-colors duration-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-1 h-10 rounded-full bg-[#EF9B28] shrink-0" />
        <div className="min-w-0">
          <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base truncate">{title}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{subtitle}</p>
        </div>
      </div>
      <div className="relative w-full" style={{ height: 180 }}>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
              paddingAngle={3} dataKey="value" startAngle={90} endAngle={-270}>
              {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string) => [value ?? 0, name]}
              contentStyle={{ borderRadius: 8, border: "none", fontSize: 12, backgroundColor: "var(--tooltip-bg, #fff)", color: "var(--tooltip-color, #374151)" }}
              labelStyle={{ display: "none" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white">{pct}%</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
            <span className="w-2 h-2 rounded-full inline-block shrink-0"
              style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
            <span>{d.name}:</span>
            <strong className="text-gray-700 dark:text-gray-200">{d.value}</strong>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Section Header ────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-1 h-9 rounded-full bg-[#EF9B28] shrink-0" />
      <div className="min-w-0">
        <p className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">{title}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{subtitle}</p>
      </div>
    </div>
  );
}

// ── Skeleton ──────────────────────────────────────────────────────────────────
function SkeletonCard({ cols }: { cols: number }) {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-4 w-28 bg-gray-200 dark:bg-slate-700 rounded" />
      <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols }).map((_, j) => (
          <div key={j} className="h-24 bg-gray-200 dark:bg-slate-700 rounded-2xl" />
        ))}
      </div>
      <div className="h-64 bg-gray-200 dark:bg-slate-700 rounded-2xl" />
    </div>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconProgress   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>;
const IconTaskList   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12l2 2 4-4" /></svg>;
const IconDone       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>;
const IconUserActive = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#315951" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const IconUserInactive = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="23" y1="11" x2="17" y2="17" /><line x1="17" y1="11" x2="23" y2="17" /></svg>;

// ── Dashboard ─────────────────────────────────────────────────────────────────
export default function Dashboard() {
  const { userData } = useContext(userContext) || {};
  const [taskCount, setTaskCount] = useState<TaskCount | null>(null);
  const [userCount, setUserCount] = useState<UserCount | null>(null);
  const [loading, setLoading] = useState(true);
  const isEmployee = userData?.group?.name === "Employee";

  useEffect(() => {
    if (!userData) return;
    const isEmp = userData?.group?.name === "Employee";
    const requests = isEmp
      ? [axiosClient.get("/Task/count")]
      : [axiosClient.get("/Task/count"), axiosClient.get("/Users/count")];
    Promise.all(requests)
      .then(([t, u]) => { setTaskCount(t.data); if (u) setUserCount(u.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [userData]);

  const taskChartData = taskCount
    ? [{ name: "To Do", value: taskCount.toDo }, { name: "In Progress", value: taskCount.inProgress }, { name: "Done", value: taskCount.done }]
    : [];
  const userChartData = userCount
    ? [{ name: "Active", value: userCount.activatedEmployeeCount }, { name: "Inactive", value: userCount.deactivatedEmployeeCount }]
    : [];

  // Shared stat card props
  const taskCards = [
    { index: 0, icon: <IconProgress />,  label: "To Do",       value: taskCount?.toDo ?? 0,       bg: "bg-[#edeaf5]", darkBg: "dark:bg-[#2d2a45]" },
    { index: 1, icon: <IconTaskList />,  label: "In Progress", value: taskCount?.inProgress ?? 0, bg: "bg-[#f5f0e8]", darkBg: "dark:bg-[#3a3020]" },
    { index: 2, icon: <IconDone />,      label: "Done",        value: taskCount?.done ?? 0,       bg: "bg-[#fde8f0]", darkBg: "dark:bg-[#3a2030]" },
  ];
  const userCards = [
    { index: 4, icon: <IconUserActive />,   label: "Active",   value: userCount?.activatedEmployeeCount ?? 0,   bg: "bg-[#e8f0f5]", darkBg: "dark:bg-[#1e3040]" },
    { index: 5, icon: <IconUserInactive />, label: "Inactive", value: userCount?.deactivatedEmployeeCount ?? 0, bg: "bg-[#f5f0e8]", darkBg: "dark:bg-[#3a3020]" },
  ];

  return (
    <div className="p-3 sm:p-4 md:p-6 bg-[#F5F5F5] dark:bg-slate-900 min-h-screen transition-colors duration-200">

      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="dashboard-bg relative w-full mb-6 sm:mb-8 rounded-2xl overflow-hidden border-2 border-[#EF9B28]/30"
        style={{ minHeight: "clamp(140px, 25vw, 300px)" }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/65 z-[1]" />
        <div className="absolute inset-0 z-10 flex flex-col justify-center gap-2 sm:gap-4 p-5 sm:p-8 md:p-10">
          <motion.h1
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg sm:text-2xl md:text-3xl text-white font-semibold leading-snug"
          >
            Welcome <span className="text-[#EF9B28]">{userData?.userName ?? "..."}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="text-white/80 text-xs sm:text-base md:text-lg max-w-md leading-relaxed"
          >
            You can add projects and assign tasks to your team
          </motion.p>
        </div>
      </motion.div>

      {/* Stats + Charts */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          <SkeletonCard cols={3} />
          {!isEmployee && <SkeletonCard cols={2} />}
        </div>
      ) : isEmployee ? (
        // Employee layout
        <div className="flex flex-col gap-4">
          <SectionHeader title="Tasks" subtitle="Overview of all project tasks" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {taskCards.map((c) => <StatCard key={c.index} {...c} />)}
            </div>
            <DonutCard title="Tasks" subtitle="Distribution by status" data={taskChartData} index={3} />
          </div>
        </div>
      ) : (
        // Manager layout
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">

          {/* Tasks */}
          <div className="flex flex-col gap-4">
            <SectionHeader title="Tasks" subtitle="Overview of all project tasks" />
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {taskCards.map((c) => <StatCard key={c.index} {...c} />)}
            </div>
            <DonutCard title="Tasks" subtitle="Distribution by status" data={taskChartData} index={3} />
          </div>

          {/* Users */}
          <div className="flex flex-col gap-4">
            <SectionHeader title="Users" subtitle="Overview of employee accounts" />
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {userCards.map((c) => <StatCard key={c.index} {...c} />)}
            </div>
            <DonutCard title="Users" subtitle="Active vs inactive employees" data={userChartData} index={6} />
          </div>

        </div>
      )}
    </div>
  );
}