import AddIcon from "@mui/icons-material/Add";
import ChatIcon from "@mui/icons-material/Chat";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { Link as RouterLink, useLocation } from "react-router";

export default function BottomNavs() {
  const location = useLocation();
  const selection = /^\/add(?:\/|$)/i.test(location.pathname) ? 0 : /^\/chat(?:\/|$)/i.test(location.pathname) ? 1 : 0;

  return (
    <Box
      sx={{
        width: '100%',
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <BottomNavigation
        showLabels
        value={selection}
      >
        <BottomNavigationAction
          label="追加"
          icon={<AddIcon />}
          component={RouterLink}
          to="/add"
        />
        <BottomNavigationAction
          label="チャット"
          icon={<ChatIcon />}
          component={RouterLink}
          to="/chat"
        />
        <BottomNavigationAction
          label="閲覧"
          icon={<VisibilityIcon />}
          component={RouterLink}
          to="/"
        />
      </BottomNavigation>
    </Box>
  );
}