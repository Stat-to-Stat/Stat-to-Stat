import React from 'react'
import { useHistory } from "react-router-dom";

function SingleSport({backgroundColor, link, img}) {

    let history = useHistory();

    const mouseEnter = (e) => {
        e.target.style.background = backgroundColor
    }

    const mouseLeave = (e) => {
        e.target.style.background = ''
    }

    const handleClick = () => {
        history.push(link)
    }

    console.log(history)

    return (
        <div onClick={handleClick} onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className="landing-page-sport-logo">
            <img src={`./SportLogos/${img}.png`} alt={img} />
        </div>
    )
}

export default SingleSport