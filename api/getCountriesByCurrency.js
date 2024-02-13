import axios from "axios";

const countriesByCurrencyApi = "https://restcountries.com/v3.1";
const instance = axios.create({ baseURL: countriesByCurrencyApi });

export const getCountriesByCurrency = async (currency) => {
  try {
    const endpoint = "/currency";
    const { data } = await instance.get(`${endpoint}/${currency}`);
    const countriesByCurrency = data.map(({ name }) => name.common);

    return countriesByCurrency;
  } catch (error) {
    throw new Error(`Failed to get countries by currency: ${error.message}`);
  }
};
