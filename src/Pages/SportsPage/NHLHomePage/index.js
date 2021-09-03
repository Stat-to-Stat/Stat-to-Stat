import React from 'react'
import "./NHL.css"

import Title from "./Components/Title"
import Compare from "./Components/Compare"

export default function NHLHomePage() {
    return (
        <div className="nhl-main-container">
            <Title />
            <Compare />
        </div>
    )
}
