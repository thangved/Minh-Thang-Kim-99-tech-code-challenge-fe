export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function stringToNumber(amount: string): number {
  const isHasTrailingDot = amount.endsWith(".");
  if (isHasTrailingDot) {
    throw new Error("Invalid number");
  }
  return Number(amount.replace(/,/g, ""));
}

function toFixedIfNeeded(amount: number) {
  return Number(amount.toFixed(3)).toString();
}

export function formatNumber(amount?: number | string) {
  if (!amount) return "";
  let normalizedAmount =
    typeof amount === "string" ? amount.replace(/,/g, "") : amount.toString();

  if (!normalizedAmount.endsWith(".")) {
    normalizedAmount = toFixedIfNeeded(Number(normalizedAmount));
  }

  return normalizedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
