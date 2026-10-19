import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Button, { type ButtonProps } from "@mui/material/Button";
import { useNavigate } from "react-router";

type BackButtonProps = Omit<ButtonProps, "children" | "type" | "component" | "onClick" | "variant" | "startIcon" | "color" | "href" | "LinkComponent" | "action" | "method">;

export default function BackButton({
  fullWidth = true,
  ...otherProps
}: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      variant="contained"
      color="primary"
      onClick={() => navigate(-1)}
      startIcon={<KeyboardBackspaceIcon />}
      fullWidth={fullWidth}
      {...otherProps}
    >
      戻る
    </Button>
  )
}