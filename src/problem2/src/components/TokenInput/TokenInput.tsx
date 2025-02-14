import { useTokens } from "@/hooks";
import { Token } from "@/interfaces";
import { KeyboardArrowDown, SearchOutlined } from "@mui/icons-material";
import {
  Box,
  Chip,
  InputAdornment,
  InputLabel,
  Popover,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useCallback, useState } from "react";
import TokenIcon from "../TokenIcon";
import TokenList from "../TokenList";

interface TokenInputProps extends Omit<TextFieldProps, "onChange" | "value"> {
  value?: { currency: string; amount: number };
  onChange?: (value: { currency: string; amount: number }) => void;
}

export default function TokenInput({
  label,
  onChange,
  value,
  ...props
}: TokenInputProps) {
  const [search, setSearch] = useState("");
  const tokens = useTokens({ search });

  const [amount, setAmount] = useState(() =>
    value?.amount ? String(value?.amount) : "",
  );
  const [currency, setCurrency] = useState(
    () => value?.currency || tokens[0]?.currency,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAmount(value);
      onChange?.({ currency, amount: Number(value) });
    },
    [currency, onChange],
  );

  const handleClickSelect = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleCloseSelectToken = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    [],
  );

  const handleSelectToken = useCallback(
    (token: Token) => {
      setCurrency(token.currency);
      setAmount("");
      onChange?.({ currency: token.currency, amount: 0 });
      handleCloseSelectToken();
    },
    [onChange, handleCloseSelectToken],
  );

  return (
    <Stack spacing={1}>
      {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
      <TextField
        slotProps={{ inputLabel: { sx: { display: "none" } } }}
        value={amount}
        onChange={handleChangeAmount}
        {...props}
      />
      <Stack direction="row" justifyContent="end">
        <Chip
          label={currency}
          icon={<TokenIcon name={currency} />}
          clickable
          sx={{ pl: 0.7 }}
          onDelete={handleClickSelect}
          deleteIcon={<KeyboardArrowDown />}
          variant="filled"
          onClick={handleClickSelect}
        />
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseSelectToken}
      >
        <Stack p={2} spacing={2}>
          <TextField
            placeholder="Search"
            label="Search"
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
          <Box width={400} maxWidth="100%" maxHeight={500} overflow="auto">
            <TokenList tokens={tokens} onSelect={handleSelectToken} />
          </Box>
        </Stack>
      </Popover>
    </Stack>
  );
}
