import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null)
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const capital = country.capital?.[0]

  useEffect(() => {
    if (!capital) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`

    axios.get(url)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        console.error("Weather fetch error:", error)
      })
  }, [capital, api_key])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>

      <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="150" />

      <h3>Weather in {capital}</h3>
      {weather ? (
        <div>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p><strong>Wind:</strong> {weather.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  )
}

export default CountryDetails
