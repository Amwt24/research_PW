import React, { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../schemas/authSchema';
import type { LoginInput } from '../schemas/authSchema';
import { useAuth } from '../hooks/useAuth';
import { SubmitButton } from './SubmitButton';
import { Field } from './ui/field';
import { Alert } from './ui/alert';
import { Input, VStack, Heading, Text, Card, Box } from '@chakra-ui/react';
import { PasswordInput } from './ui/password-input';

interface LoginFormProps {
  onSuccess: () => void;
  onNavigateToRegister: () => void;
}

interface ActionState {
  success: boolean;
  error: string | null;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onNavigateToRegister }) => {
  const { login } = useAuth();
  
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const [state, formAction] = useActionState<ActionState, FormData>(
    async (_prevState: ActionState, formData: FormData) => {
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      try {
        await login({ email, password });
        return { success: true, error: null };
      } catch (err: any) {
        return { success: false, error: err.message || 'Something went wrong.' };
      }
    },
    { success: false, error: null }
  );

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success, onSuccess]);

  return (
    <Card.Root width="full" maxW="md" variant="elevated" p="6" borderRadius="lg" bg="bg.panel" boxShadow="lg">
      <Card.Header>
        <Heading size="2xl" textAlign="center" fontWeight="bold" letterSpacing="tight">
          Welcome Back
        </Heading>
        <Text textStyle="sm" color="fg.muted" textAlign="center" mt="2">
          Log in to access your premium account dashboard
        </Text>
      </Card.Header>
      
      <Card.Body>
        <form
          action={async (formData) => {
            const isValid = await trigger();
            if (!isValid) return;
            formAction(formData);
          }}
        >
          <VStack gap="4" align="stretch">
            {state.error && (
              <Alert status="error" title="Authentication Error">
                {state.error}
              </Alert>
            )}

            <Field
              label="Email Address"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                {...register('email')}
                placeholder="you@example.com"
                type="email"
                name="email"
              />
            </Field>

            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <PasswordInput
                {...register('password')}
                placeholder="••••••••"
                name="password"
              />
            </Field>

            <SubmitButton loadingText="Authenticating...">Log In</SubmitButton>
          </VStack>
        </form>
      </Card.Body>
      
      <Card.Footer justifyContent="center" mt="4">
        <Text textStyle="sm" color="fg.muted">
          Don't have an account?{' '}
          <Box
            as="span"
            color="blue.solid"
            cursor="pointer"
            fontWeight="bold"
            _hover={{ textDecoration: 'underline', color: 'blue.focus' }}
            onClick={onNavigateToRegister}
          >
            Register here
          </Box>
        </Text>
      </Card.Footer>
    </Card.Root>
  );
};
