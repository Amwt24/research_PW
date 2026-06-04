import React from 'react';
import { useFormStatus } from 'react-dom';
import { Button, Spinner, HStack, Span } from '@chakra-ui/react';

interface SubmitButtonProps {
  children: React.ReactNode;
  loadingText?: string;
  width?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  loadingText = 'Submitting...',
  width = 'full',
}) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      width={width}
      colorPalette="blue"
      variant="solid"
      size="md"
      mt="4"
    >
      {pending ? (
        <HStack gap="2">
          <Spinner size="xs" color="currentColor" />
          <Span>{loadingText}</Span>
        </HStack>
      ) : (
        children
      )}
    </Button>
  );
};
