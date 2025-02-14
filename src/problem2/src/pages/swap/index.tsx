import { TokenIcon } from "@/components";
import { useHotTokens } from "@/hooks/useHotTokens";
import { formatCurrency } from "@/utils";
import {
  Box,
  Card,
  Container,
  Grid2,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

export default function SwapPage() {
  const hotTokens = useHotTokens();

  return (
    <Box minHeight="100dvh">
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Grid2 container>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack gap={2}>
              <Typography variant="h2" fontSize={50}>
                Swap
              </Typography>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Stack gap={2}>
                  <Typography variant="h3">Hot tokens</Typography>
                  <Table size="small" sx={{ tableLayout: "fixed" }}>
                    <TableBody>
                      {hotTokens.map((token) => (
                        <TableRow key={token.currency}>
                          <TableCell sx={{ border: "none", pl: 0 }}>
                            <Stack direction="row" gap={2} alignItems="center">
                              <TokenIcon name={token.currency} />
                              <Typography fontWeight={500}>
                                {token.currency}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell sx={{ border: "none" }} align="right">
                            <Typography fontWeight={300}>
                              {formatCurrency(token.price)}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Stack>
              </Card>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Card variant="outlined" sx={{ p: 2 }}>
              <Stack gap={1}></Stack>
            </Card>
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
