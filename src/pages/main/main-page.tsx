import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../../hooks/useAuth";
import { PageProps } from "../../utils/types";
import { AppBar, DRAWER_WIDTH, DrawerHeader, Main } from "./main.styles";

export default function MainPage({ children }: PageProps) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Spotzer Network
          </Typography>
          <IconButton aria-label="delete" size="small" onClick={logout}>
            <LogoutIcon fontSize="inherit" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Home Page", "Invoice"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText
                  primary={text}
                  onClick={() => {
                    if (text === "Invoice") navigate("/amounts");
                    else if (text === "Home Page") navigate("/homepage");
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>{children}</Main>
    </Box>
  );
}
