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
import { useEffect, useState, useRef } from "react";

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
import { number } from "prop-types";
import { useLocation } from "react-router-dom";

function RTL({ brand, routes }) {
  const [, dispatch] = useSoftUIController();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [stake, setStake] = useState(0);
  const [totals, setTotals] = useState({ payout: 0, profit: 0, roi: 0 });
  const [dashboardOdds, setDashboardOdds] = useState()

  const location = useLocation();

  const [odds, setOdds] = useState([
    { odd: 0, stake: 0, payout: 0 },
    { odd: 0, stake: 0, payout: 0 },
  ]);

  const handleAddBetDiv = () => {
    if (odds.length === 3) return;
    setOdds([...odds, { odd: 0, stake: 0, payout: 0 }]);
  };

  function calculateTotalArbitrage() {
    alert("Calculate odd function")
  }

  // odds from the dashboard
  console.log(dashboardOdds)

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <div className="abitragePart">
        <h2>ARBITRAGE CALCULATOR | SUREBET CALCULATOR</h2>
        <p>
          Use this calculator to determine stakes and profits for 2-3 way arbitrage opportunities!
          Auto-round surebet stakes to avoid suspicion with the bookmakers! Instructions written
          below the calculator.
        </p>
      </div>
      <div className="arbitrageCalculator">
        <h5 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Use the Arbitrage Calculator here
        </h5>
        <div className="upperArbitrageCalculator">
          <div className="topHeader"></div>
          {odds.map((odd, index) => (
            <div key={index}>
              <div className="singleBet">
                <div className="betInput">
                  <div>
                    <p>Bet {index + 1}</p>
                    <input
                      type="number"
                      id={"odd-input-" + index}
                      placeholder={`Please Enter Bet ${index + 1} Odds`}
                      onChange={(e) => {}}
                    />
                  </div>
                </div>
                <p className="calculatedValue"></p>
                <p className="calculatedValue"></p>
              </div>
            </div>
          ))}

          <div className="singleBet">
            <div className="betInput">
              <div>
                <p>Stake</p>
                <input
                  type="text"
                  placeholder="Please Enter Stake"
                  id="stake-input"
                  onChange={(e) => {}}
                />
              </div>
            </div>
            <p className="calculatedValue stakeP" style={{ backgroundColor: "#fff" }}></p>
            <p className="calculatedValue stakeP" style={{ backgroundColor: "#fff" }}></p>
          </div>
        </div>
        <div className="lowerArbitrageCalculator">
          <div className="controls">
            <button onClick={handleAddBetDiv}>
              <i className="fa-solid fa-circle-plus"></i>MORE BETS
            </button>
            <button
              onClick={(e) => {
                setOdds([
                  { odd: 0, stake: 0, payout: 0 },
                  { odd: 0, stake: 0, payout: 0 },
                ]);
                setStake(0);
                setTotals({ payout: 0, profit: 0, roi: 0 });
              }}
            >
              <i className="fa-solid fa-rotate"></i>RESET
            </button>
            <button
              onClick={() => {
                calculateTotalArbitrage();
              }}
            >
              <i className="fa-solid fa-calculator"></i>CALCULATE
            </button>
          </div>
          <div className="finalCalculation">
            <div>
              Total Payout: <span>${(totals.payout / 2).toFixed(2) || "0.00"}</span>
            </div>
            <div>
              Total Profit: <span>${totals.profit.toFixed(2) || "0.00"}</span>
            </div>
            <div>
              ROI: <span>${totals.roi.toFixed(2) || "0.00"}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default RTL;
