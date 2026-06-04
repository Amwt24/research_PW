import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';
import { UserDashboard } from './components/UserDashboard';
import { Toaster, toaster } from '@/components/ui/toaster';
import { Box, Container, Heading, Flex, Text, Spinner, Center } from '@chakra-ui/react';
import { ColorModeButton } from '@/components/ui/color-mode';
import { LuShield } from 'react-icons/lu';

function App() {
  const { user, isLoading } = useAuth();
  const [authView, setAuthView] = useState<'login' | 'register'>('login');

  const handleLoginSuccess = () => {
    toaster.create({
      title: 'Logged In Successfully',
      description: `Welcome back to your secure space.`,
      type: 'success',
    });
  };

  const handleRegisterSuccess = () => {
    toaster.create({
      title: 'Account Created Successfully',
      description: 'Your registration is complete. Welcome!',
      type: 'success',
    });
  };

  if (isLoading) {
    return (
      <Center minH="100vh" bg="bg.canvas">
        <Flex direction="column" align="center" gap="4">
          <Spinner size="xl" color="blue.solid" />
          <Text textStyle="md" fontWeight="medium" color="fg.muted">
            Verifying secure session...
          </Text>
        </Flex>
      </Center>
    );
  }

  return (
    <Box minH="100vh" bg="bg.canvas" display="flex" flexDirection="column" position="relative" px="4" py="8">
      {/* Top Header Section */}
      <Container maxW="4xl" mb="8">
        <Flex justify="space-between" align="center">
          <Flex align="center" gap="2" color="blue.solid">
            <LuShield size="26" />
            <Heading as="h1" size="lg" fontWeight="extrabold" letterSpacing="tight">
              SECURESHIELD
            </Heading>
          </Flex>
          <ColorModeButton />
        </Flex>
      </Container>

      {/* Main Content Area */}
      <Flex flex="1" justify="center" align="center">
        <Container maxW="md" px="0">
          {user ? (
            <UserDashboard />
          ) : (
            <VStack gap="6" width="full">
              {authView === 'login' ? (
                <LoginForm
                  onSuccess={handleLoginSuccess}
                  onNavigateToRegister={() => setAuthView('register')}
                />
              ) : (
                <RegisterForm
                  onSuccess={handleRegisterSuccess}
                  onNavigateToLogin={() => setAuthView('login')}
                />
              )}
            </VStack>
          )}
        </Container>
      </Flex>

      {/* Footer Area */}
      <Container maxW="4xl" mt="8">
        <Center>
          <Text textStyle="xs" color="fg.muted" textAlign="center">
            SecureShield System Auth v1.0. Powered by React 19 Actions & Chakra UI v3.
          </Text>
        </Center>
      </Container>

      <Toaster />
    </Box>
  );
}

// We import VStack here as part of Chakra layout components
import { VStack } from '@chakra-ui/react';

export default App;
