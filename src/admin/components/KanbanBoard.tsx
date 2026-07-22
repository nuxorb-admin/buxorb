import { useState, type ReactNode } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface KanbanColumn {
  id: string;
  label: string;
}

interface KanbanBoardProps<T extends { id: string }> {
  columns: KanbanColumn[];
  items: T[];
  getColumnId: (item: T) => string;
  renderCard: (item: T) => ReactNode;
  onCardMove: (itemId: string, newColumnId: string) => void;
}

export default function KanbanBoard<T extends { id: string }>({
  columns,
  items,
  getColumnId,
  renderCard,
  onCardMove,
}: KanbanBoardProps<T>) {
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));
  const [activeId, setActiveId] = useState<string | null>(null);

  const grouped = columns.map((col) => ({
    column: col,
    items: items.filter((it) => getColumnId(it) === col.id),
  }));

  function handleDragStart(e: DragStartEvent) {
    setActiveId(String(e.active.id));
  }

  function handleDragEnd(e: DragEndEvent) {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;
    const activeItem = items.find((it) => it.id === active.id);
    if (!activeItem) return;
    const overIsColumn = columns.some((c) => c.id === over.id);
    const overColumnId = overIsColumn
      ? String(over.id)
      : getColumnId(items.find((it) => it.id === over.id) ?? activeItem);
    if (overColumnId && overColumnId !== getColumnId(activeItem)) {
      onCardMove(activeItem.id, overColumnId);
    }
  }

  const activeItem = items.find((it) => it.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {grouped.map(({ column, items: colItems }) => (
          <KanbanColumnView key={column.id} column={column} items={colItems} renderCard={renderCard} />
        ))}
      </div>
      <DragOverlay>{activeItem ? <div className="opacity-90">{renderCard(activeItem)}</div> : null}</DragOverlay>
    </DndContext>
  );
}

function KanbanColumnView<T extends { id: string }>({
  column,
  items,
  renderCard,
}: {
  column: KanbanColumn;
  items: T[];
  renderCard: (item: T) => ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <div className="w-72 flex-none">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[0.68rem] font-bold uppercase tracking-[0.12em] text-muted">
          {column.label}
        </span>
        <span className="font-mono text-[0.68rem] text-muted">{items.length}</span>
      </div>
      <div
        ref={setNodeRef}
        className={`flex min-h-[120px] flex-col gap-2.5 border border-dashed p-2 transition-colors ${
          isOver ? "border-teal bg-teal/5" : "border-ink/10"
        }`}
      >
        <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <SortableCard key={item.id} id={item.id}>
              {renderCard(item)}
            </SortableCard>
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

function SortableCard({ id, children }: { id: string; children: ReactNode }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="cursor-grab touch-none active:cursor-grabbing"
    >
      {children}
    </div>
  );
}
