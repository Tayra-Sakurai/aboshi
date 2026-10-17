import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import { useState } from "react";

export default function BottomNavs() {
  const [selection, setSelection] = useState<number>(0);

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
        onChange={(_, newValue) => setSelection(newValue)}
      >
        <BottomNavigationAction
          label="追加"
          icon={<AddIcon />}
          href="/add"
        />
        <BottomNavigationAction
          label="閲覧"
          icon={<VisibilityIcon />}
          href="/"
        />
      </BottomNavigation>
    </Box>
  );
}