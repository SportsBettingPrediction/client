import React from "react";

const index = () => {
  return (
    <div className="playingTeamOpportunity">
      <div className="displayTime">
        <i className="fa-regular fa-clock"></i>
        <p>1 hr Ago</p>
      </div>
      <div className="teamLogoAndOdd">
        <p>Man U</p>
        <p>1.25</p>
      </div>
      <div className="teamLogoAndOdd">
        <p>Chelsea</p>
        <p>2.56</p>
      </div>
      <div className="percentOpportunity">
        <p>2.5%</p>
      </div>
      <div className="abitrageCalculator">
        <i className="fa-solid fa-calculator"></i>
      </div>
    </div>
  );
};

export default index;
