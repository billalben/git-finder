import { useRef, type KeyboardEvent, type ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}

export function Tabs({ items, activeId, onChange }: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeIndex = items.findIndex((item) => item.id === activeId);

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const count = items.length;
    let nextIndex = activeIndex;

    if (event.key === "ArrowRight") {
      nextIndex = (activeIndex + 1) % count;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (activeIndex - 1 + count) % count;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = items[nextIndex];
    onChange(nextTab.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section className="tab-container">
      <div className="tab-list" aria-label="Tab navigation" role="tablist">
        {items.map((item, index) => (
          <button
            key={item.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            className="tab-btn"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={item.id === activeId}
            aria-controls={`panel-${item.id}`}
            tabIndex={item.id === activeId ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={handleKeyDown}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          className="tab-panel"
          role="tabpanel"
          id={`panel-${item.id}`}
          aria-labelledby={`tab-${item.id}`}
          tabIndex={0}
          hidden={item.id !== activeId}
        >
          {item.content}
        </div>
      ))}
    </section>
  );
}
