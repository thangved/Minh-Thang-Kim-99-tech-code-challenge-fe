import { Token } from "@/interfaces";
import { useMemo } from "react";
import { useTokens } from "./useTokens";

export function useHotTokens(): Token[] {
  const tokens = useTokens();
  const hotTokens = useMemo(() => tokens.slice(0, 5), [tokens]);
  return hotTokens;
}
