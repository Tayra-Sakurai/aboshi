import type { Interactions } from "@google/genai";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import GeminiLogo from "~/assets/gemini_logo.png";

type ChatCardProps = {
  interaction?: Interactions.Interaction;
  input?: string | Interactions.Content[] | Interactions.Content | Interactions.Step[]
};

export default function ChatCard({
  interaction,
  input
}: ChatCardProps) {
  if (interaction?.status === 'completed' && interaction?.output_text) {
    const formatter = Intl.DateTimeFormat('ja-JP-u-hc-h11', {
      dateStyle: 'full',
      timeStyle: 'long',
    });
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
        <CardContent>{interaction.output_text}</CardContent>
      </Card>
    );
  }
  throw new Error('Not implemented.');
}