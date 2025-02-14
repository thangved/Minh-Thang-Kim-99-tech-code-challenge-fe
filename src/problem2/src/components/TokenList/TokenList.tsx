import { Token } from "@/interfaces";
import { Table, TableBody } from "@mui/material";
import TokenListItem from "./TokenListItem";

interface TokenListProps {
  tokens: Token[];
}

export default function TokenList({ tokens }: TokenListProps) {
  return (
    <Table size="small" sx={{ tableLayout: "fixed" }}>
      <TableBody>
        {tokens.map((token) => (
          <TokenListItem key={token.currency} token={token} />
        ))}
      </TableBody>
    </Table>
  );
}
