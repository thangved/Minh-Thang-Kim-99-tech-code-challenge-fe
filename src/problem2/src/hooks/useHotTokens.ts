import { Token } from "@/interfaces";
import { useMemo } from "react";
import { useTokens } from "./useTokens";

interface UseHotTokens {
  hotTokens: Token[];
}

export function useHotTokens(): UseHotTokens {
  const { tokens } = useTokens();
  const hotTokens = useMemo(() => tokens.slice(0, 5), [tokens]);
  return { hotTokens: hotTokens };
}
