import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Loader from '../Loader';

describe('Loader UI/UX Tests', () => {
  beforeEach(() => {
    // Clear session storage before each test
    sessionStorage.clear();
  });

  it('renders the loader if session storage is empty', () => {
    render(<Loader onComplete={() => {}} />);
    // Check if the logo image is rendered
    const logo = screen.getByAltText('Atithi Events');
    expect(logo).toBeInTheDocument();
  });

  it('does not render if already loaded in session', () => {
    sessionStorage.setItem('atithi_loaded', 'true');
    const { container } = render(<Loader onComplete={() => {}} />);
    // Should be empty as it returns null
    expect(container).toBeEmptyDOMElement();
  });

  it('calls onComplete when session storage is already true', () => {
    sessionStorage.setItem('atithi_loaded', 'true');
    const onCompleteMock = vi.fn();
    render(<Loader onComplete={onCompleteMock} />);
    expect(onCompleteMock).toHaveBeenCalled();
  });
});
