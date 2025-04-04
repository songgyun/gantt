import { useState } from "react";
import { parseISO } from "date-fns";

const defaultTasks = [
  { title: "Research", start: "2025-04-01", end: "2025-04-05" },
  { title: "Wireframe", start: "2025-04-06", end: "2025-04-10" },
  { title: "UI Design", start: "2025-04-11", end: "2025-04-18" },
];

export default function App() {
  const [tasks] = useState(defaultTasks);
  const start = parseISO("2025-04-01");

  return (
    <div style={{ padding: 20, background: '#111', color: 'white' }}>
      <h1>🕒 Hip Gantt Chart</h1>
      <div style={{ display: 'flex', gap: 4, fontSize: 12, marginBottom: 10 }}>
        {[...Array(15)].map((_, i) => (
          <div key={i} style={{ width: 30, textAlign: 'center', color: '#888' }}>
            {String(i + 1).padStart(2, '0')}
          </div>
        ))}
      </div>
      {tasks.map((task, idx) => {
        const startOffset = (parseISO(task.start) - start) / (1000 * 60 * 60 * 24);
        const duration = (parseISO(task.end) - parseISO(task.start)) / (1000 * 60 * 60 * 24) + 1;
        return (
          <div key={idx} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 14 }}>{task.title}</div>
            <div style={{ position: 'relative', height: 20 }}>
              <div
                style={{
                  position: 'absolute',
                  left: `${startOffset * 30}px`,
                  width: `${duration * 30}px`,
                  height: '100%',
                  background: 'white',
                  opacity: 0.7,
                  borderRadius: 4,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}