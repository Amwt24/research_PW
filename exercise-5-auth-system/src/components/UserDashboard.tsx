import React, { useOptimistic, useTransition, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Heading, Text, VStack, Button, Card, Textarea, Box, HStack, Flex, Separator } from '@chakra-ui/react';
import { LuUser, LuLogOut, LuCheck } from 'react-icons/lu';
import { Alert } from './ui/alert';
import { Field } from './ui/field';

export const UserDashboard: React.FC = () => {
  const { user, updateUserBio, logout } = useAuth();
  const [bioInput, setBioInput] = useState(user?.bio || '');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // useOptimistic to show immediate bio update
  const [optimisticBio, setOptimisticBio] = useOptimistic(
    user?.bio || '',
    (_state, newBio: string) => newBio
  );

  if (!user) return null;

  const handleUpdateBio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // useTransition is required for useOptimistic updates
    startTransition(async () => {
      // Optimistically update UI
      setOptimisticBio(bioInput);
      try {
        await updateUserBio(bioInput);
      } catch (err: any) {
        setError(err.message || 'Failed to update bio');
      }
    });
  };

  return (
    <Card.Root width="full" maxW="2xl" variant="elevated" borderRadius="xl" bg="bg.panel" boxShadow="xl" p="8">
      <Card.Header>
        <Flex justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }} gap="4">
          <HStack gap="4">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxSize="16"
              borderRadius="full"
              bg="blue.subtle"
              color="blue.solid"
            >
              <LuUser size="28" />
            </Box>
            <VStack align="flex-start" gap="0">
              <Heading size="xl" fontWeight="bold">
                {user.username}
              </Heading>
              <Text textStyle="sm" color="fg.muted">
                {user.email}
              </Text>
            </VStack>
          </HStack>
          
          <Button
            onClick={logout}
            variant="outline"
            colorPalette="red"
            size="sm"
            alignSelf={{ base: 'stretch', sm: 'auto' }}
          >
            <LuLogOut /> Log Out
          </Button>
        </Flex>
      </Card.Header>

      <Separator my="6" />

      <Card.Body>
        <VStack gap="6" align="stretch">
          {error && (
            <Alert status="error" title="Update Failed">
              {error}
            </Alert>
          )}

          <Box bg="bg.subtle" p="4" borderRadius="md" borderLeft="4px solid" borderLeftColor="blue.solid">
            <Text textStyle="xs" fontWeight="bold" textTransform="uppercase" color="fg.muted" letterSpacing="wider">
              Current Bio (Optimistic State)
            </Text>
            <Text mt="2" fontStyle="italic" color="fg.info">
              "{optimisticBio}"
            </Text>
            {isPending && (
              <Text textStyle="xs" color="blue.solid" mt="2" fontWeight="semibold">
                Saving to server in background...
              </Text>
            )}
          </Box>

          <form onSubmit={handleUpdateBio}>
            <VStack gap="4" align="stretch">
              <Field
                label="Update your bio"
                helperText="Change your profile description. The display above will update instantly using useOptimistic."
              >
                <Textarea
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  placeholder="Tell us about yourself..."
                  disabled={isPending}
                  rows={4}
                />
              </Field>

              <Button
                type="submit"
                loading={isPending}
                loadingText="Updating..."
                colorPalette="blue"
                alignSelf="flex-end"
                px="6"
              >
                <LuCheck /> Update Bio
              </Button>
            </VStack>
          </form>
        </VStack>
      </Card.Body>
    </Card.Root>
  );
};
