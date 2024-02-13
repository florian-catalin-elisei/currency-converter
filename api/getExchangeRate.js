import axios from "axios";
import "dotenv/config";

const exchangeRateApi = "https://forex-convertor.p.rapidapi.com";
const exchangeRateHost = "forex-convertor.p.rapidapi.com";
const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY;

const instance = axios.create({
  baseURL: exchangeRateApi,
  headers: {
    "X-RapidAPI-Host": exchangeRateHost,
    "X-RapidAPI-Key": exchangeRateApiKey,
  },
});

export const getExchangeRate = async (from, to) => {
  try {
    const endpoint = "/getExchangeRate";
    const params = { from, to };
    const { data } = await instance.get(endpoint, { params });
    const { exchangeRate } = data;

    return exchangeRate;
  } catch (error) {
    throw new Error(`Failed to get exchange rate: ${error.message}`);
  }
};
