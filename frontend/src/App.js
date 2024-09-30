import React, { useState }from 'react';
import { AppBar, Toolbar, Typography, Container, IconButton, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import ProductList from './components/ProductList';
import CartSidebar from './components/CartSidebar';
import { CartProvider, useCart } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './utils/stripe';

function AppContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <AppBar position="static" className="bg-blue-600">
        <Toolbar>
          <Typography variant="h6" component="div" className="flex-grow">
            Product Catalog
          </Typography>
          <IconButton color="inherit" onClick={toggleCart}>
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container className="mt-4">
        <ProductList />
      </Container>
      <CartSidebar isOpen={isCartOpen} onClose={toggleCart} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Elements stripe={stripePromise}>
        <AppContent />
      </Elements>
    </CartProvider>
  );
}

export default App;