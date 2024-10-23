// src/ProductPage.js

import React from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
} from '@mui/material';

// Dữ liệu sản phẩm (mock data)
const mockProducts = [
    {
        id: 'product_a',
        name: 'Samsung S24',
        price: 100,
        quantity: 1,
        promoCode: "",
        imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png',
    },
    {
        id: 'product_b',
        name: 'iPhone 16 Pro',
        price: 150,
        quantity: 1,
        promoCode: "",
        imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-16-pro_1.png',
    },
    {
        id: 'product_c',
        name: 'iPhone 14 Pro',
        price: 200,
        quantity: 1,
        promoCode: "",
        imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__5.png',
    },
    {
        id: 'product_d',
        name: 'Macbook Air M3',
        price: 250,
        quantity: 1,
        promoCode: "",
        imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/m/a/macbook_1__1_8.png',
    },
    {
        id: 'product_e',
        name: 'iPad Air',
        price: 300,
        quantity: 1,
        promoCode: "",
        imageUrl: 'https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/ipad-10-9-inch-2022.png',
    },
];

const ProductPage = ({ handleAddToCart }) => {


    return (
        <Container maxWidth="lg" style={{ marginTop: '20px', paddingBottom: "100px" }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ margin: "50px 0px" }}>
                All Products
            </Typography>
            <Grid container spacing={3}>
                {mockProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={3} key={product.id}>
                        <Card
                            sx={{
                                cursor: "pointer",

                                '&:hover .name': {
                                    color: '#d60326',
                                    transition: "0.2s all ease-in",
                                },
                                '&:hover .img': {
                                    transition: "0.2s transform ease-in",
                                    transform: 'scale(1.1)', // Thêm hiệu ứng zoom khi hover
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                alt={product.name}
                                height="auto"
                                maxWidth="100%"
                                image={product.imageUrl}
                                className='img'

                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom className='name' sx={{ fontWeight: 600 }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body1" sx={{
                                    color: "#d70018",
                                    fontWeight: 600,
                                    fontSize: "20px"
                                }}>
                                    ${product.price}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button
                                    size="large"
                                    color="primary"
                                    fullWidth
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ProductPage;
