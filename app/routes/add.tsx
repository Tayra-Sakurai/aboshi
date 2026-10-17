import CategoryIcon from "@mui/icons-material/Category";
import ClassIcon from "@mui/icons-material/Class";
import DescriptionIcon from "@mui/icons-material/Description";
import TagIcon from "@mui/icons-material/Tag";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function AddIndex() {
  return (
    <Stack spacing={4}>
      <Typography variant="h2" component="h2">項目を追加する</Typography>
      <List>
        <ListItem>
          <ListItemButton href="/add/item">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="項目" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton href="/add/large_category">
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="大分類" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton href="/add/medium_category">
            <ListItemIcon>
              <ClassIcon />
            </ListItemIcon>
            <ListItemText primary="中分類" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton href="/add/small_category">
            <ListItemIcon>
              <TagIcon />
            </ListItemIcon>
            <ListItemText primary="小分類" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton href="/add/money_status">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary="状態" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}