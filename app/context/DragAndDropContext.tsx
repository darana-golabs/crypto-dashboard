import { createContext, useContext, useState, type ReactNode } from "react";

type DragAndDropContextType = {
  draggedId: string | null;
  setDraggedId: (id: string | null) => void;
};

const DragAndDropContext = createContext<DragAndDropContextType | undefined>(undefined);

export function DragAndDropProvider({ children }: { children: ReactNode }) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  return (
    <DragAndDropContext.Provider value={{ draggedId, setDraggedId }}>
      {children}
    </DragAndDropContext.Provider>
  );
}

export function useDragAndDrop() {
  const context = useContext(DragAndDropContext);
  if (context === undefined) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
} 