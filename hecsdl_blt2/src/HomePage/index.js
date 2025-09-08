import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
// import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";

import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import Chip from "@mui/material/Chip";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProduct,
  getCategory,
  getProductByCategory,
  addProductInBuyerCart,
} from "../redux/action/productAction";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search product name…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function HomePage() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userID");
  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllProduct());
  }, []);

  const listCategory = useSelector((state) => state.product.category);
  const listProduct = useSelector((state) => state.product.listProducts);
  const handleClick = (index) => {
    dispatch(getProductByCategory(index));
    console.log(listProduct, "check list product");
  };

  const handleClickAll = () => {
    dispatch(getAllProduct());
  };

  const handleAddCart = (productID) => {
    dispatch(addProductInBuyerCart(id, productID));
  };

  return (
    <Container
      id="testimonials"
      sx={{
        pt: { xs: 4, sm: 16 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          Products
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          "Shop smart, live stylishly - Discover now!"
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          width: { xs: "100%", md: "fit-content" },
          overflow: "auto",
          // justifyContent: "flex-end",
        }}
      >
        <Search />
      </Box>
      <Box
        sx={{
          display: "inline-flex",
          flexDirection: "row",
          gap: 3,
          // overflow: "auto",
        }}
      >
        <Chip onClick={handleClickAll} size="medium" label="All products" />
        {listCategory &&
          listCategory.map((item, index) => {
            return (
              <Chip
                key={index}
                onClick={() => handleClick(item.CategoryID)}
                size="medium"
                label={item.CategoryName}
                sx={{
                  backgroundColor: "transparent",
                  border: "none",
                }}
              />
            );
          })}
      </Box>

      <Grid container spacing={2}>
        {listProduct &&
          listProduct.map((item, index) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                variant="outlined"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flexGrow: 1,
                }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item.ImageURL}
                  title="green iguana"
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <CardHeader
                    //   avatar={testimonial.avatar}
                    title={item.ProductName}
                    //   subheader={testimonial.occupation}
                  />
                </Box>
                <CardContent>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    {item.Description}
                  </Typography>
                  <Typography
                    variant="body1"
                    gutterBottom
                    sx={{ color: "text.secondary" }}
                  >
                    Quantity
                    {item.Quantity}
                  </Typography>
                </CardContent>

                <CardActions>
                  <NavLink to={`/product/${item.ProductID}`}>
                    <Button size="small">Detail</Button>
                  </NavLink>
                  <Button
                    size="small"
                    onClick={() => handleAddCart(item.ProductID)}
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
}
