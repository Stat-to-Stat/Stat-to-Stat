import React from 'react';
import { useHistory } from 'react-router-dom';

function SingleSport({background, backgroundColor, link, img, finished }) {
  let history = useHistory();

  const backgroundStyle = "radial-gradient(163.19% 93.36% at 50% 46.95%,#28282c 0%,#1a1a1d 34.38%,#2c2c30 61.98%,#1a1a1d 100%)"

  const mouseEnter = (e) => {
    e.target.style.background = backgroundColor;
    const mainContaier = document.getElementsByClassName('landing-page-container')[0]
    mainContaier.style.backgroundImage = `url(./SportLogos/${background}.jpeg)`
    mainContaier.style.backgroundSize = "cover"
    mainContaier.style.backgroundRepeat = "no-repeat"
    mainContaier.style.backgroundPosition = "center";
  };

  const mouseLeave = (e) => {
    e.target.style.background = '';
    document.getElementsByClassName('landing-page-container')[0]
    .style.background = backgroundStyle
  };

  const handleClick = () => {
    history.push(link);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      className={`landing-page-sport-logo ${finished ? '' : 'coming-soon'}`}
    >
      <img src={`./SportLogos/${img}.png`} alt={img} />
    </div>
  );
}

export default SingleSport;
