import type { Route } from "./+types/login";
import { data, Form, redirect } from "react-router";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { createClient } from "~/utils/supabase.server";

export function meta(): Route.MetaDescriptors {
  return [
    {
      title: 'ログイン | Aboshi',
    },
    {
      name: 'description',
      content: 'メールアドレスを使ってAboshiにログインします。',
    },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {
  const { supabase, headers } = createClient(request);
  const formData = await request.formData();
  const email = formData.get('email');
  if (typeof email === 'string') {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${new URL(request.url).origin}/`,
      },
    });
    if (error)
      return data(error, { status: 400 });
    return redirect('/auth/login_wait', { headers });
  }
}

export default function Login({
  actionData
}: Route.ComponentProps) {
  return (
    <Form method="post">
      <Stack
        direction="column"
        spacing={4}
      >
        {actionData && <Alert severity="error">{actionData.message}</Alert>}
        <FormControl>
          <FormLabel
            htmlFor="email"
          >
            メールアドレス
          </FormLabel>
          <Input
            name="email"
            type="email"
            required
            id="email"
            placeholder="user@example.com"
          />
        </FormControl>
        <Button
          type="submit"
          color="success"
          variant="contained"
        >
          送信
        </Button>
      </Stack>
    </Form>
  );
}