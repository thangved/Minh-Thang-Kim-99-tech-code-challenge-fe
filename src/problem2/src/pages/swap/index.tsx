import { TokenInput, TokenList } from "@/components";
import { useHotTokens } from "@/hooks/useHotTokens";
import { Box, Card, Container, Grid2, Stack, Typography } from "@mui/material";

export default function SwapPage() {
  const { hotTokens, isFetching } = useHotTokens();

  return (
    <Box minHeight="100dvh">
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack gap={2}>
              <Typography variant="h2" fontSize={50}>
                Swap
              </Typography>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Stack gap={2}>
                  <Typography variant="h3">Hot tokens</Typography>
                  <TokenList loading={isFetching} tokens={hotTokens} />
                </Stack>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ p: 4 }}>
              <Stack gap={1}>
                <TokenInput label="Spend" placeholder="0.0" />
                <TokenInput label="Receive" placeholder="0.0" />
              </Stack>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
