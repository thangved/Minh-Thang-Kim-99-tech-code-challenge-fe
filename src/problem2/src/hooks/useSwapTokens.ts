import { useCallback, useMemo } from "react";
import { useTokens } from "./useTokens";

interface UseSwapProps {
  from: string;
  to: string;
  fromAmount?: number;
  toAmount?: number;
  reverse?: boolean;
}

interface SwapResult {
  message?: string;
}

interface UseSwap {
  isCalling?: boolean;
  swap: () => Promise<SwapResult>;
  isSwapping?: boolean;
  toAmount?: number;
  fromAmount?: number;
  error?: string;
}

export function useSwapTokens({
  from,
  to,
  fromAmount,
  toAmount,
  reverse,
}: UseSwapProps): UseSwap {
  const { tokens } = useTokens();
  const fromToken = useMemo(
    () => tokens.find((token) => token.currency === from),
    [from, tokens],
  );
  const toToken = useMemo(
    () => tokens.find((token) => token.currency === to),
    [to, tokens],
  );
  const error = useMemo(() => {
    if (!fromToken) return "From token is required";
    if (!toToken) return "To token is required";
    if (fromToken?.currency === toToken?.currency)
      return "From and To must be different";
    if (!fromAmount) return "Amount is required";
  }, [fromAmount, fromToken, toToken]);

  const swap = useCallback(async () => Promise.resolve({}), []);

  const calculatedFromAmount = useMemo(() => {
    if (!reverse) return fromAmount;
    if (!fromToken) return fromAmount;
    if (!toToken) return fromAmount;
    if (!toAmount) return fromAmount;
    return (toToken.price / fromToken.price) * toAmount;
  }, [fromAmount, fromToken, reverse, toAmount, toToken]);

  const calculatedToAmount = useMemo(() => {
    if (reverse) return fromAmount;
    if (!fromToken) return toAmount;
    if (!fromAmount) return toAmount;
    if (!toToken) return toAmount;
    return (fromToken.price / toToken.price) * fromAmount;
  }, [fromAmount, fromToken, reverse, toAmount, toToken]);

  return {
    swap,
    error,
    fromAmount: calculatedFromAmount,
    toAmount: calculatedToAmount,
  };
}
