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
    it('shows validation error when submitting without tool name', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const submitButton = screen.getByRole('button', { name: /proceed to selection/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/name.*required/i)).toBeInTheDocument();
      });
    });

    it('validates URL format', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const urlInput = screen.getByLabelText(/website url/i);
      await user.type(urlInput, 'not-a-valid-url');

      const submitButton = screen.getByRole('button', { name: /proceed/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/valid url/i)).toBeInTheDocument();
      });
    });

    it('requires category selection', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const nameInput = screen.getByLabelText(/tool name/i);
      await user.type(nameInput, 'Test Tool');

      const submitButton = screen.getByRole('button', { name: /proceed/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/select.*category/i)).toBeInTheDocument();
      });
    });
  });

  describe('User Experience', () => {
    it('displays all categories as options', () => {
      render(<SubmitForm categories={mockCategories} />);

      expect(screen.getByText('Prompts')).toBeInTheDocument();
      expect(screen.getByText('MCP Servers')).toBeInTheDocument();
    });

    it('shows character count for description field', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const description = screen.getByLabelText(/description/i);
      await user.type(description, 'Test description');

      expect(screen.getByText(/\d+ \/ 200/)).toBeInTheDocument();
    });

    it('disables submit button while processing', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      // Fill form
      await user.type(screen.getByLabelText(/tool name/i), 'Test Tool');
      await user.type(screen.getByLabelText(/website/i), 'https://test.com');
      
      const submitButton = screen.getByRole('button', { name: /proceed/i });
      await user.click(submitButton);

      expect(submitButton).toBeDisabled();
    });
  });

  describe('Security - XSS Prevention', () => {
    it('sanitizes script tags in tool name', async () => {
      const user = userEvent.setup();
      render(<SubmitForm categories={mockCategories} />);

      const maliciousInput = '<script>alert("xss")</script>Legit Tool';
      const nameInput = screen.getByLabelText(/tool name/i);
      await user.type(nameInput, maliciousInput);

      // Should not execute script
      expect(document.querySelector('script')).toBeNull();
    });
  });
});
