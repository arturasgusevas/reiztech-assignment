import React from 'react';

interface CountryProps {
  name: string;
  region: string;
  area: number;
}

const CountryItem: React.FC<CountryProps> = ({name, region, area}) => {
  return (
    <div className='country-block'>
      <div className='country-info'>
        <h2>{name}</h2>
      </div>
      <div className='country-info'>
        <p>Region: {region}</p>
      </div>
      <div className='country-info'>
        <p>Area: {area}</p>
      </div>
    </div>
  );
};

export default CountryItem;
