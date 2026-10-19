import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { Form } from "react-router";
import BackButton from "../back_button";

type LargeCategoryFormProps = {
  name?: string
};

export default function LargeCategoryForm({
  name
}: LargeCategoryFormProps) {
  return (
    <Form method="post">
      <Stack spacing={2}>
        <TextField
          name="name"
          defaultValue={name}
          fullWidth
          label="分類名"
          placeholder="分類名を入力"
        />
        <BackButton />
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
  )
}