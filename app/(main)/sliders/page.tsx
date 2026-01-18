"use client";

import { useState } from "react";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    useSortable,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface ListItem {
    id: string;
    title: string;
    description: string;
}

function SortableItem({ item }: { item: ListItem }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-white rounded-xl border-2 border-gray-200 p-4 shadow-md hover:shadow-lg transition-shadow duration-200 mb-4"
        >
            <div className="flex items-start gap-4">
                <button
                    className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 flex-shrink-0 mt-1"
                    {...attributes}
                    {...listeners}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="7" cy="5" r="1.5" />
                        <circle cx="13" cy="5" r="1.5" />
                        <circle cx="7" cy="10" r="1.5" />
                        <circle cx="13" cy="10" r="1.5" />
                        <circle cx="7" cy="15" r="1.5" />
                        <circle cx="13" cy="15" r="1.5" />
                    </svg>
                </button>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-neutral-800 mb-1">
                        {item.title}
                    </h3>
                    <p className="text-sm text-gray-500">{item.description}</p>
                </div>
            </div>
        </div>
    );
}

export default function SlidersPage() {
    const [items, setItems] = useState<ListItem[]>([
        {
            id: "1",
            title: "List Item 1",
            description: "Description of the first item in the list.",
        },
        {
            id: "2",
            title: "List Item 2",
            description: "Description of the second item in the list.",
        },
        {
            id: "3",
            title: "List Item 3",
            description: "Description of the third item in the list.",
        },
        {
            id: "4",
            title: "List Item 4",
            description: "Description of the fourth item in the list.",
        },
    ]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-gray-200 p-8 shadow-lg">
                <h1 className="text-4xl font-bold text-neutral-800 mb-8">
                    Sortable List
                </h1>

                <div className="bg-blue-50/30 rounded-2xl border-2 border-dashed border-blue-200 p-6">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={items.map((item) => item.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {items.map((item) => (
                                <SortableItem key={item.id} item={item} />
                            ))}
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        </div>
    );
}
