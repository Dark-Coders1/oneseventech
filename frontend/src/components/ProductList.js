// src/components/ProductList.js
import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setSortedProducts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const sortProducts = () => {
      const sorted = [...products];
      if (sortOrder === 'asc') {
        sorted.sort((a, b) => a.price - b.price);
      } else if (sortOrder === 'desc') {
        sorted.sort((a, b) => b.price - a.price);
      }
      setSortedProducts(sorted);
    };

    sortProducts();
  }, [sortOrder, products]);

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) return <CircularProgress className="m-4" />;
  if (error) return <Typography color="error" className="m-4">Error: {error}</Typography>;

  return (
    <div>
      <FormControl className="mb-4 min-w-[200px]">
        <InputLabel id="sort-select-label">Sort by Price</InputLabel>
        <Select
          labelId="sort-select-label"
          id="sort-select"
          value={sortOrder}
          label="Sort by Price"
          onChange={handleSortChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="asc">Price: Low to High</MenuItem>
          <MenuItem value="desc">Price: High to Low</MenuItem>
        </Select>
      </FormControl>

      <Grid container spacing={2}>
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="h-full flex flex-col">
              <CardMedia
                component="img"
                height="140"
                image={product.image}
                alt={product.title}
                className="h-48 object-contain"
              />
              <CardContent className="flex-grow">
                <Typography gutterBottom variant="h6" component="div" className="line-clamp-2">
                  {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-2 line-clamp-3">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" className="mt-auto">
                  ${product.price.toFixed(2)}
                </Typography>
                <Button variant="contained" className="mt-2 bg-blue-500 hover:bg-blue-600" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;