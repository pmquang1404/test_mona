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
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
} from "@mui/material";
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete'; // Icon xóa sản phẩm
import { Link } from "react-router-dom";


const CreateForm = ({ cartItems, onRemoveFromCart, onQuantityChange, onPriceChange, onPromoCodeChange, calculateTotal }) => {

    const [paymentMethod, setPaymentMethod] = useState('card'); // Phương thức thanh toán mặc định là thẻ
    const [cashGiven, setCashGiven] = useState(""); // Số tiền khách đưa khi chọn thanh toán bằng tiền mặt


    const totalAmount = calculateTotal();

    const lengthProduct = cartItems?.length

    const isButtonActive = (paymentMethod === 'card') || (paymentMethod === "cash" && cashGiven && parseFloat(cashGiven) >= totalAmount);
    console.log(isButtonActive)
    const handleSubmit = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure order ?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, I want to order"
        }).then((result) => {
            if (result.isConfirmed) {
                if (paymentMethod === 'cash' && cashGiven < totalAmount) {
                    Swal.fire({
                        title: "Order failed!",
                        text: `Số tiền khách đưa không đủ`,
                        icon: "error"
                    });
                } else {
                    const change = paymentMethod === 'cash' && cashGiven > totalAmount
                        ? `Change returned to the customer: ${cashGiven - totalAmount} USD`
                        : '';
                    Swal.fire({
                        title: "Order success!",
                        text: `Order placed successfully! Total amount: ${totalAmount} USD. ${change}`,
                        icon: "success"
                    });
                }






                // alert(`Order placed successfully! Total amount: ${totalAmount} USD. ${change}`);
            }
        });

        // Xử lý logic submit form ở đây
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handleCashGivenChange = (e) => {

        const inputValue = e.target.value;

        // Nếu trường nhập liệu trống, trả về chuỗi rỗng
        if (inputValue === "") {
            setCashGiven("");
        }

        // Chỉ cho phép nhập số dương
        if (/^[0-9\b]+$/.test(inputValue)) {
            setCashGiven(inputValue);
        }
        // setCashGiven(parseFloat(e.target.value) || 0);
    };





    return (
        <Container maxWidth="md" sx={{ paddingBottom: "100px" }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ marginTop: "16px" }}>
                Shopping Cart
            </Typography>
            {lengthProduct > 0
                ?
                (<form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12} >
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

                        <Grid item xs={12} >
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
                                        {cartItems.map((item) => (
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
                                                        onChange={(e) => onQuantityChange(e, item.id)}
                                                        sx={{ width: "70px" }}
                                                        inputProps={{ min: 0 }}
                                                    />
                                                </TableCell>
                                                {/* Đơn giá */}
                                                <TableCell>
                                                    {item.price}
                                                </TableCell>
                                                {/* Mã khuyến mãi */}
                                                <TableCell>
                                                    <TextField
                                                        type="text"
                                                        value={item.promoCode}
                                                        onChange={(e) => onPromoCodeChange(e, item.id)}
                                                        fullWidth
                                                        placeholder="Enter Promo Code"
                                                    />
                                                </TableCell>
                                                {/* Tổng tiền cho sản phẩm này */}
                                                <TableCell>
                                                    {item.quantity * item.price} USD
                                                </TableCell>
                                                {/* Hành động (Xóa sản phẩm) */}
                                                <TableCell>
                                                    <IconButton onClick={() => onRemoveFromCart(item.id)}>
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

                    {/* Lựa chọn phương thức thanh toán */}
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Payment Method</FormLabel>
                            <RadioGroup
                                aria-label="payment-method"
                                name="paymentMethod"
                                value={paymentMethod}
                                onChange={handlePaymentMethodChange}
                            >
                                <FormControlLabel value="card" control={<Radio />} label="Card" />
                                <FormControlLabel value="cash" control={<Radio />} label="Cash" />
                            </RadioGroup>
                        </FormControl>

                        {/* Input nhập số tiền khách đưa (chỉ hiện khi chọn thanh toán bằng tiền mặt) */}
                        {paymentMethod === 'cash' && (
                            <>
                                <TextField
                                    label="Cash Given"
                                    type="number"
                                    value={cashGiven}
                                    onChange={handleCashGivenChange}
                                    fullWidth
                                    margin="normal"
                                    inputProps={{
                                        min: 1,
                                        style: {
                                            MozAppearance: 'textfield',
                                        },
                                    }}
                                    sx={{
                                        '& input[type=number]': {
                                            MozAppearance: 'textfield',
                                        },
                                        '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
                                            WebkitAppearance: 'none',
                                            margin: 0,
                                        },
                                    }}
                                />
                                {!isButtonActive ? <Typography sx={{ color: "red" }}>Please enter an amount greater than the total amount</Typography> : <></>}
                            </>
                        )}

                        {/* Hiển thị tiền thừa trả khách nếu cần */}
                        {paymentMethod === 'cash' && cashGiven > calculateTotal() && (
                            <Typography variant="h6" gutterBottom align="right" style={{ marginTop: "10px" }}>
                                Change to return: {cashGiven - calculateTotal()} USD
                            </Typography>
                        )}
                    </Grid>

                    {/* Nút submit */}
                    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                        <Grid item xs={12} md={6}>
                            <Button type="submit" fullWidth variant="contained" color="primary" disabled={!isButtonActive}>
                                Place Order
                            </Button>
                        </Grid>
                    </Grid>


                </form>)
                :
                <>
                    <Typography sx={{ fontSize: "24px", marginBottom: "32px" }}>Giỏ hàng bạn còn trống</Typography>
                    <Link to="/" style={{ padding: "16px", backgroundColor: "#00a1ff", color: "#fff", textDecoration: "none", borderRadius: "6px" }}>Quay trở lại cửa hàng</Link>
                </>
            }
        </Container >
    );
};

export default CreateForm;
