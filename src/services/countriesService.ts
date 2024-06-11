import axios from 'axios';

interface Country {
  name: string;
  region: string;
  area: number;
}

const API_URL =
  'https://secure.geonames.org/countryInfoJSON?formatted=true&lang=eng&username=arturasg';

const fetchCountries = async (): Promise<Country[]> => {
  try {
    const {data} = await axios.get(API_URL);
    return Array.isArray(data.geonames)
      ? data.geonames.map((country: any) => ({
          name: country.countryName,
          region: country.continent,
          area: country.areaInSqKm
        }))
      : [];
  } catch (error) {
    throw new Error('Failed to fetch countries data');
  }
};

export default fetchCountries;
