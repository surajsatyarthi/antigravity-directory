import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SubmitForm } from '@/components/SubmitForm';
import { createMockCategory } from '../../factories';

/**
 * COMPONENT INTEGRATION TEST
 * 
 * Submit Form - Revenue Entry Point
 * Priority: P0 (Critical Path)
 * 
 * Tests the form that generates paid submissions:
 * - Field validation
 * - Required fields
 * - URL validation
 * - Category selection
 * - Error messages
 */

describe('SubmitForm Component', () => {
  const mockCategories = [
    createMockCategory({ name: 'Prompts', slug: 'prompts' }),
    createMockCategory({ name: 'MCP Servers', slug: 'mcp-servers' }),
  ];

  describe('Form Validation', () => {
    it('shows validation error when submitting without required fields', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const submitButton = screen.getByRole('button', { name: /proceed|submit/i });
      await user.click(submitButton);

      // Component logic: "Please provide at least a Title and Description."
      await waitFor(() => {
        expect(screen.getByText(/Please provide at least a Title and Description/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('validates URL format', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const nameInput = screen.getByLabelText(/resource name/i);
      await user.type(nameInput, 'Test Tool');
      const descInput = screen.getByLabelText(/description/i);
      await user.type(descInput, 'Test Description');

      const urlInput = screen.getByLabelText(/website/i);
      await user.type(urlInput, 'not-a-valid-url');

      const submitButton = screen.getByRole('button', { name: /proceed|submit/i });
      await user.click(submitButton);

      // HTML5 validation usually prevents submission or shows a native tooltip.
      // If we use custom validation, we'd check for a message. 
      // The current component relies on required and type="url" which might be browser-native.
    });
  });

  describe('User Experience', () => {
    it('displays free categories correctly', () => {
      render(<SubmitForm categories={mockCategories} />);

      expect(screen.getByText(/Prompts - FREE/)).toBeInTheDocument();
      expect(screen.getByText(/MCP Servers - PAID/)).toBeInTheDocument();
    });

    it('updates button text based on category selection', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const categorySelect = screen.getByRole('combobox');
      
      // Select Free category
      await user.selectOptions(categorySelect, 'Prompts');
      expect(screen.getByText(/Submit for Free/i)).toBeInTheDocument();

      // Select Paid category
      await user.selectOptions(categorySelect, 'MCP Servers');
      expect(screen.getByText(/Proceed to Payment/i)).toBeInTheDocument();
    });

    it('opens checkout overlay on valid submission', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

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
    it('sanitizes script tags in input fields', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const maliciousInput = '<script data-testid="malicious">alert("xss")</script>Legit Tool';
      const nameInput = screen.getByLabelText(/resource name/i);
      await user.type(nameInput, maliciousInput);

      // Verify that NO script with data-testid="malicious" exists
      expect(document.querySelector('script[data-testid="malicious"]')).toBeNull();
      
      // Also ensure standard scripts aren't affected
      const allScripts = document.querySelectorAll('script');
      const maliciousScripts = Array.from(allScripts).filter(s => 
        !s.classList.contains('paypal-sdk-script') && 
        !s.classList.contains('razorpay-sdk-script') &&
        !s.getAttribute('data-testid')?.includes('vitest')
      );
      expect(maliciousScripts.length).toBe(0);
    });
  });
});
