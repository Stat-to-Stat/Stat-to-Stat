import React from 'react';
import { useHistory } from 'react-router-dom';

function SingleSport({ backgroundColor, link, img, finished }) {
  let history = useHistory();

  const mouseEnter = (e) => {
    e.target.style.background = backgroundColor;
  };

  const mouseLeave = (e) => {
    e.target.style.background = '';
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
