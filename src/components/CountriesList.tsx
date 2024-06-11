import React, {useEffect, useState} from 'react';
import fetchCountries from '../services/countriesService';
import CountryItem from './CountryItem';

interface Country {
  name: string;
  region: string;
  area: number;
}

const CountriesList: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterByLithuania, setFilterByLithuania] = useState<boolean>(false);
  const [filterByOceania, setFilterByOceania] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredCountries = countries
    .filter((country) => {
      if (filterByLithuania && country.area >= 65300) return false;
      if (filterByOceania && country.region !== 'OC') return false;
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Countries</h1>
      <div>
        <label>
          <input
            type='checkbox'
            checked={filterByLithuania}
            onChange={() => setFilterByLithuania(!filterByLithuania)}
          />
          Smaller than Lithuania
        </label>
        <label>
          <input
            type='checkbox'
            checked={filterByOceania}
            onChange={() => setFilterByOceania(!filterByOceania)}
          />
          Region: Oceania
        </label>
        <button onClick={handleSort}>
          Sort by name ({sortOrder === 'asc' ? 'Ascending' : 'Descending'})
        </button>
      </div>
      <ul>
        {filteredCountries.map((country) => (
          <CountryItem
            key={country.name}
            name={country.name}
            region={country.region}
            area={country.area}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountriesList;
