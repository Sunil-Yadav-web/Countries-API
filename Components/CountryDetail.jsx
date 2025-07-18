import React, { useEffect, useState } from 'react'
import './CountryDetail.css'
import { Link, useLocation, useParams } from 'react-router-dom'
import CountryDetailShimmer from './CountryDetailShimmer'
import { useTheme } from '../Hooks/useTheme'

export default function CountryDetail() {
 const [isDark]= useTheme()
  const params = useParams()
  const {state} = useLocation()

  // console.log(state);
  const countryName = params.country

  const [countryData, setCountryData] = useState(null)
  const [notFound, setNotFound] = useState(false)

  function updateCountryData (data) {
    
    if(!data.borders){
      data.borders = []
    }

    setCountryData({
      name: data.name.common || data.name,
      nativeName: Object.values(data.name.nativeName || {})[0]?.common,
      population: data.population.toLocaleString('en-IN'),
      region: data.region,
      subregion: data.subregion,
      capital: data.capital,
      tld: data.tld.join(', '),
      currencies: Object.values(data.currencies || {})
        .map((currency) => currency.name)
        .join(', '),
      languages: Object.values(data.languages || {}).join(', '),
      flag: data.flags.svg,
      borders: [],       
    })

   Promise.all( data.borders.map((border) => {
    return  fetch(`https://restcountries.com/v3.1/alpha/${border}`)
      .then((res) => res.json())
      .then(([borderCountry]) => borderCountry.name.common)
    })).then((borders) => {
      setTimeout(() => setCountryData((prevState)=> ({...prevState,borders})))
      // console.log(borders)
    }).catch((err) => {
      console.log(err.message)
    })
  }

  useEffect(() => {

    if(state) {
      updateCountryData(state)
      return
    }

    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        // console.log(data)
        updateCountryData(data)
      })
      .catch((err) => {
        setNotFound(true)
      })
  }, [countryName])

  if (notFound) {
    return <div>Country Not Found</div>
  }

  return countryData === null ? (
   <CountryDetailShimmer/>
  ) : (
    <>
    <main  className={`${isDark? 'dark': ''}`}>
      <div className="country-details-container">
        <span
          className="back-button"
          onClick={() => {
            history.back()
          }}
        >
          <i className="fa-solid fa-arrow-right arrow-left"></i>&nbsp;&nbsp;Back
        </span>
        <div className="country-details">
          <img src={countryData.flag} />
          <div className="details-text-container">
            <h1>{countryData.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: </b>
                <span className="native-name">{countryData.nativeName || countryData.name}</span>
              </p>
              <p>
                <b>Population: </b>
                <span className="population">{countryData.population} </span>
              </p>
              <p>
                <b>Region: </b>
                <span className="region"> {countryData.region}</span>
              </p>
              <p>
                <b>Sub Region: </b>
                <span className="sub-region">{countryData.subregion}</span>
              </p>
              <p>
                <b>Capital: </b>
                <span className="capital">{countryData.capital?.join(',')}</span>
              </p>
              <p>
                <b>Top Level Domain: </b>
                <span className="top-domain">{countryData.tld}</span>
              </p>
              <p>
                <b>Currencies: </b>
                <span className="currencies"> {countryData.currencies}</span>
              </p>
              <p>
                <b>Languages: </b>
                <span className="languages">{countryData.languages} </span>
              </p>
            </div>
           { countryData.borders.length !== 0 && <div className="border-countries">
              <b>Border Countries:</b>&nbsp;&nbsp;
              {countryData.borders.map((border) => (
                <Link key={border} to={`/${border}`}>{border}</Link>
              ))}
            </div>}
          </div>
        </div>
      </div>
    </main>
    </>
  )
}
