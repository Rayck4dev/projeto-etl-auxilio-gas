import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { opcoesMes } from "@/types/dashboard";
import type { DropdownMesProps } from "@/types/dashboard";

export default function DropdownMes({
  mesFiltro,
  setMesFiltro,
}: DropdownMesProps) {
  const [aberto, setAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const labelAtivo =
    opcoesMes.find((o) => o.valor === mesFiltro)?.label || "Todos os Meses";

  useEffect(() => {
    function cliqueFora(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setAberto(false);
      }
    }
    document.addEventListener("mousedown", cliqueFora);
    return () => document.removeEventListener("mousedown", cliqueFora);
  }, []);

  return (
    <div className="relative inline-block text-left z-50" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setAberto(!aberto)}
        className={`flex items-center justify-between gap-3 bg-slate-950 border rounded-xl px-4 py-2 text-xs font-medium text-slate-300 outline-none transition-all w-48 ${
          aberto
            ? "border-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.1)]"
            : "border-slate-800 hover:border-slate-700"
        }`}
      >
        <span>{labelAtivo}</span>
        <ChevronDown
          size={14}
          className={`text-slate-500 transition-transform duration-200 ${aberto ? "rotate-180 text-teal-400" : ""}`}
        />
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-950 border border-slate-800 p-1.5 shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-0.5">
              {opcoesMes.map((opcao) => {
                const isSelected = mesFiltro === opcao.valor;
                return (
                  <button
                    key={opcao.valor}
                    type="button"
                    onClick={() => {
                      setMesFiltro(opcao.valor);
                      setAberto(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs rounded-lg font-medium transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-teal-500/10 text-teal-400 font-bold"
                        : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                    }`}
                  >
                    <span>{opcao.label}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
