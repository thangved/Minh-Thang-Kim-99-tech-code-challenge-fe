import { getTokenPrices } from "@/apis";
import { Token } from "@/interfaces";
import { use, useMemo } from "react";

const promise = getTokenPrices();

interface UseTokensProps {
  search?: string;
}

interface UseTokens {
  tokens: Token[];
}

export function useTokens(props?: UseTokensProps): UseTokens {
  const { search } = { ...props };
  const tokens = use(promise);
  const sortedByDate = useMemo(
    () =>
      tokens.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [tokens],
  );
  const uniqueTokens = useMemo(
    () =>
      sortedByDate.filter((token, index, self) => {
        let shouldKeep = true;
        shouldKeep =
          self.findIndex((t) => t.currency === token.currency) === index;
        if (search) {
          shouldKeep = token.currency
            .toLowerCase()
            .includes(search.toLowerCase());
        }
        return shouldKeep;
      }),
    [search, sortedByDate],
  );

  return { tokens: uniqueTokens };
}
