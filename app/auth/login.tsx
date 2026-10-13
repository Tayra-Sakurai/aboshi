import { createClient } from "~/utils/supabase.server";
import type { Route } from "./+types/login";
import { Form } from "react-router";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export async function clientAction({
  request
}: Route.ClientActionArgs) {
  const formData = await request.formData();
  const { supabase } = createClient(request);
  const email = formData.get('email');
  if ((typeof email) !== 'string') {
    return false;
  }
  await supabase.auth.signInWithOtp({
    email
  });
  return true;
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
          />
        </FormControl>
        <Button
          type="submit"
          color="success"
          variant="contained"
          disabled={!actionData}
        >
          送信
        </Button>
      </Stack>
    </Form>
  );
}