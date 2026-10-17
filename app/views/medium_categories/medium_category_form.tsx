import Stack from "@mui/material/Stack";
import { Form, type FormProps } from "react-router";
import LargeCategorySelect from "../large_categories/large_category_select";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";

type MediumCategoryFormProps = Omit<FormProps, "method" | "children"> & {
  largeCategories: {
    id: number;
    name: string;
  }[];
  name?: string;
  lcId?: number | null;
};

export default function MediumCategoryForm({
  largeCategories,
  name,
  lcId,
  ...params
}: MediumCategoryFormProps) {
  const [lc, setLc] = useState<number | null>(lcId ?? null);
  return (
    <Form {...params} method="post">
      <input type="hidden" value={lc ?? ''} name="large_category_id" />
      <Stack spacing={4}>
        <LargeCategorySelect
          largeCategories={largeCategories}
          value={lc}
          setValue={setLc}
        />
        <TextField
          type="text"
          name="name"
          defaultValue={name}
          fullWidth
          label="分類名"
          placeholder="分類名を入力"
        />
        <Button
          startIcon={<SaveIcon />}
          color="success"
          variant="contained"
          type="submit"
          fullWidth
        >
          保存
        </Button>
      </Stack>
    </Form>
  );
}