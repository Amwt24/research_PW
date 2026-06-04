
import { useDebuggableState } from './hooks/useDebuggableState';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { DebugPanel } from './components/DebugPanel';
import { Toaster } from '@/components/ui/toaster';
import { Box, Container, Heading, Flex, Text, Grid, GridItem } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';
import { LuTerminal } from 'react-icons/lu';

function App() {
  // Use our custom hook which contains the useDebugValue logic
  const { tasks, logs } = useDebuggableState();

  return (
    <Box minH="100vh" bg="bg.canvas" display="flex" flexDirection="column" px="4" py="8">
      {/* Top Header */}
      <Container maxW="7xl" mb="8">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="2" color="teal.solid">
            <LuTerminal size="26" />
            <Heading as="h1" size="lg" fontWeight="extrabold" letterSpacing="tight">
              STATECHECKER
            </Heading>
          </Flex>
          <ColorModeButton />
        </Flex>
      </Container>

      {/* Main Grid Content */}
      <Box flex="1">
        <Container maxW="7xl" height="100%">
          <Grid templateColumns={{ base: '1fr', lg: '3fr 2fr' }} gap="8" height="100%" alignItems="start">
            
            {/* Left side: Task App */}
            <GridItem>
              <Grid templateColumns={{ base: '1fr', md: '2fr 3fr' }} gap="6" alignItems="start">
                <GridItem>
                  <TaskForm />
                </GridItem>
                <GridItem>
                  <Box bg="bg.panel" p="6" border="1px solid" borderColor="border.subtle" borderRadius="xl" boxShadow="sm">
                    <Heading size="md" mb="4" fontWeight="bold" id="task-list-heading">
                      Active Tasks List
                    </Heading>
                    <TaskList tasks={tasks} />
                  </Box>
                </GridItem>
              </Grid>
            </GridItem>

            {/* Right side: Debug Panel */}
            <GridItem height="100%">
              <DebugPanel logs={logs} />
            </GridItem>

          </Grid>
        </Container>
      </Box>

      {/* Bottom Footer */}
      <Container maxW="7xl" mt="8">
        <Center>
          <Text textStyle="xs" color="fg.muted" textAlign="center">
            StateChecker Debug Panel v1.0. React DevTools Custom hook debugging with useDebugValue & Cypress E2E.
          </Text>
        </Center>
      </Container>

      <Toaster />
    </Box>
  );
}

import { Center } from '@chakra-ui/react';

export default App;
