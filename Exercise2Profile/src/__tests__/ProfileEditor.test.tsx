import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProfileEditor } from '../components/ProfileEditor';
import { profileStore } from '../store/profileStore';

describe('ProfileEditor', () => {
  beforeEach(() => {
    // Reset the store before each test
    profileStore.setProfile({ name: '', email: '', bio: '' });
  });

  it('renders all form fields', () => {
    render(<ProfileEditor />);
    
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Biography/i)).toBeInTheDocument();
  });

  it('validates email format and shows zod errors in real time', async () => {
    render(<ProfileEditor />);
    
    const emailInput = screen.getByLabelText(/Email Address/i);
    
    // Simular escritura de un email inválido
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    
    // Esperar a que Formik y Zod procesen la validación y muestren el error
    await waitFor(() => {
      expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    });
  });

  it('validates minimum name length', async () => {
    render(<ProfileEditor />);
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    
    fireEvent.change(nameInput, { target: { value: 'a' } });
    fireEvent.blur(nameInput);
    
    await waitFor(() => {
      expect(screen.getByText('Name must be at least 2 characters long')).toBeInTheDocument();
    });
  });

  it('syncs values to the external store', async () => {
    render(<ProfileEditor />);
    
    const nameInput = screen.getByLabelText(/Full Name/i);
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    
    await waitFor(() => {
      const snapshot = profileStore.getSnapshot();
      expect(snapshot.name).toBe('John Doe');
    });
  });
});
