import { TOKEN_PRICE_API_URL } from "../const";
import { Token } from "../interfaces";

export async function getTokenPrices(): Promise<Token[]> {
  const res = await fetch(TOKEN_PRICE_API_URL);
  return res.json();
}
