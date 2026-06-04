import React, { useActionState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../schemas/authSchema';
import type { RegisterInput } from '../schemas/authSchema';
import { useAuth } from '../hooks/useAuth';
import { SubmitButton } from './SubmitButton';
import { Field } from './ui/field';
import { Alert } from './ui/alert';
import { Input, VStack, Heading, Text, Card, Box } from '@chakra-ui/react';
import { PasswordInput } from './ui/password-input';

interface RegisterFormProps {
  onSuccess: () => void;
  onNavigateToLogin: () => void;
}

interface ActionState {
  success: boolean;
  error: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onNavigateToLogin }) => {
  const { register: registerUser } = useAuth();
  
  const {
    register: registerField,
    trigger,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  });

  const [state, formAction] = useActionState<ActionState, FormData>(
    async (_prevState: ActionState, formData: FormData) => {
      const username = formData.get('username') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const confirmPassword = formData.get('confirmPassword') as string;
      
      try {
        await registerUser({ username, email, password, confirmPassword });
        return { success: true, error: null };
      } catch (err: any) {
        return { success: false, error: err.message || 'Registration failed.' };
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
          Create Account
        </Heading>
        <Text textStyle="sm" color="fg.muted" textAlign="center" mt="2">
          Sign up to get access to custom configurations and profiles
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
              <Alert status="error" title="Registration Error">
                {state.error}
              </Alert>
            )}

            <Field
              label="Username"
              invalid={!!errors.username}
              errorText={errors.username?.message}
            >
              <Input
                {...registerField('username')}
                placeholder="johndoe"
                type="text"
                name="username"
              />
            </Field>

            <Field
              label="Email Address"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                {...registerField('email')}
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
                {...registerField('password')}
                placeholder="••••••••"
                name="password"
              />
            </Field>

            <Field
              label="Confirm Password"
              invalid={!!errors.confirmPassword}
              errorText={errors.confirmPassword?.message}
            >
              <PasswordInput
                {...registerField('confirmPassword')}
                placeholder="••••••••"
                name="confirmPassword"
              />
            </Field>

            <SubmitButton loadingText="Creating account...">Register</SubmitButton>
          </VStack>
        </form>
      </Card.Body>
      
      <Card.Footer justifyContent="center" mt="4">
        <Text textStyle="sm" color="fg.muted">
          Already have an account?{' '}
          <Box
            as="span"
            color="blue.solid"
            cursor="pointer"
            fontWeight="bold"
            _hover={{ textDecoration: 'underline', color: 'blue.focus' }}
            onClick={onNavigateToLogin}
          >
            Log in here
          </Box>
        </Text>
      </Card.Footer>
    </Card.Root>
  );
};
