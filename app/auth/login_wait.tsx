import Typography from "@mui/material/Typography";
import type { Route } from "./+types/login_wait";

export function meta(): Route.MetaDescriptors {
  return [
    { title: "ログイン情報を送信済み | Aboshi" },
    {
      name: "description",
      content: "ログイン用リンクをメールで送信しました。メールをご確認ください。",
    },
  ];
}

export default function LoginWait() {
  return (
    <>
      <Typography
        component="div"
        variant="body1"
      >
        メールを送信しました。メールに記載されたリンクをクリックしてください。
      </Typography>
    </>
  );
}