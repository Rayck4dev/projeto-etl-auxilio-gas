import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface PanelProps {
  children: ReactNode;
  className?: string;
}

export default function Panel({ children, className = "" }: PanelProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`
        ${className}
        relative
        bg-slate-900/40
        backdrop-blur-xl
        border border-slate-800/80
        rounded-3xl
        p-6
        overflow-hidden
      `}
    >
      <div className="absolute inset-0 border border-white/[0.02] rounded-3xl pointer-events-none" />
      {children}
    </motion.div>
  );
}
