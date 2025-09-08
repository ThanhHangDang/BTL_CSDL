import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// MUI Components
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

// Redux Actions
import {
  deleteProductOfSeller,
  editProductOfSeller,
  getProductOfSeller,
  addProductOfSeller,
} from "../redux/action/productAction";

export default function MyProduct() {
  const [productEdit, setEditProduct] = useState(null); // Initialize as null
  const dispatch = useDispatch();
  const listProduct = useSelector((state) => state.product.productOfSeller);
  const id = localStorage.getItem("userID");

  //modal add
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const handleOpenAddProductModal = () => setOpenAddProductModal(true);
  const handleCloseAddProductModal = () => setOpenAddProductModal(false);

  const [addProductID, setAddProductID] = useState("");
  const [addProductName, setAddProductName] = useState("");
  const [addPrice, setAddPrice] = useState("");
  const [addQuantity, setAddQuantity] = useState("");
  const [addImageURL, setAddImageURL] = useState("");
  const [addDescription, setAddDescription] = useState("");

  // Modal for Add/Edit Product
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => {
    setProductID("");
    setProductName("");
    setPrice("");
    setQuantity("");
    setImageURL("");
    setDescription("");
    setEditProduct(null); // Reset edit state
    setOpenRegisterModal(false);
  };

  // Form state
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  const handleEdit = (product) => {
    setEditProduct(product);
    handleOpenRegisterModal();
  };

  const handleUpdateProduct = () => {
    // Logic for updating the product can be added here
    console.log({
      productId,
      productName,
      price,
      quantity,
      imageURL,
      description,
    });
    dispatch(
      editProductOfSeller(
        productId,
        productName,
        imageURL,
        price,
        quantity,
        description
      )
    );
    handleCloseRegisterModal();
  };

  const handleAddProduct = () => {
    dispatch(
      addProductOfSeller(
        id,
        addProductID,
        addProductName,
        addImageURL,
        addPrice,
        addQuantity,
        addDescription
      )
    );
    handleCloseAddProductModal();
  };

  useEffect(() => {
    if (productEdit) {
      setProductID(productEdit.ProductID);
      setProductName(productEdit.ProductName);
      setPrice(productEdit.Price);
      setQuantity(productEdit.Quantity);
      setImageURL(productEdit.ImageURL);
      setDescription(productEdit.Description);
    }
  }, [productEdit]);

  useEffect(() => {
    dispatch(getProductOfSeller(id));
  }, [dispatch, id]);

  const handleDeleteProduct = (productID) => {
    dispatch(deleteProductOfSeller(id, productID));
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    console.log({ productName, price, quantity, imageURL, description });
    handleCloseRegisterModal();
  };

  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <Container
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
      <Box sx={{ flex: 1, width: "100%" }}>
        <Typography sx={{ mb: 2 }}>My Products</Typography>
        <Button
          size="sm"
          variant="solid"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
            mb: 2,
            display: "flex",
          }}
          onClick={handleOpenRegisterModal}
        >
          Add Product
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ProductID</TableCell>
                <TableCell align="center">Product Name</TableCell>
                <TableCell align="center">Image</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Quantity</TableCell>
                <TableCell align="center">Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listProduct?.map((product, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.ProductID}
                  </TableCell>
                  <TableCell align="center">{product.ProductName}</TableCell>
                  <TableCell align="center">
                    <img
                      width={40}
                      height={40}
                      src={product.ImageURL}
                      alt="No image"
                    ></img>
                  </TableCell>
                  <TableCell align="center">{product.Price}</TableCell>
                  <TableCell align="center">{product.Quantity}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => handleEdit(product)}>Edit</Button>
                    <Button
                      onClick={() => handleDeleteProduct(product.ProductID)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Add/Edit Product Modal */}
      <Modal
        open={openRegisterModal}
        onClose={handleCloseRegisterModal}
        aria-labelledby="edit-product-modal-title"
        aria-describedby="edit-product-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="edit-product-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <Box component="form" onSubmit={handleSubmitProduct}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoFocus
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="imageURL"
              label="Image URL"
              name="imageURL"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpdateProduct}
            >
              Save Product
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* modal add */}
      <Modal
        open={openAddProductModal}
        onClose={handleCloseAddProductModal}
        aria-labelledby="edit-product-modal-title"
        aria-describedby="edit-product-modal-description"
      >
        <Box sx={styleModal}>
          <Typography id="edit-product-modal-title" variant="h6" component="h2">
            Edit Product
          </Typography>
          <Box component="form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="productName"
              label="Product Name"
              name="productName"
              autoFocus
              // value={productName}
              onChange={(e) => setAddProductName(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="price"
              label="Price"
              name="price"
              type="number"
              // value={price}
              onChange={(e) => setAddPrice(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              type="number"
              // value={quantity}
              onChange={(e) => setAddQuantity(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="imageURL"
              label="Image URL"
              name="imageURL"
              // value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              // value={description}
              onChange={(e) => setAddDescription(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleAddProduct}
            >
              Add Product
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
