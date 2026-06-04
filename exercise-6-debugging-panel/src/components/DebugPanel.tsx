import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearLogs, resetStore } from '../store/taskSlice';
import type { ActionLog } from '../store/taskSlice';
import type { RootState } from '../store';
import { Box, Card, Flex, Heading, Text, Button, Code, Stack, Collapsible, HStack } from '@chakra-ui/react';
import { LuTrash2, LuRotateCcw, LuTerminal, LuDatabase } from 'react-icons/lu';

interface DebugPanelProps {
  logs: ActionLog[];
}

export const DebugPanel: React.FC<DebugPanelProps> = ({ logs }) => {
  const dispatch = useDispatch();
  const fullStoreState = useSelector((state: RootState) => state);
  const [activeTab, setActiveTab] = useState<'state' | 'logs'>('state');

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    } catch {
      return '--:--:--';
    }
  };

  return (
    <Card.Root width="full" height="full" variant="elevated" borderRadius="xl" bg="gray.950" color="gray.50" border="1px solid" borderColor="gray.800" overflow="hidden" boxShadow="lg">
      <Card.Header bg="gray.900" p="4" borderBottom="1px solid" borderBottomColor="gray.850">
        <Flex justify="space-between" align="center">
          <HStack gap="2">
            <LuTerminal color="#4FD1C5" size="18" />
            <Heading size="md" color="white" fontWeight="bold" letterSpacing="wide">
              Redux State Inspector
            </Heading>
          </HStack>
          
          <Flex gap="2">
            <Button
              size="xs"
              variant="outline"
              colorPalette="gray"
              color="white"
              borderColor="gray.700"
              _hover={{ bg: 'gray.800' }}
              onClick={() => dispatch(clearLogs())}
              id="clear-logs-btn"
            >
              <LuTrash2 /> Clear Logs
            </Button>
            <Button
              size="xs"
              variant="solid"
              colorPalette="teal"
              onClick={() => dispatch(resetStore())}
              id="reset-store-btn"
            >
              <LuRotateCcw /> Reset Store
            </Button>
          </Flex>
        </Flex>

        {/* Tab Toggle Navigation */}
        <Flex mt="4" gap="1" bg="gray.950" p="1" borderRadius="lg" border="1px solid" borderColor="gray.800">
          <Button
            flex="1"
            size="xs"
            variant="ghost"
            bg={activeTab === 'state' ? 'gray.850' : 'transparent'}
            color={activeTab === 'state' ? 'teal.400' : 'gray.400'}
            _hover={{ bg: 'gray.900', color: 'teal.300' }}
            onClick={() => setActiveTab('state')}
            id="tab-state-btn"
          >
            <LuDatabase /> Store State
          </Button>
          <Button
            flex="1"
            size="xs"
            variant="ghost"
            bg={activeTab === 'logs' ? 'gray.850' : 'transparent'}
            color={activeTab === 'logs' ? 'teal.400' : 'gray.400'}
            _hover={{ bg: 'gray.900', color: 'teal.300' }}
            onClick={() => setActiveTab('logs')}
            id="tab-logs-btn"
          >
            <LuTerminal /> Dispatch Log ({logs.length})
          </Button>
        </Flex>
      </Card.Header>

      <Card.Body p="4" overflowY="auto" maxH="600px">
        {activeTab === 'state' ? (
          <Box position="relative">
            <Text textStyle="xs" color="teal.500" mb="2" fontWeight="bold">
              ROOT STORE STATE JSON
            </Text>
            <Code
              display="block"
              p="3"
              borderRadius="md"
              bg="gray.900"
              color="emerald.400"
              fontSize="xs"
              lineHeight="tall"
              whiteSpace="pre-wrap"
              fontFamily="mono"
              border="1px solid"
              borderColor="gray.800"
              id="store-state-raw"
            >
              {JSON.stringify(fullStoreState, null, 2)}
            </Code>
          </Box>
        ) : (
          <Stack gap="3">
            <Text textStyle="xs" color="teal.500" fontWeight="bold">
              TRANSACTIONAL DISPATCH TIMELINE
            </Text>
            
            {logs.length === 0 ? (
              <Text textStyle="xs" color="gray.500" textAlign="center" py="4">
                No logs recorded yet.
              </Text>
            ) : (
              [...logs].reverse().map((log) => (
                <Box
                  key={log.id}
                  p="3"
                  borderRadius="md"
                  bg="gray.900"
                  border="1px solid"
                  borderColor="gray.800"
                  position="relative"
                  data-testid="log-entry"
                >
                  <Flex justify="space-between" align="center" mb="1">
                    <Text textStyle="xs" fontWeight="bold" fontFamily="mono" color="cyan.400">
                      {log.type}
                    </Text>
                    <Text textStyle="xs" color="gray.500" fontFamily="mono">
                      {formatTime(log.timestamp)}
                    </Text>
                  </Flex>

                  {log.payload && (
                    <Collapsible.Root>
                      <Collapsible.Trigger asChild>
                        <Button variant="ghost" size="xs" colorPalette="gray" color="gray.400" px="0" mt="1" textStyle="xs" _hover={{ color: 'teal.400' }}>
                          Toggle Payload View
                        </Button>
                      </Collapsible.Trigger>
                      <Collapsible.Content>
                        <Box mt="2" p="2" bg="gray.950" borderRadius="sm" border="1px solid" borderColor="gray.800">
                          <Code display="block" bg="transparent" color="teal.300" fontSize="2xs" whiteSpace="pre-wrap">
                            {JSON.stringify(log.payload, null, 2)}
                          </Code>
                        </Box>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  )}
                </Box>
              ))
            )}
          </Stack>
        )}
      </Card.Body>
    </Card.Root>
  );
};


