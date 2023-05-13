import React from 'react'
import Accordions from '../CommonComponents/Accordion'
export default function Home_Accordian() {
  return (
    <div className="homePage2-accordian">
    <div className="accordionBigMain">
      <div className="accordionMain">
        <h1 className="accordionHeading"><span className="underline">Freque</span>ntly Asked Question</h1>
        <p className="accordionBio">
          Did you come here for something in particular or just general
          Riker-bashing? And blowing
        </p>
        <Accordions/>
      </div>
    </div>
    </div>
  )
}
