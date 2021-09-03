import React from 'react'

import { Link } from "react-router-dom";



export default function Compare() {

    return (
        <div className="nhl-compare-container">
            <div className="nhl-compare-link-container">
            <Link to="/NHL/teams">
                <div className="compare-link">
                    <div>
                        Team To Team
                    </div>
                </div>
            </Link>
            <Link to="/NHL/players">
                <div className="compare-link">
                    <div>
                        Player To Player
                    </div>
                </div>
            </Link>
            </div>
        </div>
    )
}
