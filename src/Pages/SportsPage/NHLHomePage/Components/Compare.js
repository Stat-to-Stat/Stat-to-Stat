import React from 'react'

import { Link } from "react-router-dom";



export default function Compare() {

    return (
        <div className="nhl-compare-container">
            <div className="nhl-compare-link-container">
                <div className="nhl-link-container">
                <Link to="/NHL/teams"><div>Team To Team</div></Link>
                </div>
                <div className="nhl-link-container">
                <Link to="/NHL/players"><div>Player To Player</div></Link>
                </div>
            </div>
        </div>
    )
}
