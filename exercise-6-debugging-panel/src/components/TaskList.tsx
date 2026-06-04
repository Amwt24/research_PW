import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTaskStatus, deleteTask } from '../store/taskSlice';
import type { Task } from '../store/taskSlice';
import { Box, Card, Flex, Heading, Text, Badge, Button, Grid, Stack } from '@chakra-ui/react';
import { LuTrash2, LuCheck, LuPlay, LuClock } from 'react-icons/lu';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const dispatch = useDispatch();

  const handleStatusChange = (id: string, currentStatus: Task['status']) => {
    let nextStatus: Task['status'] = 'todo';
    if (currentStatus === 'todo') nextStatus = 'doing';
    else if (currentStatus === 'doing') nextStatus = 'done';
    else nextStatus = 'todo';

    dispatch(updateTaskStatus({ id, status: nextStatus }));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'orange';
      case 'low': return 'blue';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'done': return <LuCheck color="#38A169" />;
      case 'doing': return <LuPlay color="#3182CE" />;
      case 'todo': return <LuClock color="#718096" />;
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    switch (status) {
      case 'done': return 'Completed';
      case 'doing': return 'In Progress';
      case 'todo': return 'To Do';
    }
  };

  if (tasks.length === 0) {
    return (
      <Card.Root variant="outline" p="8" borderStyle="dashed" borderColor="border.subtle" borderRadius="xl">
        <Card.Body textAlign="center">
          <Heading size="md" color="fg.muted">No tasks available</Heading>
          <Text textStyle="sm" color="fg.muted" mt="2">
            Create a task using the input form on the left to watch the state update.
          </Text>
        </Card.Body>
      </Card.Root>
    );
  }

  return (
    <Stack gap="4">
      {tasks.map((task) => (
        <Card.Root
          key={task.id}
          variant="outline"
          borderRadius="xl"
          bg="bg.panel"
          boxShadow="sm"
          _hover={{ boxShadow: 'md' }}
          transition="box-shadow 0.2s"
          data-testid={`task-card-${task.id}`}
        >
          <Card.Body p="5">
            <Grid templateColumns={{ base: '1fr', md: 'auto 1fr auto' }} gap="4" alignItems="center">
              {/* Status Circle Indicator */}
              <Box fontSize="24" display="flex" justifyContent="center">
                {getStatusIcon(task.status)}
              </Box>

              {/* Title & Description */}
              <VStack align="flex-start" gap="1">
                <Flex align="center" gap="3" wrap="wrap">
                  <Heading size="md" fontWeight="bold">
                    {task.title}
                  </Heading>
                  <Badge colorPalette={getPriorityColor(task.priority)} variant="subtle" size="sm">
                    {task.priority}
                  </Badge>
                  <Badge colorPalette="gray" variant="solid" size="sm">
                    {getStatusLabel(task.status)}
                  </Badge>
                </Flex>
                {task.description && (
                  <Text textStyle="sm" color="fg.muted">
                    {task.description}
                  </Text>
                )}
              </VStack>

              {/* Action Buttons */}
              <Flex gap="2" justify={{ base: 'flex-start', md: 'flex-end' }}>
                <Button
                  size="sm"
                  variant="outline"
                  colorPalette="blue"
                  onClick={() => handleStatusChange(task.id, task.status)}
                  data-testid={`status-btn-${task.id}`}
                >
                  Change Status
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  colorPalette="red"
                  onClick={() => dispatch(deleteTask(task.id))}
                  data-testid={`delete-btn-${task.id}`}
                >
                  <LuTrash2 />
                </Button>
              </Flex>
            </Grid>
          </Card.Body>
        </Card.Root>
      ))}
    </Stack>
  );
};

import { VStack } from '@chakra-ui/react';
