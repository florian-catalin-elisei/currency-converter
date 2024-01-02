require("dotenv").config();
const axios = require("axios");

const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY;
const exchangeRateApi = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/USD`;
const restCountriesApi = "https://restcountries.com/v3.1/currency";

const getExchangeRate = async (sourceCurrency, targetCurrency) => {
  try {
    const response = await axios.get(exchangeRateApi);
    const { conversion_rates } = response.data;
    const rateSourceCurrency = conversion_rates[sourceCurrency];
    const rateTargetCurrency = conversion_rates[targetCurrency];
    const exchangeRate = rateTargetCurrency / rateSourceCurrency;

    if (isNaN(exchangeRate)) {
      throw new Error("Invalid exchange rate data received");
    }

    return exchangeRate;
  } catch (error) {
    throw new Error(`Error fetching exchange rates: ${error.message}`);
  }
};

const getCountries = async (targetCurrency) => {
  try {
    const response = await axios.get(`${restCountriesApi}/${targetCurrency}`);
    const { data } = response;
    const countries = data.map((country) => country.name.common);

    return countries;
  } catch (error) {
    throw new Error("Error fetching country data");
  }
};

const convertCurrency = async (sourceCurrency, targetCurrency, amount) => {
  try {
    const exchangeRate = await getExchangeRate(sourceCurrency, targetCurrency);
    const countries = await getCountries(targetCurrency);

    if (isNaN(amount) || amount < 0) {
      throw new Error("Invalid amount specified");
    }

    const resultAmount = (exchangeRate * amount).toFixed(2);
    const conversionSummary = `${amount} ${sourceCurrency} is currently worth ${resultAmount} ${targetCurrency}. Explore spending options in the following countries: ${countries}.`;

    return conversionSummary;
  } catch (error) {
    throw new Error(`Error converting currency: ${error.message}`);
  }
};

convertCurrency("RON", "KRW", 10)
  .then((response) => console.log(response))
  .catch((error) => console.log(error.message));
