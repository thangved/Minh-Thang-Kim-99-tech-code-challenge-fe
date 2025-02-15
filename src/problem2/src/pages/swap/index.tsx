import { TokenInput, TokenInputValue, TokenList } from "@/components";
import { useHotTokens, useSwapTokens } from "@/hooks";
import {
  Box,
  Button,
  Card,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import { useCallback, useState } from "react";

export default function SwapPage() {
  const { hotTokens, isFetching } = useHotTokens();
  const [fromToken, setFromToken] = useState<TokenInputValue>(() => ({
    currency: hotTokens[0]?.currency,
  }));
  const [toToken, setToToken] = useState<TokenInputValue>(() => ({
    currency: hotTokens[1]?.currency,
  }));
  const [swapReverse, setSwapReverse] = useState(false);
  const {
    fromAmount,
    toAmount,
    error: swapError,
  } = useSwapTokens({
    from: fromToken.currency,
    to: toToken.currency,
    fromAmount: fromToken?.amount,
    toAmount: toToken?.amount,
    reverse: swapReverse,
  });

  const handleChangeFromToken = useCallback((token: TokenInputValue) => {
    setSwapReverse(false);
    setFromToken(token);
  }, []);

  const handleChangeToToken = useCallback((token: TokenInputValue) => {
    setSwapReverse(true);
    setToToken(token);
  }, []);

  return (
    <Box minHeight="100dvh">
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Grid2 container spacing={4}>
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
              <Stack spacing={2}>
                <TokenInput
                  label="Spend"
                  placeholder="0.0"
                  value={{ ...fromToken, amount: fromAmount }}
                  onChange={handleChangeFromToken}
                />
                <TokenInput
                  label="Receive"
                  placeholder="0.0"
                  value={{ ...toToken, amount: toAmount }}
                  onChange={handleChangeToToken}
                />
                <Typography variant="body2" color="error">
                  {swapError}
                </Typography>
                <Button size="large" variant="contained" disabled={!!swapError}>
                  Swap
                </Button>
              </Stack>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
