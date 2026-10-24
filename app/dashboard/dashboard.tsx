import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PaymentsIcon from "@mui/icons-material/Payments";
import AddIcon from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router";

const viewLinks = [
  { label: "項目一覧", path: "/items", icon: <DescriptionIcon /> },
  { label: "大分類一覧", path: "/large_categories", icon: <CategoryIcon /> },
  { label: "中分類一覧", path: "/medium_categories", icon: <ClassIcon /> },
  { label: "小分類一覧", path: "/small_categories", icon: <LocalOfferIcon /> },
  { label: "状態一覧", path: "/money_status", icon: <PaymentsIcon /> },
];

const addLinks = [
  { label: "項目", path: "/add/item", icon: <DescriptionIcon /> },
  { label: "大分類", path: "/add/large_category", icon: <CategoryIcon /> },
  { label: "中分類", path: "/add/medium_category", icon: <ClassIcon /> },
  { label: "小分類", path: "/add/small_category", icon: <LocalOfferIcon /> },
  { label: "状態", path: "/add/money_status", icon: <PaymentsIcon /> },
];

export default function Dashboard() {
  return (
    <Stack spacing={4}>
      <Typography component="h2" variant="h2">
        ようこそ
      </Typography>
      <section>
        <Typography component="h3" variant="h3">
          閲覧する
        </Typography>
        <List>
          {viewLinks.map(({ label, path, icon }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton component={RouterLink} to={path}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </section>
      <section>
        <Typography component="h3" variant="h3">
          追加する
        </Typography>
        <List>
          <ListItem disablePadding>
            <ListItemButton component={RouterLink} to="/add">
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary="追加メニュー" />
            </ListItemButton>
          </ListItem>
          {addLinks.map(({ label, path, icon }) => (
            <ListItem key={path} disablePadding>
              <ListItemButton component={RouterLink} to={path}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={`${label}を追加`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </section>
    </Stack>
  );
}
