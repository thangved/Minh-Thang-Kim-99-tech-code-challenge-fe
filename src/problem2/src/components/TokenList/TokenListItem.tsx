import { Token } from "@/interfaces";
import { formatCurrency } from "@/utils";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import TokenIcon from "../TokenIcon";

interface TokenListItemProps {
  token: Token;
}

export default function TokenListItem({ token }: TokenListItemProps) {
  return (
    <TableRow key={token.currency}>
      <TableCell sx={{ border: "none", pl: 0 }}>
        <Stack direction="row" gap={2} alignItems="center">
          <TokenIcon name={token.currency} />
          <Typography fontWeight={500}>{token.currency}</Typography>
        </Stack>
      </TableCell>
      <TableCell sx={{ border: "none" }} align="right">
        <Typography fontWeight={300}>{formatCurrency(token.price)}</Typography>
      </TableCell>
    </TableRow>
  );
}
