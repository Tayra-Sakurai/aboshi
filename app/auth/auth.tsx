import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { deepPurple } from "@mui/material/colors";
import { Outlet } from "react-router";

export default function LoginSignIn() {
  return (
    <Card
      sx={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <CardHeader
        content="Aboshi"
        avatar={
          <Avatar
            sx={{
              color: deepPurple[500],
            }}
          />
        }
      />
      <CardContent>
        <Outlet />
      </CardContent>
    </Card>
  );
}