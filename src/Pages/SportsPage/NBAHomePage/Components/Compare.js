import React from 'react'

import { Link } from "react-router-dom";



export default function Compare() {

    return (
        <div className="sportspage-compare-container">
            <div className="sportspage-compare-link-container">
            <Link to="/NBA/teams">
                <div className="compare-link">
                    <div>
                        Team To Team
                    </div>
                </div>
            </Link>
            <Link to="/NBA/players">
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
