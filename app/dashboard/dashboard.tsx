import Typography from "@mui/material/Typography";
import { useContext } from "react";
import UserContext from "~/contexts/UserContext";

export default function Dashboard() {
  const userContext = useContext(UserContext);

  return (
    <>
      <Typography
        component="h2"
        variant="h2"
      >
        {userContext?.email ?
          `ようこそ、${userContext.email}さん` :
          `はじめまして`
        }
      </Typography>
    </>
  );
}