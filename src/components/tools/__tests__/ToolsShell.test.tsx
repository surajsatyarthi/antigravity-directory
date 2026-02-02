import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Fix for toBeInTheDocument
import { ToolsShell } from '@/components/tools/ToolsShell';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  Menu: () => <div data-testid="menu-icon" />,
  PanelLeftClose: () => <div data-testid="close-icon" />,
  PanelLeftOpen: () => <div data-testid="open-icon" />,
  Calculator: () => <div />,
  Code2: () => <div />,
  Terminal: () => <div />,
  FileJson: () => <div />,
  Split: () => <div />,
  Binary: () => <div />,
}));

// Mock Next.js hooks
vi.mock('next/navigation', () => ({
  usePathname: () => '/tools/token-counter',
}));

describe('ToolsShell Component', () => {
  beforeEach(() => {
    // Reset window width to desktop default
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
    window.dispatchEvent(new Event('resize'));
  });

  it('renders children correctly', () => {
    render(
      <ToolsShell>
        <div data-testid="child-content">Child Content</div>
      </ToolsShell>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders sidebar by default on desktop', () => {
    render(<ToolsShell>Content</ToolsShell>);
    // Sidebar should be present. Based on component logic, we can check for text that appears in sidebar
    expect(screen.getByText('AI Developer Tools')).toBeInTheDocument();
  });

  it('toggles sidebar when toggle button is clicked', () => {
    render(<ToolsShell>Content</ToolsShell>);
    
    // Initially open (desktop), click to close
    const toggleButton = screen.getByTitle('Close Sidebar');
    fireEvent.click(toggleButton);
    
    // Should now show open icon button
    expect(screen.getByTitle('Open Sidebar')).toBeInTheDocument();
  });

  it('automatically closes sidebar on mobile', () => {
    // Simulate mobile width
    act(() => {
      Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
      window.dispatchEvent(new Event('resize'));
    });

    render(<ToolsShell>Content</ToolsShell>);
    
    // Sidebar should be hidden/collapsed logic triggers
    // The component sets isSidebarOpen to false on mobile mount
    // We check if the toggle button shows "Open Sidebar" state
    expect(screen.getByTitle('Open Sidebar')).toBeInTheDocument();
  });
});
