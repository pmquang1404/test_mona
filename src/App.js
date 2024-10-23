// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductPage from './page/ProductPage';
import CreateOrder from './page/CreateOrder';
import Swal from 'sweetalert2'

import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {

  const [cart, setCart] = useState([]);

  const mockPromoCodes = {
    PROMO10: { type: 'amount', value: 10 },  // Giảm trực tiếp 10 USD
    PROMO20PERCENT: { type: 'percent', value: 20 },  // Giảm 20%
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);

      if (existingProduct) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng lên 1
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới với số lượng 1
      return [
        ...prevCart,
        { ...product, quantity: 1, promoCode: "" }, // Thêm quantity và promoCode
      ];
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.name} has been added to the cart`,
      showConfirmButton: false,
      timer: 1500
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (e, productId) => {
    const { value } = e.target;
    setCart((prevCart) => prevCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: parseInt(value) || 0 }
        : item
    )
    );
  };

  const handlePriceChange = (e, productId) => {
    const { value } = e.target;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, price: parseFloat(value) || 0 } : item
      )
    );
  };

  const handlePromoCodeChange = (e, productId) => {
    const { value } = e.target;
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, promoCode: value } : item
      )
    );
  };

  const applyPromoCode = (price, promoCode) => {
    const promo = mockPromoCodes[promoCode];
    if (promo) {
      if (promo.type === 'amount') {
        return Math.max(0, price - promo.value); // Giảm trực tiếp số tiền, không thể âm
      } else if (promo.type === 'percent') {
        return Math.max(0, price - (price * (promo.value / 100))); // Giảm theo phần trăm
      }
    }
    return price; // Nếu không có mã hoặc mã không hợp lệ, trả lại giá gốc
  };


  const calculateTotalForItem = (item) => {
    const discountedPrice = applyPromoCode(item.price, item.promoCode);
    return discountedPrice * item.quantity;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + calculateTotalForItem(item),
      0
    );
  };

  console.log("cart page App: ", cart)



  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            My Store
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            Cart
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" exact element={<ProductPage handleAddToCart={handleAddToCart} />} />
        <Route
          path="/cart"
          element={
            <CreateOrder
              cartItems={cart}
              onRemoveFromCart={handleRemoveFromCart}
              onQuantityChange={handleQuantityChange}
              onPriceChange={handlePriceChange}
              onPromoCodeChange={handlePromoCodeChange}
              calculateTotal={calculateTotal}
            />
          } />
      </Routes>
    </Router>
  );
}

export default App;
