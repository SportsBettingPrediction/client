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

function RTL({ brand, routes }) {
  const [, dispatch] = useSoftUIController();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [stake, setStake] = useState(0);
  const [totals, setTotals] = useState({payout: 0, profit: 0, roi: 0});

  const [odds, setOdds] = useState([{odd: 0, stake: 0, payout: 0},{odd: 0, stake: 0, payout: 0}]);


  const handleAddBetDiv = () => {
    if(odds.length === 3) return;
    setOdds([...odds, {odd: 0, stake: 0, payout: 0}])
  };

  function updateOdd(odd, index){
    const newOdds = odds;
    newOdds[index].odd = odd;
    setOdds(newOdds);
  }

  function calculateTotalArbitrage() {
    let totalOdds = odds.reduce((acc, val) => acc.odd + val.odd);// Sum of inverse odds
    totalOdds = totalOdds && totalOdds !== Infinity ? totalOdds : 0;
    const betAmounts = odds.map((odd) => {
      odd.stake = stake * Math.abs(1 - (odd.odd/ totalOdds));
      odd.payout = odd.odd * odd.stake;
      // console.log({stake, odd, })
      return odd
    }); // Calculate bet amounts for each outcome
    setOdds(betAmounts);

    const totalPayout = odds.reduce((acc, val) => acc.payout + val.payout);
    const totalProfit = (totalPayout/2) - stake;

    setTotals({
      payout: totalPayout,
      profit: totalProfit,
      roi: (totalProfit/stake) * 100
    })
  }

  useEffect(()=>{
    if(!odds || odds.length === 0 && !document) return;

    odds.map((odd, index)=>{
      document.querySelector("#odd-input-"+index).value = odd <= 0 ? "" : odd;
    })
  }, [odds])

  useEffect(()=>{
    if(!stake && !document) return;

    document.querySelector("#stake-input").value = stake <= 0 ? "" : stake;
  }, [stake])
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
          Use the Arbitrage Calculator here
        </h5>
        <div className="upperArbitrageCalculator">
          <div className="topHeader"></div>
          {
            odds.map((odd, index)=>
              <div key={index}>
                <div className="singleBet">
                  <div className="betInput">
                    <div>
                      <p>Bet {index+1}</p>
                      <input type="number" id={"odd-input-"+index} placeholder={`Please Enter Bet ${index+1} Odds`} onChange={(e)=>{
                        const currentValue = e.target.value;
                        const newOdd = currentValue <= 0 ? "" : currentValue;
                        updateOdd(Number(newOdd), index)
                      }}/>
                    </div>
                  </div>
                  <p className="calculatedValue">{odd.stake ? (odd.stake).toFixed(2) : ""}</p>
                  <p className="calculatedValue">{odd.payout ? (odd.payout).toFixed(2) : ""}</p>
                </div>
              </div>
            )
          }

          <div className="betInput">
            <div>
              <p>Stake</p>
              <input type="text" placeholder="Please Enter Stake" id="stake-input" onChange={e=>{
                setStake(Number(e.target.value))
              }}/>
            </div>
          </div>
        </div>
        <div className="lowerArbitrageCalculator">
          <div>
            <button onClick={handleAddBetDiv}>
              <i className="fa-solid fa-circle-plus"></i>MORE BETS
            </button>
            <button onClick={(e) => {
              setOdds([{odd: 0, stake: 0, payout: 0}, {odd: 0, stake: 0, payout: 0}]);
              setStake(0)
            }}>
              <i className="fa-solid fa-rotate"></i>RESET
            </button>
            <button onClick={()=>{
              calculateTotalArbitrage()
            }}>
              <i className="fa-solid fa-calculator"></i>CALCULATE
            </button>
          </div>
          <div className="finalCalculation">
            <div>
              Total Payout: <span>${(totals.payout/2).toFixed(2)|| "0.00"}</span>
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
    </DashboardLayout>
  );
}

export default RTL;
