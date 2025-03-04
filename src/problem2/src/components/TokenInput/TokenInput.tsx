import { useTokens } from "@/hooks";
import { Token } from "@/interfaces";
import { formatCurrency } from "@/utils";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Chip,
  CircularProgress,
  InputLabel,
  Popover,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import SelectToken from "../SelectToken";
import TokenIcon from "../TokenIcon";

export interface TokenInputValue {
  currency: string;
  amount?: number;
}

interface TokenInputProps extends Omit<TextFieldProps, "onChange" | "value"> {
  value?: TokenInputValue;
  onChange?: (value: TokenInputValue) => void;
}

export default function TokenInput({
  label,
  onChange,
  value,
  ...props
}: TokenInputProps) {
  const { tokens, isFetching } = useTokens();
  const [amount, setAmount] = useState(() => value?.amount);
  const [currency, setCurrency] = useState(
    () => value?.currency || tokens[0]?.currency,
  );
  const selectedToken = tokens.find((token) => token.currency === currency);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const value = e.target.value;
        if (!value) {
          setAmount(undefined);
          onChange?.({ currency, amount: undefined });
          return;
        }
        onChange?.({ currency, amount: +value.replace(/,/g, "") });
      } catch {
        //
      }
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
      onChange?.({ currency: token.currency, amount });
      handleCloseSelectToken();
    },
    [onChange, amount, handleCloseSelectToken],
  );

  useEffect(() => {
    if (!value) return;
    if (value.currency === currency && value.amount === amount) return;
    setCurrency(value.currency);
    setAmount(value.amount);
  }, [amount, currency, value]);

  return (
    <Stack spacing={1} gap={1}>
      {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
      <NumericFormat
        customInput={TextField}
        slotProps={{ inputLabel: { sx: { display: "none" } } }}
        value={amount}
        onChange={handleChangeAmount}
        autoComplete="off"
        decimalScale={2}
        type="text"
        thousandSeparator
        placeholder={props.placeholder}
      />
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="caption" color="text.secondary">
          {formatCurrency(selectedToken?.price || 0)}
        </Typography>
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
