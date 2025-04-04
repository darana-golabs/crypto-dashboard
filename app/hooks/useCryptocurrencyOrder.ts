import { useEffect, useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { useCryptoStore } from "~/lib/stores/cryptoStore";
import type { Cryptocurrency } from "~/types/crypto";

export function useCryptocurrencyOrder(
  initialCryptocurrencies: Cryptocurrency[]
) {
  const [cryptocurrencies, setCryptocurrencies] = useState<Cryptocurrency[]>(
    initialCryptocurrencies
  );
  const { order, setOrder } = useCryptoStore();

  useEffect(() => {
    if (order.length > 0) {
      const orderedCryptos = [...initialCryptocurrencies].sort((a, b) => {
        const aIndex = order.indexOf(a.id);
        const bIndex = order.indexOf(b.id);
        return aIndex - bIndex;
      });
      setCryptocurrencies(orderedCryptos);
    } else {
      setCryptocurrencies(initialCryptocurrencies);
      setOrder(initialCryptocurrencies.map((c) => c.id));
    }
  }, [initialCryptocurrencies, order, setOrder]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = cryptocurrencies.findIndex((c) => c.id === active.id);
      const newIndex = cryptocurrencies.findIndex((c) => c.id === over.id);

      const newOrder = [...cryptocurrencies];
      const [movedItem] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, movedItem);

      setCryptocurrencies(newOrder);
      setOrder(newOrder.map((c) => c.id));
    }
  };

  return { cryptocurrencies, handleDragEnd };
}
