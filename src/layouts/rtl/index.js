/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// RTL layout components
import BuildByDevelopers from "layouts/rtl/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/rtl/components/WorkWithTheRockets";
import Projects from "layouts/rtl/components/Projects";
import OrderOverview from "layouts/rtl/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/rtl/data/reportsBarChartData";
import gradientLineChartData from "layouts/rtl/data/gradientLineChartData";

// Soft UI Dashboard React contexts
import { useSoftUIController, setDirection } from "context";
import Sidenav from "examples/Sidenav";

function RTL({ brand, routes }) {
  const [, dispatch] = useSoftUIController();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [betDivs, setBetDivs] = useState([]);

  const handleAddBetDiv = () => {
    setBetDivs((prevDivs) => [
      ...prevDivs,
      <div key={prevDivs.length}>
        {console.log(prevDivs.length + 2)}
        <div className="singleBet">
          <div className="betInput">
            <div>
              <p>Bet {prevDivs.length + 3}</p>
              <input type="text" placeholder={`Please Enter Bet ${prevDivs.length + 3} Odds`} />
            </div>
          </div>
          <p className="calculatedValue"></p>
          <p className="calculatedValue"></p>
        </div>
      </div>,
    ]);
  };
  // const getInitialState = () => {
  //   const value = 2;
  //   return value;
  // };

  // const [value, setValue] = useState(getInitialState);

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  //   console.log(value);
  // };

  // // console.log(arbitrageCalculator.target);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <div className="abitragePart">
        <h2>ARBITRAGE CALCULATOR | SUREBET CALCULATOR</h2>
        <p>
          Use this calculator to determine stakes and profits for 2-5 way arbitrage opportunities!
          Auto-round surebet stakes to avoid suspicion with the bookmakers! Instructions written
          below the calculator.
        </p>
      </div>
      <div className="arbitrageCalculator">
        <h5 style={{ textAlign: "center", marginBottom: "3rem" }}>
          Use the Abitrage Calculator here
        </h5>
        <div className="upperArbitrageCalculator">
          <div className="topHeader"></div>

          <div className="singleBet">
            <div className="betInput">
              <p style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "5px" }}>
                Enter Odds & Stake
              </p>
              <div>
                <p>Bet 1</p>
                <input type="text" placeholder="Please Enter Bet 1 Odds" />
              </div>
            </div>

            <div className="stakeInput">
              <p style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "5px" }}>Stake</p>
              <p className="calculatedValue"></p>
            </div>

            <div className="payoutInput">
              <p style={{ fontSize: "17px", fontWeight: "bold", marginBottom: "5px" }}>Payout</p>
              <p className="calculatedValue"></p>
            </div>
          </div>

          <div className="singleBet">
            <div className="betInput">
              <div>
                <p>Bet 2</p>
                <input type="text" placeholder="Please Enter Bet 2 Odds" />
              </div>
            </div>
            <p className="calculatedValue"></p>
            <p className="calculatedValue"></p>
          </div>

          {betDivs.map((div, index) => (
            <div key={index}>{div}</div>
          ))}

          <div className="betInput">
            <div>
              <p>Stake</p>
              <input type="text" placeholder="Please Enter Stake" />
            </div>
          </div>
        </div>
        <div className="lowerArbitrageCalculator">
          <div>
            <button onClick={handleAddBetDiv}>
              <i className="fa-solid fa-circle-plus"></i>MORE BETS
            </button>
            <button onClick={(e) => location.reload()}>
              <i className="fa-solid fa-rotate"></i>RESET
            </button>
            <button>
              <i className="fa-solid fa-calculator"></i>CALCULATE
            </button>
          </div>
          <div className="finalCalculation">
            <div>
              Total Payout: <span>$0.00</span>
            </div>
            <div>
              Total Profit: <span>$0.00</span>
            </div>
            <div>
              ROI: <span>$0.00</span>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RTL;
