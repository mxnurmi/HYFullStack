import React, { useState, useEffect } from 'react'
import axios from 'axios'

/*
const Country = ({ country}) => (
  <div> {country.name} </div> 
)
*/

const InfoCountry = ( {country} ) => {

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
    </div>
  )
}

const Countries = ( {countriesToShow} ) => {
  const [ selectedCountries, setSelectedCountries ] = useState(countriesToShow)

  const handleClick = ({ country }) => () => {
    console.log('click')
    setSelectedCountries({country})
  }

/*         {selectedCountries ? <InfoCountry country={selectedCountries} /> : null} */

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
    return(
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


  const countriesToShow = filterName === '' 
  ? []
  : countries.filter(country => (country.name.toLowerCase()).includes(filterName.toLowerCase()))

  return(
    <div>
      find countries <input type="text" value={filterName} onChange={(event) => setFilterName(event.target.value)} />
      <Countries countriesToShow={countriesToShow} />
    </div>
  )

}

export default App
