import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link as RouterLink } from "react-router";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function NavigationBar({
  email
}: {
  email?: string | null
}) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <AppBar
        position="sticky"
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpen(o => !o)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="div"
            variant="h6"
            sx={{ flexGrow: 1 }}
          >
            Aboshi
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            edge="end"
            sx={{ mr: 2 }}
            component={RouterLink}
            to={email ? "/" : "/auth/login"}
          >
            {email ?
              <AccountCircleIcon /> :
              <LoginIcon />
            }
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={open}
        sx={{
          zIndex(theme) {
            return theme.zIndex.appBar - 1;
          }
        }}
      >
        <Toolbar />
        <Box
          onClick={() => setOpen(false)}
        >
          <List>
            {navs.map(({label, path, icon}) => (
              <ListItem
                key={label}
                disablePadding
                component={RouterLink}
                to={path}
              >
                <ListItemButton>
                  {icon &&(
                    <ListItemIcon>
                      {icon}
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={label}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

// The page navigation menu resources.
type PageForNav = {
  label: string, //The navigation label.
  /* The link path. */
  path: string,
  icon?: React.ReactNode,
};

const navs: Array<PageForNav> = [
  {
    label: 'ダッシュボード',
    path: '/',
    icon: <HomeIcon />
  }
]