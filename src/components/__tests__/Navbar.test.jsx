import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

describe('Navbar UI/UX Tests', () => {
  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
  };

  it('renders the brand logo', () => {
    renderNavbar();
    const logo = screen.getByAltText('Atithi Events');
    expect(logo).toBeInTheDocument();
  });

  it('renders primary navigation links', () => {
    renderNavbar();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Work Timeline')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders the Admin login button', () => {
    renderNavbar();
    const adminBtn = screen.getByText('Admin');
    expect(adminBtn).toBeInTheDocument();
    expect(adminBtn.closest('a')).toHaveAttribute('href', '/admin/login');
  });
});
