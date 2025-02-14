import { useTokens } from "@/hooks";
import { Token } from "@/interfaces";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  InputLabel,
  Popover,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useCallback, useState } from "react";
import SelectToken from "../SelectToken";
import TokenIcon from "../TokenIcon";

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
  const { tokens, isFetching } = useTokens();
  const [amount, setAmount] = useState(() =>
    value?.amount ? String(value?.amount) : "",
  );
  const [currency, setCurrency] = useState(
    () => value?.currency || tokens[0]?.currency,
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/[^0-9.]/g, "");
      const formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setAmount(formattedValue);
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
    <Stack spacing={1} gap={1}>
      {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
      <TextField
        slotProps={{ inputLabel: { sx: { display: "none" } } }}
        value={amount}
        onChange={handleChangeAmount}
        autoComplete="off"
        {...props}
      />
      <Stack direction="row" alignItems="center" justifyContent="end">
        {isFetching ? (
          <CircularProgress size={24} />
        ) : (
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
        )}
      </Stack>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleCloseSelectToken}
      >
        <SelectToken onChange={handleSelectToken} />
      </Popover>
    </Stack>
  );
}
