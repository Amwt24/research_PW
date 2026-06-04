import { useDebugValue } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

export function useDebuggableState() {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const logs = useSelector((state: RootState) => state.tasks.logs);

  // useDebugValue allows displaying a custom value in React DevTools
  // We provide a formatter function as the second parameter to format the value only when DevTools are open (improving production performance)
  useDebugValue(
    {
      totalTasks: tasks.length,
      pendingCount: tasks.filter(t => t.status !== 'done').length,
      actionsCount: logs.length,
      lastAction: logs[logs.length - 1]?.type || 'none',
    },
    (value) => `Active Tasks: ${value.totalTasks} (Pending: ${value.pendingCount}) | History Logs: ${value.actionsCount} | Last: ${value.lastAction}`
  );

  return { tasks, logs };
}
