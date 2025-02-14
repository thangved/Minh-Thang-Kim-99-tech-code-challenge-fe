import { Token } from "@/interfaces";
import { Table, TableBody } from "@mui/material";
import Empty from "../Empty/Empty";
import TokenListItem from "./TokenListItem";

interface TokenListProps {
  tokens: Token[];
  onSelect?: (token: Token) => void;
}

export default function TokenList({ onSelect, tokens }: TokenListProps) {
  if (tokens.length === 0) {
    return (
      <Empty
        title="No tokens found"
        description="Try searching for a different token"
      />
    );
  }
  return (
    <Table sx={{ tableLayout: "fixed" }}>
      <TableBody>
        {tokens.map((token) => (
          <TokenListItem
            key={token.currency}
            token={token}
            onSelect={onSelect}
          />
        ))}
      </TableBody>
    </Table>
  );
}
