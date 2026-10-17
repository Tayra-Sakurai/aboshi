import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Form, type FormProps } from "react-router";

type MoneyStatusFormProps = Omit<FormProps, "method" | "children"> & {
  name?: string;
};

export default function MoneyStatusForm({
  name,
  ...params
}: MoneyStatusFormProps) {
  return (
    <Form {...params} method="post">
      <Stack spacing={2}>
        <TextField
          name="name"
          defaultValue={name}
          fullWidth
          label="状態名"
          placeholder="状態名を入力"
        />
        <Button
          type="submit"
          color="success"
          variant="contained"
          startIcon={<SaveIcon />}
          fullWidth
        >
          保存
        </Button>
      </Stack>
    </Form>
  );
}
