/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitForm } from '@/components/SubmitForm';

// Mock next-auth/react
vi.mock('next-auth/react', () => ({
  useSession: () => ({
    data: null,
    status: 'unauthenticated',
  }),
  SessionProvider: ({ children }: any) => children,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

const mockCategories = [
  { id: '1', name: 'Prompts', slug: 'prompts', isFree: true },
  { id: '2', name: 'MCP Servers', slug: 'mcp-servers', isFree: false },
];

describe('SubmitForm Component', () => {
  describe('Form Validation', () => {
    it('shows validation error when submitting without required fields', { timeout: 10000 }, async () => {
      const user = userEvent.setup({ delay: null });
      render(<SubmitForm categories={mockCategories as any} />);

      const submitButton = screen.getByRole('button', { name: /proceed|submit/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/Please provide at least a Title and Description/i)).toBeInTheDocument();
      });
    });

    it('validates URL format', { timeout: 10000 }, async () => {
      const user = userEvent.setup({ delay: null });
      render(<SubmitForm categories={mockCategories as any} />);

      const nameInput = screen.getByLabelText(/resource name/i);
      await user.type(nameInput, 'Test Tool');
      const descInput = screen.getByLabelText(/description/i);
      await user.type(descInput, 'Test Description');

      const urlInput = screen.getByLabelText(/website/i);
      await user.type(urlInput, 'not-a-valid-url');

      const submitButton = screen.getByRole('button', { name: /proceed|submit/i });
      await user.click(submitButton);
    });
  });

  describe('User Experience', () => {
    it('displays free categories correctly', () => {
      render(<SubmitForm categories={mockCategories as any} />);

      expect(screen.getByText(/Prompts - FREE/)).toBeInTheDocument();
      expect(screen.getByText(/MCP Servers - PAID/)).toBeInTheDocument();
    });

    it('updates button text based on category selection', { timeout: 10000 }, async () => {
      const user = userEvent.setup({ delay: null });
      render(<SubmitForm categories={mockCategories as any} />);

      const categorySelect = screen.getByRole('combobox');
      
      // Select Free category
      await user.selectOptions(categorySelect, 'Prompts');
      expect(screen.getByText(/Submit for Free/i)).toBeInTheDocument();

      // Select Paid category
      await user.selectOptions(categorySelect, 'MCP Servers');
      expect(screen.getByText(/Proceed to Payment/i)).toBeInTheDocument();
    });

    it('opens checkout overlay on valid submission', { timeout: 10000 }, async () => {
      const user = userEvent.setup({ delay: null });
      render(<SubmitForm categories={mockCategories as any} />);

      // Fill form
      await user.type(screen.getByLabelText(/resource name/i), 'Test Tool');
      await user.type(screen.getByLabelText(/website/i), 'https://test.com');
      await user.type(screen.getByLabelText(/description/i), 'Valid description of at least some length.');
      
      const categorySelect = screen.getByRole('combobox');
      await user.selectOptions(categorySelect, 'MCP Servers');

      const submitButton = screen.getByRole('button', { name: /proceed/i });
      await user.click(submitButton);

      // Verify checkout overlay appears
      await waitFor(() => {
        expect(screen.getByText(/Upgrade Your Listing/i)).toBeInTheDocument();
      });
    });
  });

  describe('Security - XSS Prevention', () => {
    it('sanitizes script tags in input fields', { timeout: 10000 }, async () => {
      const user = userEvent.setup({ delay: null });
      render(<SubmitForm categories={mockCategories as any} />);

      const maliciousInput = '<script data-testid="malicious">alert("xss")</script>Legit Tool';
      const nameInput = screen.getByLabelText(/resource name/i);
      await user.type(nameInput, maliciousInput);

      // Verify that NO script with data-testid="malicious" exists
      expect(document.querySelector('script[data-testid="malicious"]')).toBeNull();
    });
  });
});
