import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack minHeight={200} justifyContent="center" alignItems="center">
      <CircularProgress size={36} />
    </Stack>
  );
}
