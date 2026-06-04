import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store/taskSlice';
import { Button, Input, Textarea, VStack, Heading, NativeSelect, Box } from '@chakra-ui/react';
import { Field } from './ui/field';
import { LuPlus } from 'react-icons/lu';

export const TaskForm: React.FC = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch(addTask({
      title,
      description,
      priority,
      status: 'todo',
    }));

    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <Box p="6" border="1px solid" borderColor="border.subtle" borderRadius="xl" bg="bg.panel" boxShadow="sm">
      <Heading size="md" mb="4" fontWeight="bold" id="add-task-heading">
        Create New Task
      </Heading>
      
      <form onSubmit={handleSubmit} aria-labelledby="add-task-heading">
        <VStack gap="4" align="stretch">
          <Field label="Task Title" required>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Write Cypress E2E tests"
              id="task-title-input"
            />
          </Field>

          <Field label="Description">
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description..."
              id="task-desc-input"
              rows={3}
            />
          </Field>

          <Field label="Priority Level">
            <NativeSelect.Root>
              <NativeSelect.Field
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                id="task-priority-select"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </NativeSelect.Field>
            </NativeSelect.Root>
          </Field>

          <Button type="submit" colorPalette="blue" size="md" mt="2" id="add-task-btn">
            <LuPlus /> Add Task
          </Button>
        </VStack>
      </form>
    </Box>
  );
};
