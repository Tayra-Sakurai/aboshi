import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, type SubmitEvent } from "react";
import { Form } from "react-router";

type PasswordFormProps = {
  email?: string;
  setup?: boolean;
};

export default function PasswordForm({
  email,
  setup
}: PasswordFormProps) {
  const [pswd, setPswd] = useState<string>('');
  const [conf, setConf] = useState<string>('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    if (setup && (pswd != conf)) {
      event.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <Form method="post" onSubmit={handleSubmit}>
      {email && <input type="hidden" name="email" value={email} />}
      <Stack spacing={4}>
        <Typography variant="h3" component="h3">パスワードの{setup ? '設定' : '入力'}</Typography>
        <TextField
          name="password"
          type="password"
          autoComplete={setup ? 'new-password' : 'current-password'}
          label="パスワード"
          placeholder={setup ? '新しいパスワード' : 'パスワード'}
          fullWidth
          required
          value={pswd}
          onChange={event => setPswd(event.currentTarget.value)}
        />
        {setup ?
          <TextField
            type="password"
            autoComplete="off"
            label="パスワードを再入力"
            required
            fullWidth
            value={conf}
            onChange={event => setConf(event.currentTarget.value)}
          /> :
          null
        }
        <Button
          type="submit"
          fullWidth
          startIcon={<SendIcon />}
          variant="contained"
          color="success"
        >
          送信
        </Button>
        {
          setup ?
          null :
          <Button
            variant="text"
            color="primary"
            type="submit"
            formAction="/auth/reset_password"
            fullWidth
          >
            パスワードを忘れた場合
          </Button>
        }
      </Stack>
    </Form>
  )
}