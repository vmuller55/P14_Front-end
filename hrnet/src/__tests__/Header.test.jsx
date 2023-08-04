import React, { Component } from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/header/Header';
import Logo from '../assets/images/logo.webp';

import { MemoryRouter } from 'react-router-dom';

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, errorInfo) {
      // You can log the error or perform any other error handling here
      console.error('Error caught in error boundary:', error, errorInfo);
      this.setState({ hasError: true });
    }
  
    render() {
      if (this.state.hasError) {
        // You can render a fallback UI when an error occurs
        return <div>Something went wrong. Please try again later.</div>;
      }
  
      return this.props.children;
    }
  }
test('renders header with logo and home link', () => {
  render(
    <ErrorBoundary>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        
    </ErrorBoundary>
  
  );
  
  // Check if the logo is rendered with the correct alt text
  const logo = screen.getByAltText('logo de HRNET');
  expect(logo).toBeInTheDocument();
  expect(logo.src).toContain(Logo);

  // Check if the header contains the title 'HRnet'
  const title = screen.getByText('HRnet');
  expect(title).toBeInTheDocument();

  // Check if the header contains a link with text 'Home'
  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  expect(homeLink.href).toContain('/');

  // You can add more tests as needed for other elements in the header.
});
