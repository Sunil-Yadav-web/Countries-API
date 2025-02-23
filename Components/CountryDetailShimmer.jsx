import React from 'react'
import './CountryDetailShimmer.css'

export default function CountryDetailShimmer() {
  return (
    <main>
      <div className="country-details-container">
        <span className="back-button shimmer-btn"></span>
        <div className="country-details">
          <div className="flag-box"></div>
          <div className="details-text-container text-box">
            <div className="h1-box"></div>
            <div className="details-text">
            {Array.from({length:8}).map((el,i) => {
                    return <p key={i} className="p-box"></p>
                })}
            </div>
            <div className="border-con">
            <div className="border-countries border-shimmer">
            </div>
            <div className='border-span-con'>
                {Array.from({length:4}).map((el,i) => {
                    return <span key={i} className='border-span-shimmer'></span>
                })}
            </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
