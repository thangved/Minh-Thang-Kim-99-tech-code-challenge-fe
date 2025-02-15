import { useTokens } from "@/hooks";
import { Token } from "@/interfaces";
import { SearchOutlined } from "@mui/icons-material";
import { Box, InputAdornment, Stack, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import TokenList from "../TokenList";

interface SelectTokenProps {
  onChange?: (token: Token) => void;
}

export default function SelectToken({ onChange }: SelectTokenProps) {
  const [search, setSearch] = useState("");
  const { tokens, isFetching } = useTokens({ search });

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
    },
    [],
  );

  const handleSelectToken = useCallback(
    (token: Token) => {
      onChange?.(token);
    },
    [onChange],
  );

  return (
    <Stack p={2} spacing={2} maxHeight="100%" height={500}>
      <TextField
        placeholder="Search"
        label="Search"
        autoComplete="off"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchOutlined />
              </InputAdornment>
            ),
          },
        }}
        onChange={handleSearchChange}
      />
      <Box width={400} maxWidth="100%" flex={1} overflow="auto">
        <TokenList
          tokens={tokens}
          loading={isFetching}
          onSelect={handleSelectToken}
        />
      </Box>
    </Stack>
  );
}
