import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import { deepPurple } from "@mui/material/colors";
import { Outlet } from "react-router";
import type { Route } from "./+types/auth";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "認証 | Aboshi" },
    {
      name: "description",
      content: "Aboshiのアカウント認証を行います。",
    },
  ];
}

export default function LoginSignIn() {
  return (
    <Card
      sx={{
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <CardHeader
        title="Aboshi"
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