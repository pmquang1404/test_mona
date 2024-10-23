// src/CreateForm.js

import React, { useState } from "react";
import {
    Button,
    TextField,
    Typography,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'; // Icon xóa sản phẩm

const CreateForm = () => {
    // Dữ liệu sản phẩm mẫu với hình ảnh
    const initialCart = [
        {
            id: "product_a",
            name: "Product A",
            price: 100,
            quantity: 1,
            promoCode: "",
            imageUrl: "https://via.placeholder.com/50", // Hình ảnh sản phẩm
        },
        {
            id: "product_b",
            name: "Product B",
            price: 150,
            quantity: 2,
            promoCode: "",
            imageUrl: "https://via.placeholder.com/50", // Hình ảnh sản phẩm
        },
        {
            id: "product_c",
            name: "Product C",
            price: 200,
            quantity: 1,
            promoCode: "",
            imageUrl: "https://via.placeholder.com/50", // Hình ảnh sản phẩm
        },
    ];

    const [cart, setCart] = useState(initialCart);

    const handleQuantityChange = (e, productId) => {
        const { value } = e.target;
        setCart(
            cart.map((item) =>
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

    const handleDeleteProduct = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.quantity * item.price,
            0
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Order placed successfully! Total amount: ${calculateTotal()} USD`);
        // Xử lý logic submit form ở đây
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom align="center">
                Shopping Cart
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Customer Information
                        </Typography>
                        <TextField
                            fullWidth
                            required
                            name="name"
                            label="Full Name"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="email"
                            label="Email"
                            type="email"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="phone"
                            label="Phone"
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            required
                            name="address"
                            label="Address"
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Product List
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Quantity</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Promo Code</TableCell>
                                        <TableCell>Total</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cart.map((item) => (
                                        <TableRow key={item.id}>
                                            {/* Hình ảnh sản phẩm */}
                                            <TableCell>
                                                <img src={item.imageUrl} alt={item.name} width="50" />
                                            </TableCell>
                                            {/* Tên sản phẩm */}
                                            <TableCell>{item.name}</TableCell>
                                            {/* Số lượng */}
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => handleQuantityChange(e, item.id)}
                                                    fullWidth
                                                    inputProps={{ min: 0 }}
                                                />
                                            </TableCell>
                                            {/* Đơn giá */}
                                            <TableCell>
                                                <TextField
                                                    type="number"
                                                    value={item.price}
                                                    onChange={(e) => handlePriceChange(e, item.id)}
                                                    fullWidth
                                                    inputProps={{ min: 0 }}
                                                />
                                            </TableCell>
                                            {/* Mã khuyến mãi */}
                                            <TableCell>
                                                <TextField
                                                    type="text"
                                                    value={item.promoCode}
                                                    onChange={(e) => handlePromoCodeChange(e, item.id)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            {/* Tổng tiền cho sản phẩm này */}
                                            <TableCell>
                                                {item.quantity * item.price} USD
                                            </TableCell>
                                            {/* Hành động (Xóa sản phẩm) */}
                                            <TableCell>
                                                <IconButton onClick={() => handleDeleteProduct(item.id)}>
                                                    <DeleteIcon color="error" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        {/* Tổng tiền tất cả sản phẩm */}
                        <Typography variant="h6" gutterBottom align="right" style={{ marginTop: "20px" }}>
                            Total: {calculateTotal()} USD
                        </Typography>
                    </Grid>
                </Grid>

                {/* Nút submit */}
                <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                    <Grid item xs={12} md={6}>
                        <Button type="submit" fullWidth variant="contained" color="primary">
                            Place Order
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default CreateForm;
