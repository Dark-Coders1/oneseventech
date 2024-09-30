// src/components/CartSidebar.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, IconButton, Button } from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useStripe } from '@stripe/react-stripe-js';


const CartSidebar = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart();
  const stripe = useStripe();

  const handleCheckout = async () => {
    console.log('cart',cart)
    const response = await fetch('http://localhost:8000/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      <div className="w-80 px-16">
        <Typography variant="h6" className="mb-4">Shopping Cart</Typography>
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} className="flex flex-col items-start">
              <ListItemAvatar>
                <Avatar src={item.image} alt={item.name} variant="square" sx={{ width: 60, height: 60, marginRight: 2 }} />
              </ListItemAvatar>
              <div className="flex justify-between w-full">
                <Typography variant="subtitle1">{item.title}</Typography>
                <IconButton onClick={() => removeFromCart(item.id)} size="small">
                  <Delete />
                </IconButton>
              </div>
              <ListItemText secondary={`$${item.price.toFixed(2)}`} />
              <div className="flex items-center mt-2">
                <IconButton onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} size="small">
                  <Remove />
                </IconButton>
                <Typography className="mx-2">{item.quantity}</Typography>
                <IconButton onClick={() => updateQuantity(item.id, item.quantity + 1)} size="small">
                  <Add />
                </IconButton>
              </div>
            </ListItem>
          ))}
        </List>
        <Typography variant="h6" className="mt-4">Total: ${getTotalPrice().toFixed(2)}</Typography>
        <Button variant="contained" color="primary" fullWidth className="mt-4" onClick={handleCheckout}>
          Checkout
        </Button>
      </div>
    </Drawer>
  );
};

export default CartSidebar;