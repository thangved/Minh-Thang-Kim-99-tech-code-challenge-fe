import { Token } from "@/interfaces";
import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Chip,
  InputLabel,
  Stack,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useCallback, useState } from "react";
import TokenIcon from "../TokenIcon";

interface TokenInputProps extends Omit<TextFieldProps, "onChange" | "value"> {
  value?: { currency: string; amount: number };
  onChange?: (value: { currency: string; amount: number }) => void;
  tokens: Token[];
}

function onDelete() {} // Just hack to show the arrow down icon

export default function TokenInput({
  label,
  tokens,
  onChange,
  value,
  ...props
}: TokenInputProps) {
  const [amount, setAmount] = useState(() =>
    value?.amount ? String(value?.amount) : "",
  );
  const [currency, setCurrency] = useState(
    () => value?.currency || tokens[0]?.currency,
  );

  const handleChangeAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setAmount(value);
      onChange?.({ currency, amount: Number(value) });
    },
    [currency, onChange],
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
          onDelete={onDelete}
          deleteIcon={<KeyboardArrowDown />}
          variant="filled"
        />
      </Stack>
    </Stack>
  );
}
