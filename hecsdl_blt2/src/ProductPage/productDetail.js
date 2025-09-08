import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  //   Rating,
  Stack,
  Divider,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductByID } from "../redux/action/productAction";

export default function ProductDetail() {
  //   const [size, setSize] = useState("6");
  //   const [color, setColor] = useState("Royal Brown");
  const dispatch = useDispatch();
  const productid = useParams();
  dispatch(getProductByID(productid.productID));
  const productDetail = useSelector((state) => state.product.product);
  const [imageIndex, setImageIndex] = useState(0);
  const image = productDetail?.ImageURL;
  const images = Array(4).fill(image);
  console.log(productDetail, "check product");
  // const images = [
  //   "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png",
  //   "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png",
  //   "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png",
  //   "https://www.edesk.com/wp-content/uploads/2021/03/find-trending-products-sell-ecommerce.png",
  // ];

  const handleNextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Container
      sx={{
        pt: { xs: 4, sm: 22 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        gutterBottom
        sx={{ color: "text.primary" }}
      >
        Product Detail
      </Typography>{" "}
      <Box
        sx={{
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Grid container spacing={4}>
          {/* Hình ảnh sản phẩm */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: "relative" }}>
              <img
                src={images[imageIndex]}
                alt="Product"
                style={{ width: "100%", borderRadius: "8px" }}
              />
              <Box sx={{ position: "absolute", top: "50%", left: 0 }}>
                <IconButton onClick={handlePrevImage}>
                  <ArrowBackIosNewIcon />
                </IconButton>
              </Box>
              <Box sx={{ position: "absolute", top: "50%", right: 0 }}>
                <IconButton onClick={handleNextImage}>
                  <ArrowForwardIosIcon />
                </IconButton>
              </Box>
            </Box>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "8px",
                    border: imageIndex === index ? "2px solid #000" : "none",
                    cursor: "pointer",
                  }}
                  onClick={() => setImageIndex(index)}
                />
              ))}
            </Stack>
          </Grid>

          {/* Thông tin sản phẩm */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ textAlign: "left" }}
            >
              {productDetail.ProductName}
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              alignItems="stretch"
              sx={{ my: 2 }}
            >
              <Typography variant="h5" color="primary">
                {productDetail.Price}
              </Typography>
            </Stack>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "left" }}
            >
              {productDetail.Description}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "left" }}
            >
              Quantity:
              {productDetail.Quantity}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ mb: 2, textAlign: "left" }}
            >
              Category Name:
              {productDetail.CategoryName}
            </Typography>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained">Thêm vào giỏ hàng</Button>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" color="text.secondary">
              {productDetail.StoreName}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
