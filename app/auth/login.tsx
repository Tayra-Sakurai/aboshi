import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/login";
import { Form, useNavigate } from "react-router";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useEffect } from "react";

export function meta(): Route.MetaDescriptors {
  return [
    {
      title: 'ログイン',
    },
    {
      name: 'description',
      content: 'Aboshiにログイン',
    },
  ];
}

export async function action({
  request
}: Route.ActionArgs) {
  console.info('Form data was sent.');
  const formData = await request.formData();
  const { supabase } = createClient(request);
  const email = formData.get('email');
  if ((typeof email) !== 'string') {
    return false;
  }
  try {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://aboshi.vercel.app/',
      }
    });
  } catch (e) {
    console.error(String(e))
    return false;
  }
  return true;
}

export default function Login({
  actionData
}: Route.ComponentProps) {
  const navigate = useNavigate();
  useEffect(() => {
    if (actionData)
      navigate('/auth/login_wait');
  }, [actionData]);
  return (
    <Form method="post">
      <Stack
        direction="column"
        spacing={4}
      >
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
          disabled={!!actionData}
        >
          送信
        </Button>
      </Stack>
    </Form>
  );
}