const countryName = new URLSearchParams(window.location.search).get('name')
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topDomain = document.querySelector('.top-domain')
const currencies = document.querySelector('.currencies')
const languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')
const backBtn = document.querySelector('.back-button')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
console.log(country);

flagImage.src = country.flags.svg 
countryNameH1.innerText = `${country.name.common}`
population.innerText = `${country.population.toLocaleString('en-IN')}`
region.innerText = country.region
topDomain.innerText = country.tld.join(', ')


if(country.name.nativeName) {
    nativeName.innerText = Object.values(country.name.nativeName)[0].common
}else {
    nativeName.innerText = country.name.common
}

if(country.currencies) {
    currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ')
}

if(country.languages) {
    languages.innerText = Object.values(country.languages).join(', ')
}

if(country.subregion) {
    subRegion.innerText = country.subregion
}

if(country.capital) {
    capital.innerText = country.capital?.[0]
}

if(country.borders) {
    country.borders.forEach((border) => {
    fetch(`https://restcountries.com/v3.1/alpha/${border}`)
    .then((res) => res.json())
    .then(([borderCountry]) => {
        // console.log(borderCountry)
        const borderCountryTags = document.createElement('a')
        borderCountryTags.innerText = borderCountry.name.common
        borderCountryTags.href = `country.html?name=${borderCountry.name.common}`
        borderCountries.append(borderCountryTags)
        })
    })
  }
})

backBtn.addEventListener( 'click', () => {
    history.back()
})
