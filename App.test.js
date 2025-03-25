import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { expect } from 'chai';
import App from './App';

describe('App Component', () => {
  it('renders RootNavigation component', () => {
    render(<App />);
    const navigationElement = screen.getByRole('navigation');
    expect(navigationElement).to.exist;
  });

  it('toggles dark mode', () => {
    render(<App />);
    const toggleButton = screen.getByRole('button', { name: /toggle dark mode/i });
    fireEvent.click(toggleButton);
    expect(document.body).to.have.style('background-color', '#121212');
  });
});