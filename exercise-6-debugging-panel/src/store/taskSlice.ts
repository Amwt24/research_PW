import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface ActionLog {
  id: string;
  timestamp: string;
  type: string;
  payload: any;
}

interface TaskState {
  tasks: Task[];
  logs: ActionLog[];
}

const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design Authentication Architecture',
    description: 'Structure React 19 forms and validation using Zod schemas.',
    status: 'done',
    priority: 'high',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: '2',
    title: 'Configure Cypress E2E Suite',
    description: 'Set up end-to-end user flow testing to assert debugger tracking.',
    status: 'doing',
    priority: 'medium',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

const initialState: TaskState = {
  tasks: initialTasks,
  logs: [
    {
      id: Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString(),
      type: '@@INIT',
      payload: null,
    },
  ],
};

const createLog = (type: string, payload: any): ActionLog => ({
  id: Math.random().toString(36).substring(2, 9),
  timestamp: new Date().toISOString(),
  type,
  payload,
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) => {
      const newTask: Task = {
        ...action.payload,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
      };
      state.tasks.push(newTask);
      state.logs.push(createLog('tasks/addTask', newTask));
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: Task['status'] }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        state.logs.push(createLog('tasks/updateTaskStatus', action.payload));
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const taskToDelete = state.tasks.find((t) => t.id === action.payload);
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      state.logs.push(createLog('tasks/deleteTask', { id: action.payload, title: taskToDelete?.title }));
    },
    clearLogs: (state) => {
      state.logs = [createLog('tasks/clearLogs', null)];
    },
    resetStore: (state) => {
      state.tasks = initialTasks;
      state.logs.push(createLog('tasks/resetStore', null));
    },
  },
});

export const { addTask, updateTaskStatus, deleteTask, clearLogs, resetStore } = taskSlice.actions;
export default taskSlice.reducer;
