import { useEffect, useState } from "react";

interface ValorAnimadoProps {
  value: number;
  isCurrency?: boolean;
  precision: number;
}

export default function ValorAnimado({
  value,
  isCurrency = false,
}: ValorAnimadoProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 2000;
    const startValue = displayValue;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      const easeProgress = progress * (2 - progress);
      const current = startValue + (value - startValue) * easeProgress;

      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value]);

  return (
    <span>
      {isCurrency
        ? Math.round(displayValue).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
            maximumFractionDigits: 0,
          })
        : Math.round(displayValue).toLocaleString("pt-BR")}
    </span>
  );
}
