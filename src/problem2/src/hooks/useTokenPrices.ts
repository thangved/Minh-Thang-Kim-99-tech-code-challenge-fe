import { use, useMemo } from "react";
import { getTokenPrices } from "../apis";
import { Token } from "../interfaces";

const promise = getTokenPrices();

export function useTokenPrices(): Token[] {
  const prices = use(promise);
  const sortedByDate = useMemo(
    () =>
      prices.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [prices]
  );
  const uniqueTokens = useMemo(
    () =>
      sortedByDate.filter(
        (token, index, self) =>
          self.findIndex((t) => t.currency === token.currency) === index
      ),
    [sortedByDate]
  );

  return uniqueTokens;
}
