import { MoveHorizontal } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { CryptoCurrency } from "~/types/crypto";

type CryptoCardProps = {
  card: CryptoCurrency;
};

export default function CryptoCard({ card }: CryptoCardProps) {
  const { id, name, symbol, priceUsd, priceBtc } = card;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="w-full cursor-move transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary/50"
      {...attributes}
      {...listeners}
    >
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{symbol}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="flex justify-between items-center text-lg">
            1 {symbol} <MoveHorizontal /> USD: ${priceUsd.toLocaleString()}
          </p>
        </div>
        <div className="space-y-2">
          <p className="flex justify-between items-center text-lg">
            1 {symbol}
            <MoveHorizontal /> BTC: {priceBtc.toFixed(8)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
