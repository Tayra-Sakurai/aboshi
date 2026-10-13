import Typography from "@mui/material/Typography";

export default function LoginWait() {
  return (
    <>
      <title>ログイン情報を送信済み</title>
      <Typography
        component="div"
        variant="body1"
      >
        メールを送信しました。メールに記載されたリンクをクリックしてください。
      </Typography>
    </>
  );
}