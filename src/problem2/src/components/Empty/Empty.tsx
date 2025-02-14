import { Stack, StackProps, Typography } from "@mui/material";

interface EmptyProps extends Omit<StackProps, "children"> {
  title?: string;
  description?: string;
}

export default function Empty({
  title = "No data",
  description = "Please try again later or contact support",
  ...props
}: EmptyProps) {
  return (
    <Stack
      minHeight={200}
      alignItems="center"
      justifyContent="center"
      gap={1}
      p={2}
      {...props}
    >
      <Typography>{title}</Typography>
      <Typography variant="caption">{description}</Typography>
    </Stack>
  );
}
