import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Stack, Divider } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import TextField from "@mui/material/TextField";
import {
  editUserInformationByID,
  getUserInformationByID,
} from "../redux/action/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProfileInfo() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("userID");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    FirstName: "",
    LastName: "",
    Username: "",
    StoreName: "",
    PhoneNumber: "",
    Email: "",
  });

  // Lấy thông tin user từ Redux
  const userInfo = useSelector((state) => state.user.userInformation);

  // Gọi API để lấy thông tin user
  useEffect(() => {
    if (id) {
      dispatch(getUserInformationByID(id));
    } else {
      navigate("/");
    }
  }, [id, dispatch]);

  // Cập nhật formValues khi userInfo thay đổi
  useEffect(() => {
    if (userInfo) {
      setFormValues({
        FirstName: userInfo.FirstName || "",
        LastName: userInfo.LastName || "",
        Username: userInfo.Username || "",
        StoreName: userInfo.StoreName || "",
        PhoneNumber: userInfo.PhoneNumber || "",
        Email: userInfo.Email || "",
      });
    }
  }, [userInfo]);

  // Xử lý khi người dùng chỉnh sửa form
  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
    console.log(formValues, "checking state");
  };

  const handleSave = () => {
    dispatch(
      editUserInformationByID(
        formValues.Username,
        formValues.Email,
        formValues.PhoneNumber,
        formValues.LastName,
        formValues.FirstName
      )
    );
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
        <Box
          sx={{
            position: "sticky",
            top: { sm: -100, md: -110 },
            bgcolor: "background.body",
            zIndex: 9995,
          }}
        >
          <Box sx={{ px: { xs: 2, md: 6 } }}>
            <Typography level="h2" component="h1" sx={{ mt: 1, mb: 2 }}>
              My profile
            </Typography>
          </Box>
        </Box>
        <Stack
          spacing={4}
          sx={{
            display: "flex",
            mx: "auto",
            px: { xs: 2, md: 6 },
            py: { xs: 2, md: 3 },
          }}
        >
          <Card>
            <Divider />
            <Stack
              direction="row"
              spacing={3}
              sx={{
                display: { xs: "none", md: "flex" },
                my: 1,
                p: { xs: 2, md: 2 },
              }}
            >
              <Stack direction="column" spacing={1}>
                <img
                  style={{
                    flex: 1,
                    minWidth: 120,
                    borderRadius: "100%",
                    maxHeight: 180,
                  }}
                  src="./images/default-avatar.png"
                  srcSet="./images/default-avatar.png"
                  loading="lazy"
                  alt=""
                />
              </Stack>
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <FormLabel></FormLabel>
                  <FormControl
                    sx={{
                      display: { sm: "flex-column", md: "flex-row" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      size="sm"
                      placeholder="First Name"
                      value={formValues.FirstName}
                      onChange={handleChange("FirstName")}
                    />
                    <TextField
                      size="sm"
                      placeholder="Last Name"
                      sx={{ flexGrow: 1 }}
                      value={formValues.LastName}
                      onChange={handleChange("LastName")}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Username</FormLabel>
                    <TextField
                      disabled
                      size="sm"
                      value={formValues.Username}
                      onChange={handleChange("Username")}
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Store Name</FormLabel>
                    <TextField
                      disabled
                      size="sm"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="StoreName"
                      value={formValues.StoreName}
                      sx={{ flexGrow: 1 }}
                      onChange={handleChange("StoreName")}
                    />
                  </FormControl>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <TextField
                      size="sm"
                      value={formValues.PhoneNumber}
                      onChange={handleChange("PhoneNumber")}
                    />
                  </FormControl>
                  <FormControl sx={{ flexGrow: 1 }}>
                    <FormLabel>Email</FormLabel>
                    <TextField
                      size="sm"
                      type="email"
                      startDecorator={<EmailRoundedIcon />}
                      placeholder="email"
                      value={formValues.Email}
                      sx={{ flexGrow: 1 }}
                      onChange={handleChange("Email")}
                    />
                  </FormControl>
                </Stack>
              </Stack>
            </Stack>
            <Stack
              direction="column"
              spacing={2}
              sx={{ display: { xs: "flex", md: "none" }, my: 1 }}
            >
              <Stack direction="row" spacing={2}>
                <Stack direction="column" spacing={1}>
                  <img
                    style={{
                      flex: 1,
                      minWidth: 80,
                      borderRadius: "100%",
                      maxHeight: 108,
                    }}
                    src="./images/default-avatar.png"
                    srcSet="./images/default-avatar.png"
                    loading="lazy"
                    alt=""
                  />
                </Stack>
                <Stack spacing={1} sx={{ flexGrow: 1 }}>
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    sx={{
                      display: {
                        sm: "flex-column",
                        md: "flex-row",
                      },
                      gap: 2,
                    }}
                  >
                    <TextField
                      size="sm"
                      placeholder="First Name"
                      defaultValue="0123456789"
                    />
                    <TextField
                      size="sm"
                      placeholder="Last Name"
                      defaultValue="0123456789"
                    />
                  </FormControl>
                </Stack>
              </Stack>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <TextField size="sm" defaultValue="UI Developer" />
              </FormControl>
              <FormControl>
                <FormLabel>Store Name</FormLabel>
                <TextField size="sm" defaultValue="UI Developer" />
              </FormControl>
              <FormControl>
                <FormLabel>Phone Number</FormLabel>
                <TextField size="sm" defaultValue="UI Developer" />
              </FormControl>
              <FormControl sx={{ flexGrow: 1 }}>
                <FormLabel>Email</FormLabel>
                <TextField
                  size="sm"
                  type="email"
                  startDecorator={<EmailRoundedIcon />}
                  placeholder="email"
                  defaultValue="siriwatk@test.com"
                  sx={{ flexGrow: 1 }}
                />
              </FormControl>
            </Stack>
            <Box sx={{ borderTop: "1px solid", borderColor: "divider" }}>
              <CardActions sx={{ alignSelf: "flex-end", pt: 2 }}>
                <Button
                  onClick={handleSave}
                  size="sm"
                  variant="solid"
                  sx={{
                    backgroundColor: "primary.main", // Đặt màu nền là màu primary
                    color: "white", // Đặt màu chữ là trắng
                    "&:hover": {
                      backgroundColor: "primary.dark", // Màu nền khi hover
                    },
                  }}
                >
                  Save
                </Button>
              </CardActions>
            </Box>
          </Card>
        </Stack>
      </Box>
    </Container>
  );
}
