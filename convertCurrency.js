import { getExchangeRate } from "./api/getExchangeRate.js";
import { getCountriesByCurrency } from "./api/getCountriesByCurrency.js";

export const convertCurrency = async (amount, from, to) => {
  const [exchangeRate, countriesByCurrency] = await Promise.all([
    getExchangeRate(from, to),
    getCountriesByCurrency(to),
  ]);

  if (amount < 0) {
    throw new Error("Amount must be a non-negative value");
  }

  const convertedAmount = (amount * exchangeRate).toFixed(2);
  const output = `The amount ${amount} ${from} is equivalent to ${convertedAmount} ${to}. You can spend this money in the following countries: ${countriesByCurrency}.`;

  return output;
};
