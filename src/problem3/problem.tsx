// FIXED: I think the currency can be static in a long time, so I think we can use enum
enum Currency {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

interface WalletBalance {
  currency: Currency;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}

// Define UseWalletBalances interface
interface UseWalletBalances {
  (): WalletBalance[];
}

const useWalletBalances: UseWalletBalances = () => {
  return [];
};

// Define UsePrices interface
interface PricesMap extends Record<Currency, number> {}
interface UsePrices {
  (): PricesMap;
}
const usePrices: UsePrices = () => {
  return {
    [Currency.Osmosis]: 0,
    [Currency.Ethereum]: 0,
    [Currency.Arbitrum]: 0,
    [Currency.Zilliqa]: 0,
    [Currency.Neo]: 0,
  };
};

// FIXED: Should create an map to store the priority of currency instead of use switch case
interface PriorityMap extends Record<Currency, number> {}
const priorityMap: PriorityMap = {
  [Currency.Osmosis]: 100,
  [Currency.Ethereum]: 50,
  [Currency.Arbitrum]: 30,
  [Currency.Zilliqa]: 20,
  [Currency.Neo]: 20,
};

// FIXED: Should define the min value of priority and amount as a constant
const CURRENCY_PRIORITY_MIN = -99;
const CURRENCY_AMOUNT_MIN = 0;

// FIXED: Should move functions that not depend on props inside the component to the top level
const getPriority = (currency: Currency): number => {
  if (!Object.keys(priorityMap).includes(currency)) {
    return CURRENCY_PRIORITY_MIN;
  }
  return priorityMap[currency];
};

interface Props extends BoxProps {}
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        // FIXED: maybe the correct property name is "currency" instead of "blockchain"
        const balancePriority = getPriority(balance.currency);
        // FIXED: incorrect variable name, apply early return
        if (balancePriority <= CURRENCY_PRIORITY_MIN) return false;
        if (balance.amount <= CURRENCY_AMOUNT_MIN) return true;
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.currency);
        const rightPriority = getPriority(rhs.currency);
        if (leftPriority > rightPriority) {
          return -1;
        }
        // FIXED: else is unnecessary because of the return statement above
        if (rightPriority > leftPriority) {
          return 1;
        }
        // FIXED: should return 0 instead of undefined
        return 0;
      });
  }, [balances, prices]);

  // FIXED: should use useMemo to memoize the result
  // FIXED: type should be specified at declaration time rather than cast it at use time.
  const formattedBalances: FormattedWalletBalance[] = useMemo(
    () =>
      sortedBalances.map((balance: WalletBalance) => {
        return {
          ...balance,
          formatted: balance.amount.toFixed(),
        };
      }),
    [sortedBalances]
  );

  // FIXED: should use formattedBalances instead of sortedBalances and use useMemo to memoize the result
  const rows = useMemo(
    () =>
      formattedBalances.map((balance) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
          <WalletRow
            className={classes.row}
            // Avoid using index as key
            key={balance.currency}
            amount={balance.amount}
            usdValue={usdValue}
            formattedAmount={balance.formatted}
          />
        );
      }),
    [formattedBalances, prices]
  );

  return <div {...rest}>{rows}</div>;
};
