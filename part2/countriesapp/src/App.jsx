import { useState, useEffect } from 'react'
import axios from 'axios'

import CountryDetails from './components/CountryDetails'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [search, setSearch] = useState("")
  const [selectedCountry, setSelectedCountry] = useState(null)
 
  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setAllCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    setSelectedCountry(null)
  }

  const handleShowClick = (country) => {
    setSelectedCountry(country)
  }

  const filteredCountries = allCountries.filter(country =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div>
        Find countries: <input value={search} onChange={handleSearchChange} />
      </div>

      <CountryDisplay 
      countries={filteredCountries}
      selectedCountry={selectedCountry}
      handleShowClick={handleShowClick}
      />

    </div>
  )
}

const CountryDisplay = ({ countries, selectedCountry, handleShowClick }) => {
  if (selectedCountry) {
    return <CountryDetails country={selectedCountry} />
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (countries.length > 1) {
    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common}
            <button onClick={() => handleShowClick(country)}>Show</button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    return <CountryDetails country={countries[0]} />
  }

  return <p>No matches</p>
}


export default App
