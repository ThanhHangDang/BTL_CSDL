import { useState, useEffect } from "react";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { loginUser, signUp } from "../../redux/action/authAction.js";
import {
  getProductInBuyerCart,
  deleteProductInBuyerCart,
} from "../../redux/action/productAction.js";

import { useNavigate } from "react-router-dom";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "12px 12px",
}));

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

const styleModalCart = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Header() {
  // const isLoggin = useSelector((state) => state.auth.isLogin);
  const initLoggin = localStorage.getItem("isLoggin");
  const [isLoggin, setIsLoggin] = useState(initLoggin);

  const id = localStorage.getItem("userID");
  const productInBuyerCart = useSelector(
    (state) => state.product.productInBuyerCart
  );

  useEffect(() => {
    getProductInBuyerCart(id);
  }, [isLoggin]);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    navigate("/profile");
  };

  //Modal đăng nhập
  const [openLoginModal, setOpenLoginModal] = React.useState(false);
  const handleOpenLoginModal = () => setOpenLoginModal(true);
  const handleCloseLoginModal = () => setOpenLoginModal(false);

  //modal đăng ký
  const [openRegisterModal, setOpenRegisterModal] = React.useState(false);
  const handleOpenRegisterModal = () => setOpenRegisterModal(true);
  const handleCloseRegisterModal = () => setOpenRegisterModal(false);

  //modal cart
  const [openCartModal, setOpenCartModal] = React.useState(false);

  const handleOpenCartModal = () => setOpenCartModal(true);
  const handleCloseCartModal = () => setOpenCartModal(false);

  //State cho đăng nhập
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  //State cho đăng ký
  const [usernameRegister, setUsernameRegister] = useState(null);
  const [passwordRegister, setPasswordRegister] = useState(null);
  const [phoneNumberRegister, setPhoneNumberRegister] = useState(null);
  const [emailRegister, setEmailRegister] = useState(null);
  const [firstnameRegister, setFirstnameRegister] = useState(null);
  const [lastNameRegister, setLastnameRegister] = useState(null);
  const [storenameRegister, setStorenameRegister] = useState(null);

  const navigate = useNavigate();
  const homeNavigate = () => {
    navigate("/");
  };

  const handleDeleteProductInCart = (productID) => {
    dispatch(deleteProductInBuyerCart(id, productID));
  };

  const handleLogout = () => {
    const newIsLoggin = localStorage.setItem("isLoggin", false);
    setIsLoggin(newIsLoggin);
    navigate("/");
    localStorage.removeItem("userID");
  };
  return (
    <>
      <div>
        {/* Modal đăng nhập */}
        <Modal
          open={openLoginModal}
          onClose={handleCloseLoginModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(loginUser(username, password));
                localStorage.setItem("isLoggin", true);
                setIsLoggin(localStorage.getItem("isLoggin"));
                handleCloseLoginModal();
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <div>
        {/* Modal đăng ký */}
        <Modal
          open={openRegisterModal}
          onClose={handleCloseRegisterModal}
          aria-labelledby="register-modal-title"
          aria-describedby="register-modal-description"
        >
          <Box sx={styleModal}>
            <Typography id="register-modal-title" variant="h6" component="h2">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(
                  usernameRegister,
                  passwordRegister,
                  emailRegister,
                  phoneNumberRegister,
                  lastNameRegister,
                  firstnameRegister,
                  storenameRegister
                );
                dispatch(
                  signUp(
                    usernameRegister,
                    passwordRegister,
                    phoneNumberRegister,
                    emailRegister,
                    firstnameRegister,
                    lastNameRegister,
                    setStorenameRegister
                  )
                );
                handleCloseRegisterModal();
              }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoFocus
                onChange={(e) => {
                  setUsernameRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={(e) => {
                  setPasswordRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                type="email"
                onChange={(e) => {
                  setEmailRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                onChange={(e) => {
                  setPhoneNumberRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="firstName"
                label="First Name"
                name="firstName"
                onChange={(e) => {
                  setFirstnameRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={(e) => {
                  setLastnameRegister(e.target.value);
                }}
              />
              <TextField
                margin="normal"
                // required
                fullWidth
                id="storeName"
                label="Store Name (If you are Seller)"
                name="storeName"
                onChange={(e) => {
                  setStorenameRegister(e.target.value);
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <div>
        {/* modal cart */}
        <Modal
          open={openCartModal}
          onClose={handleCloseCartModal}
          aria-labelledby="cart-modal-title"
          aria-describedby="cart-modal-description"
        >
          <Box sx={styleModalCart}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end", // Căn giữa ngang
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleCloseCartModal}
              >
                X
              </Button>
            </Box>
            <Typography id="cart-modal-title" variant="h6" component="h2">
              Cart
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {productInBuyerCart ? (
                    productInBuyerCart.map((product, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {product.ProductName || "Không rõ tên sản phẩm"}
                        </TableCell>
                        <TableCell>{product.ImageURL || " "}</TableCell>
                        <TableCell align="right">
                          {product.Price || "0"}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            onClick={() => {
                              handleDeleteProductInCart(product.ProductID);
                            }}
                          >
                            x
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center">
                        Cart is empty.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Modal>
      </div>

      <AppBar
        position="fixed"
        enableColorOnDark
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: "calc(var(--template-frame-height, 0px) + 28px)",
        }}
      >
        <Container maxWidth="lg">
          <StyledToolbar variant="dense" disableGutters>
            <Box
              sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
            >
              <Typography variant="h4" color="info">
                Group 6
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Button
                  variant="text"
                  color="info"
                  size="small"
                  sx={{ mx: 3 }}
                  onClick={homeNavigate}
                >
                  Home
                </Button>

                {isLoggin && isLoggin ? (
                  <Button
                    variant="text"
                    color="info"
                    size="small"
                    onClick={handleClick}
                  >
                    Profile
                  </Button>
                ) : (
                  ""
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              {isLoggin ? (
                <>
                  <ShoppingCartOutlinedIcon
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleOpenCartModal}
                  />

                  <AccountCircleOutlinedIcon
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleLogout}
                  />
                </>
              ) : (
                <>
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={handleOpenLoginModal}
                  >
                    Sign in
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={handleOpenRegisterModal}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
              <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    top: "var(--template-frame-height, 0px)",
                  },
                }}
              >
                <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <IconButton onClick={toggleDrawer(false)}>
                      <CloseRoundedIcon />
                    </IconButton>
                  </Box>

                  <MenuItem>Home</MenuItem>
                  <MenuItem>Category</MenuItem>
                  <Divider sx={{ my: 3 }} />
                  {isLoggin ? (
                    <>
                      <MenuItem>
                        <ShoppingCartOutlinedIcon
                          color="primary"
                          variant="text"
                          size="small"
                          onClick={handleOpenCartModal}
                        />
                      </MenuItem>
                      <MenuItem>
                        <AccountCircleOutlinedIcon
                          color="primary"
                          variant="text"
                          size="small"
                          onClick={handleLogout}
                        />
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="contained"
                          fullWidth
                          onClick={handleOpenRegisterModal}
                        >
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button
                          color="primary"
                          variant="outlined"
                          fullWidth
                          onClick={handleOpenLoginModal}
                        >
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
}
