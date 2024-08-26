import React, { useEffect, useState } from "react";

const CountryDropdown = ({ selectedCountry, handleCountryChange }) => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of countries from the API
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch countries");
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  if (loading) {
    return <p>Loading countries...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <select
      value={selectedCountry}
      onChange={handleCountryChange}
      className="w-full p-2 border border-gray-300 rounded"
    >
      <option value="Nepal">Nepal</option>
      {countries.map((country) => (
        <option key={country.cca3} value={country.name.common}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

export default CountryDropdown;
