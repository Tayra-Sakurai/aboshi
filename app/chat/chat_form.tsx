import type { Model } from "@google/genai"
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { Form } from "react-router";

type ChatFormProps = {
  models: Model[];
  defaultModel: string;
};

export default function ChatForm({
  models,
  defaultModel
}: ChatFormProps) {
  return (
    <Form method="post">
      <Paper>
        <Stack spacing={4}>
          <Grid container spacing={2}>
            <Grid size="grow">
              <TextField
                name="prompt"
                label="プロンプトを入力"
                multiline
                rows={2}
                placeholder="分かりやすく指示を入力してください。"
                required
              />
            </Grid>
            <Grid size="auto">
              <IconButton
                size="large"
                type="submit"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Select
            name="model"
            label="使用するモデル"
            defaultValue={defaultModel}
            required
          >
            {models.map(({name, displayName}) => <MenuItem value={name}>{displayName}</MenuItem>)}
          </Select>
        </Stack>
      </Paper>
    </Form>
  )
}
