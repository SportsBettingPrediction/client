import React from "react";
import mancityLogo from "../../../../images/manu.png";
import chelseaLogo from "../../../../images/chelsea.png";
import { Link } from "react-router-dom";

const index = () => {
  return (
    <>
      <div className="clubCard">
        <div className="time">
          <i className="fa-regular fa-clock"></i>
          <p>1hr Ago</p>
        </div>
        <div className="clubLogoAndBetCompany">
          <div className="singleClub">
            <img src={mancityLogo} />
            <p>Mancity(1.25)</p>
          </div>
          <div className="betPatform">
            <p>Vs</p>
            <p>Bet 9ja</p>
          </div>
          <div className="singleClub">
            <img src={mancityLogo} />
            <p>Mancity(1.25)</p>
          </div>
        </div>
        <div>
          <p>2.5%</p>
        </div>
        <div>
          <Link to={"/arbitragecalculator"}>
            <i className="fa-solid fa-calculator"></i>
          </Link>
        </div>
      </div>
    </>
  );
};

export default index;
