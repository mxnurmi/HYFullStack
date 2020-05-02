import React, { useState, useEffect } from 'react'
import axios from 'axios'

const InfoCountry = ( {country} ) => {
  const [ weatherData, setWeatherData ] = useState([])
  const [ weatherPic, setWeatherPic] = useState("https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png")

  const query = country.name

  const access_key = process.env.REACT_APP_API_KEY

  useEffect(() => {

    axios
      .get('http://api.weatherstack.com/current', {
        params: {
          access_key: access_key,
          query: query
        }
      })
      .then(response => {  
        setWeatherData(response.data.current)
        setWeatherPic(response.data.current.weather_icons)
        console.log(response.data)
          
      })
  }, []) 

  return(
    <div> 
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>

        {country.languages.map((element, i) => (
          <li key={element.name}>{element.name}</li>
        ))}

      <div><img src={country.flag} alt='flag' height="100" width="150"/></div>

      <h3>Weather in {country.name}</h3>
      <div><b>temperature:</b> {weatherData.temperature} ℃</div>
      <div><img src={weatherPic} alt='weather' height="100" width="100"/></div>
      <div><b>wind:</b> {weatherData.wind_speed} km/h, direction: {weatherData.wind_dir}</div>
    </div>
  )
}

const Countries = ({ countriesToShow, handleClick }) => {

  if (countriesToShow.length === 0) {
    return('')
  } else if (countriesToShow.length > 1 && countriesToShow.length < 11) {
    return (
      countriesToShow.map((country, i) => 
      <div key={i}>
        {country.name} <button onClick={handleClick(country)}> show </button>
      </div>
    ))
  } else if (countriesToShow.length === 1) {
    const country = countriesToShow[0]
    return (  
      <InfoCountry country={country} />
    )
  } else {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterName, setFilterName ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, []) 

  const handleClick = (country) => () => {
    setFilterName(country.name)
  }

  const countriesToShow = filterName === '' 
  ? []
  : countries.filter(country => (country.name.toLowerCase()).includes(filterName.toLowerCase()))

  return(
    <div>
      find countries <input type="text" value={filterName} onChange={(event) => setFilterName(event.target.value)} />
      <Countries countriesToShow={countriesToShow} handleClick={handleClick} />
    </div>
  )

}

export default App
