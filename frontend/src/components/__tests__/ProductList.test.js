import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ProductList from '../ProductList';
import { CartProvider } from '../../context/CartContext';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([
      { id: 1, title: 'Product 1', price: 10.99, image: 'image1.jpg', description: 'Description 1' },
      { id: 2, title: 'Product 2', price: 20.99, image: 'image2.jpg', description: 'Description 2' },
    ]),
  })
);

describe('ProductList Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders loading state initially', () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('allows sorting products by price', async () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const sortSelect = screen.getByLabelText('Sort by Price');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });

    expect(screen.getAllByRole('heading', { level: 6 })[0]).toHaveTextContent('Product 2');
  });

  it('adds product to cart when "Add to Cart" button is clicked', async () => {
    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
    });

    const addToCartButton = screen.getAllByText('Add to Cart')[0];
    fireEvent.click(addToCartButton);
  });

  it('handles fetch error', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('API error'));

    render(
      <CartProvider>
        <ProductList />
      </CartProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: API error')).toBeInTheDocument();
    });
  });
});
