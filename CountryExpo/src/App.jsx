import React  from "react";
import { useState,useEffect }  from "react";
import './App.css';

const App =()=>{
  const [countries,setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    fetch("https://restcountries.com/v3.1/all")
    .then((res)=> res.json())
    .then((data)=> setCountries(data))
    .catch((err)=> console.error('Failed to fetch countires:',err));
  
  },[]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
);

const CountryCard=({country})=>{
  const name = country.name?.common || 'Unknown';
  const capital = country.capital?.[0] || 'N/A';
  const population = country.population?.toLocaleString() || 'N/A';
  const flagUrl = country.flags?.png || '';


return (
<div className="country-card">
  <img src={flagUrl} alt={`${name} flag`} />
  <h2>{name}</h2>
  <p><strong>Capital:</strong>{capital}</p>
  <p><strong>Population:</strong>{population}</p>
</div>
);
};

  return (
    <div className="container">
<h1>Country Explore</h1>
<input
type="text"
placeholder="Search"
value={searchTerm}
onChange={(e) => setSearchTerm(e.target.value)}
className="search-bar"
/>
<div className="country-list">
  {filteredCountries.map((country,index)=>(
    <CountryCard key ={index} country = {country}/>
  ))}
  </div>
 </div>
  );
};

export default App;


