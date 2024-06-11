import React from 'react';

interface CountryProps {
  name: string;
  region: string;
  area: number;
}

const CountryItem: React.FC<CountryProps> = ({name, region, area}) => {
  return (
    <li>
      {name} - {region} - {area} km²
    </li>
  );
};

export default CountryItem;
