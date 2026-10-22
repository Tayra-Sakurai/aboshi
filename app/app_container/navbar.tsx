import type React from "react";
import HomeIcon from "@mui/icons-material/Home";
import DescriptionIcon from "@mui/icons-material/Description";
import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddIcon from "@mui/icons-material/Add";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { useState, type MouseEvent } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { Link as RouterLink } from "react-router";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";

export default function NavigationBar({
  email
}: {
  email?: string | null
}) {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

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
          {email ?
            (
              <div>
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleMenu}
                >
                  <AccountCircleIcon />
                </IconButton>
                <Menu
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Avatar /> {email} さん
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <ListItemButton
                      component={RouterLink}
                      to="/auth/set_password"
                    >
                      <ListItemIcon>
                        <PasswordIcon />
                      </ListItemIcon>
                      <ListItemText primary="パスワード" />
                    </ListItemButton>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    href="/auth/logout"
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="ログアウト" />
                  </MenuItem>
                </Menu>
              </div>
            ) :
            (
              <IconButton
                size="large"
                color="inherit"
                href="/auth/login"
              >
                <LoginIcon />
              </IconButton>
            )
          }
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
              >
                <ListItemButton component={RouterLink} to={path}>
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
  },
  {
    label: '項目一覧',
    path: '/items',
    icon: <DescriptionIcon />
  },
  {
    label: '大分類一覧',
    path: '/large_categories',
    icon: <CategoryIcon />
  },
  {
    label: '中分類一覧',
    path: '/medium_categories',
    icon: <ClassIcon />
  },
  {
    label: '小分類一覧',
    path: '/small_categories',
    icon: <LocalOfferIcon />
  },
  {
    label: '状態一覧',
    path: '/money_status',
    icon: <PaymentsIcon />
  },
  {
    label: '追加メニュー',
    path: '/add',
    icon: <AddIcon />
  }
];