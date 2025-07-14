import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
import CountriesListShimmer from './CountriesListShimmer'
import countriesData from '../CountriesData'

export default function CountriesLists({ query }) {
  // const [countriesData, setCountriesData] = useState([])

  // useEffect(() => {
  //   fetch('https://restcountries.com/v3.1/all')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setCountriesData(data)
  //     }).catch((err) => {
  //       throw new Error(err)
  //     }) 
  // }, [])
console.log(countriesData);
  return (
    <>
      {!countriesData.length ? (
        <CountriesListShimmer />
      ) : (
        <div className="countries-container">
          {countriesData
            .filter((country) =>
              country.name.common.toLowerCase().includes(query) || country.region.toLowerCase().includes(query)
            )
            .map((country) => {
              return (
                <CountryCard
                  key={country.name.common}
                  name={country.name.common}
                  flag={country.flags.svg}
                  population={country.population.toLocaleString('en-IN')}
                  region={country.region}
                  capital={country.capital?.[0]}
                  data={country}
                />
              )
            })}
        </div>
      )}
    </>
  )
}
