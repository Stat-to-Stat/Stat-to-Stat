import React from 'react'
import "./landing.css"
import axios from 'axios';
import {Title, Sports} from './components'

export default function LandingPage() {

    axios.get('https://statsapi.web.nhl.com/api/v1/teams').then(res => {
        console.log(res)
    })
    axios.get('https://statsapi.web.nhl.com/api/v1/people/8476459/stats?stats=statsSingleSeason&season=20202021').then(res => {
        console.log(res)
    })
    // axios.get('https://statsapi.web.nhl.com/api/v1/tea').then(res => {
    //     console.log(res)
    // })

    // [
    //     every player
    // ]

    return (
        <div className="landing-page-container">
            <Title />
            <Sports />
        </div>
    )
}
