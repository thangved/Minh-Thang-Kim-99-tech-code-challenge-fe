import { getTokenPrices } from "@/apis";
import { Token } from "@/interfaces";
import { use, useMemo } from "react";

const promise = getTokenPrices();

interface UseTokensProps {
  search?: string;
}

export function useTokens(props?: UseTokensProps): Token[] {
  const { search } = { ...props };
  const prices = use(promise);
  const sortedByDate = useMemo(
    () =>
      prices.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    [prices],
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

  return uniqueTokens;
}
