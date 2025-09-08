import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const iemsList = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        backgroundColor: "#09212E",
        height: "100%",
      }}
      role="drawer"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Typography
        sx={{ textAlign: "center", pt: 4, color: "green", fontSize: 20 }}
      >
        Group 6
      </Typography>
      <List>
        <NavLink
          to="/profile"
          style={{
            textDecoration: "none", // Xóa gạch chân
          }}
        >
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/my-product"
          style={{
            textDecoration: "none", // Xóa gạch chân
          }}
        >
          <ListItemButton sx={{ color: "white" }}>
            <ListItemIcon sx={{ color: "white" }}>
              <StorefrontOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={"My Products"} />
          </ListItemButton>
        </NavLink>
      </List>
    </Box>
  );

  return (
    <div>
      <div
        style={{
          pt: { xs: 4, sm: 16 },
          pb: { xs: 8, sm: 16 },
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Outlet />
      </div>
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 99999999999999,
        }}
      >
        {!state.left && (
          <Button onClick={toggleDrawer("left", true)}>
            <MenuRoundedIcon />
          </Button>
        )}
        <Drawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer("left", false)}
        >
          {iemsList("left")}
        </Drawer>
      </div>
    </div>
  );
}
