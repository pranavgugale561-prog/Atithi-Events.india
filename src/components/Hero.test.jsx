import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Hero from './Hero';

// Mock framer-motion to simplify DOM for tests
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }) => {
      const { animate, transition, initial, whileHover, style, ...domProps } = props;
      return <section style={style} {...domProps}>{children}</section>;
    },
    div: ({ children, ...props }) => {
      const { animate, transition, initial, whileHover, style, ...domProps } = props;
      return <div style={style} {...domProps}>{children}</div>;
    },
    h1: ({ children, ...props }) => {
      const { animate, transition, initial, whileHover, style, ...domProps } = props;
      return <h1 style={style} {...domProps}>{children}</h1>;
    },
    p: ({ children, ...props }) => {
      const { animate, transition, initial, whileHover, style, ...domProps } = props;
      return <p style={style} {...domProps}>{children}</p>;
    }
  },
  AnimatePresence: ({ children }) => <>{children}</>,
  useScroll: () => ({ scrollYProgress: { get: () => 0, onChange: () => {} } }),
  useTransform: () => 0,
  useSpring: () => 0
}));

describe('Hero UI/UX', () => {
  it('renders main hero content correctly', () => {
    render(<Hero />);
    
    // Check if main heading is present
    expect(screen.getByText('Crafting')).toBeTruthy();
    expect(screen.getByText('Unforgettable')).toBeTruthy();
    
    // Check if Call to Action buttons are present
    expect(screen.getByText('Plan Your Event')).toBeTruthy();
    expect(screen.getByText('View Portfolio')).toBeTruthy();
  });

  it('renders background video correctly', () => {
    const { container } = render(<Hero />);
    const video = container.querySelector('video');
    expect(video).toBeTruthy();
    expect(video.getAttribute('autoPlay')).toBeDefined();
    expect(video.getAttribute('loop')).toBeDefined();
    expect(video.getAttribute('muted')).toBeDefined();
  });
});
