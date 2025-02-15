import { Token } from "@/interfaces";
import { useMemo } from "react";
import { useTokens } from "./useTokens";

interface UseHotTokens {
  hotTokens: Token[];
  isFetching?: boolean;
}

export function useHotTokens(): UseHotTokens {
  const { tokens, isFetching } = useTokens();
  const hotTokens = useMemo(() => tokens.slice(0, 5), [tokens]);
  return { hotTokens, isFetching };
}
