import type { Interactions } from "@google/genai";
import CheckIcon from "@mui/icons-material/Check";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import { purple } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import type React from "react";
import { useState } from "react";
import Markdown from "react-markdown";
import { Form } from "react-router";
import remarkGfm from "remark-gfm";
import GeminiLogo from "~/assets/gemini_logo.png";

type ChatCardProps = {
  interaction?: Interactions.Interaction;
  input?: string | Interactions.FunctionCallStep[];
};

type CardFooterProps = {
  text: string;
};

function CardFooter({
  text
}: CardFooterProps) {
  return (
    <CardActions>
      <IconButton
        size="small"
        onClick={() => navigator.clipboard.writeText(text)}
      >
        <ContentCopyIcon />
      </IconButton>
    </CardActions>
  );
}

type FunctionCallCardProps = {
  step: Interactions.FunctionCallStep;
};

type MessageObjType = {
  [x: string]: React.ReactNode;
};

const messages: MessageObjType = {
  read_items: <p>項目の読み取り許可が要求されています。</p>,
  read_large_categories: <p>大分類の読み取りが要求されています。</p>,
  read_medium_categories: <p>中分類の読み取りが求められています。</p>,
  read_small_categories: <p>小分類の読み取りが求められています。</p>,
  read_money_status: <p>状態の読み取りを要求しています。</p>,
  insert_item: <p>項目の追加が要求されています。</p>,
  insert_large_category: <p>大分類の追加を要求しています。</p>,
  insert_medium_category: <p>中分類の追加を要求しています。</p>,
  insert_small_category: <p>小分類の追加を要求しています。</p>,
  insert_money_status: <p>状態項目の追加を要求しています。</p>,
  update_item: <p>項目の更新を要求しています。</p>,
  update_large_category: <p>大分類の更新を要求しています。</p>,
  update_medium_category: <p>中分類の更新を要求しています。</p>,
  update_small_category: <p>小分類の更新を要求しています。</p>,
  update_money_status: <p>状態項目の更新を要求しています。</p>,
  delete_item: <p>項目の削除を要求しています。</p>,
  delete_large_category: <p>大分類の削除を要求しています。</p>,
  delete_medium_category: <p>中分類の削除を要求しています。</p>,
  delete_small_category: <p>小分類の削除を要求しています。</p>,
  delete_money_status: <p>状態項目の削除を要求しています。</p>,
};

function FunctionCallCard({
  step
}: FunctionCallCardProps) {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <Form method="post">
      <input type="hidden" value={step.name} name="name" />
      <input type="hidden" value={JSON.stringify(step.arguments)} name="args" />
      <Collapse
        in={open}
      >
        <Card variant="outlined">
          <CardHeader
            title="ツールの使用要求"
            subheader="ツールの使用が要求されました。"
          />
          <CardContent>
            {messages[step.name]}
          </CardContent>
          <CardActions>
            <Button
              startIcon={<CheckIcon />}
              type="submit"
              variant="contained"
              color="primary"
            >
              承認
            </Button>
            <Button
              startIcon={<DoDisturbIcon />}
              variant="contained"
              color="error"
              type="button"
              onClick={() => setOpen(false)}
            >
              拒否
            </Button>
          </CardActions>
        </Card>
      </Collapse>
    </Form>
  );
}

export default function ChatCard({
  interaction,
  input
}: ChatCardProps) {
  const formatter = Intl.DateTimeFormat('ja-JP-u-hc-h11', {
    dateStyle: 'full',
    timeStyle: 'long',
  });
  if (interaction?.status === 'completed' && interaction?.output_text) {
    return (
      <Card variant="outlined">
        <CardHeader
          avatar={
          <Avatar
            alt="Gemini"
            src={GeminiLogo}
          />
          }
          title="Aboshi Helper"
          subheader={interaction.created && formatter.format(new Date(interaction.created))}
        />
        <CardContent>
          <Markdown remarkPlugins={[remarkGfm]}>{interaction.output_text}</Markdown>
        </CardContent>
        <CardFooter text={interaction.output_text ?? ''} />
      </Card>
    );
  } else if (input && typeof input === 'string') {
    return (
      <Card variant="outlined">
        <CardHeader
          avatar={<Avatar sx={{
            bgcolor: purple[500],
            color: "#fff",
          }} />}
          title="あなた"
          subheader={formatter.format(new Date())}
        />
        <CardContent>
          <Markdown remarkPlugins={[remarkGfm]}>{input}</Markdown>
        </CardContent>
        <CardFooter text={input} />
      </Card>
    );
  } else if (input instanceof Array) {
    return (
      <>
        {input.map(step => <FunctionCallCard step={step} />)}
      </>
    );
  }
  throw new Error('Not implemented.');
}