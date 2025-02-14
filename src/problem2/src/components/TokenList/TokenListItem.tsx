import { Token } from "@/interfaces";
import { formatCurrency } from "@/utils";
import { Stack, TableCell, TableRow, Typography } from "@mui/material";
import { useCallback } from "react";
import TokenIcon from "../TokenIcon";

interface TokenListItemProps {
  token: Token;
  onSelect?: (token: Token) => void;
}

export default function TokenListItem({ token, onSelect }: TokenListItemProps) {
  const handleClick = useCallback(() => {
    onSelect?.(token);
  }, [onSelect, token]);
  return (
    <TableRow
      key={token.currency}
      sx={{
        cursor: "pointer",
        td: {
          border: "none",
        },
        "td:first-of-type": {
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        },
        "td:last-of-type": {
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        },
      }}
      hover
      onClick={handleClick}
    >
      <TableCell>
        <Stack direction="row" gap={2} alignItems="center">
          <TokenIcon name={token.currency} />
          <Typography fontWeight={500}>{token.currency}</Typography>
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Typography fontWeight={300}>{formatCurrency(token.price)}</Typography>
      </TableCell>
    </TableRow>
  );
}
