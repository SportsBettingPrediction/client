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

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

import Sidenav from "examples/Sidenav";

import Index from "layouts/dashboard/components/Matchcard/Index";
import { useNavigate } from "react-router-dom";
import mancityLogo from "../../images/manu.png";
import LoadingGif from "../../assets/images/loader/loading-gif.gif";
import { Link } from "react-router-dom";

function Dashboard({ brand, routes }) {
  const [arbs, setArbs] = useState();
  const [arbsInvalid, setArbsInvalid] = useState("");
  const [arbsTotal, setArbsTotal] = useState("");
  const [arbsAvg, setArbsAvg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [bookmarkers, setBookmarkers] = useState();
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
    getOpportunities();
  }, []);

  async function getOpportunities() {
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (response) {
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  async function getNigerianOpportunities() {
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs/nigerian", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (response) {
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  async function getNigerianForeignOpportunities() {
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs/nigerian-foreign", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (response) {
      setIsLoading(false);
    }
    if (response.status === 401) {
      setArbsInvalid("");
      setArbs(null);
    }

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setArbs(data);
      data.arbs.map((bookmaker) => {
        setBookmarkers(bookmaker.bookmakers.split(","));
      });
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
    }
  }

  const [selectedCompany, setSelectedCompany] = useState("");
  // getOpportunities()

  function filterBetCompany(e) {
    setSelectedCompany(e.target.value);
    console.log(selectedCompany)
    if (e.target.value === "nigerian-nigerian") {
      getNigerianOpportunities()
      } else if (e.target.value === "all") {
        getOpportunities();
      }else if(e.target.value === "nigerian-foreign"){
        console.log("ni-fr")
        getNigerianForeignOpportunities()
      }
    }

  function openArbCalculator() {
    navigate("/arbitragecalculator");
  }

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      <DashboardNavbar />
      <div className="dasboardContainer">
        <SoftBox py={3}>
          <SoftBox mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Amount Of Opportunities" }}
                  count={arbs && arbs.arbs.length}
                  icon={{ color: "info", component: "paid" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Total Percentage(%)" }}
                  count={arbsTotal && arbsTotal.toFixed(2)}
                  icon={{ color: "info", component: "public" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} xl={4}>
                <MiniStatisticsCard
                  title={{ text: "Average % per Opportunity" }}
                  count={arbsAvg && arbsAvg.toFixed(2)}
                  icon={{ color: "info", component: "emoji_events" }}
                />
              </Grid>
            </Grid>
          </SoftBox>
          <div className="loadingGif">{isLoading && <img src={LoadingGif} />}</div>

          <div className="select">
            <select name="languages" id="bet_company" onChange={filterBetCompany}>
              <option value="all">All</option>
              <option value="nigerian-nigerian">Nigerian - Nigerian</option>
              <option value="nigerian-foreign">Nigerian - Foreign</option>
            </select>

            {/* <select name="languages" id="percentFilter">
            <option value="golang">-- Percentage Profit --</option>
            <option value="javascript">10%</option>
            <option value="php">20%</option>
            <option value="java">30%</option>
          </select> */}
          </div>
          {arbs === null ? (
            <p className="noSubMsg">You do not have an active subscription</p>
          ) : (
            <>
              {arbs &&
                arbs.arbs.map((arb) => (
                  <div className="matchCard" key={arb._id}>
                    <div className="clubCard">
                      <div className="time">
                        <i className="fa-regular fa-clock"></i>
                        <p>{arb.matchTime}</p>
                      </div>
                      <div className="clubLogoAndBetCompany">
                        <div className="singleClub">
                          {/* <img src={mancityLogo} /> */}
                          <i className="fa-regular fa-futbol fs-5"></i>
                          <p>{arb.teams.split(" – ").map((team) => team.trim())[0]}</p>
                        </div>
                        <div className="betPatform mx-4">
                          <p>Vs</p>
                        </div>
                        <div className="singleClub">
                          {/* <img src={mancityLogo} /> */}
                          <i className="fa-regular fa-futbol fs-5"></i>
                          <p>{arb.teams.split(" – ").map((team) => team.trim())[1]}</p>
                        </div>
                      </div>
                      <div>
                        <p>{arb.profit}%</p>
                      </div>
                      <div>
                        <Link to="/dashboard/arbitragecalculator" state={{ value: arb.odds }}>
                          {/* {console.log(arb.odds.split(","))} */}
                          <i className="fa-solid fa-calculator" onClick={openArbCalculator}></i>
                        </Link>
                      </div>
                    </div>
                    <div className="arbs">
                      <div className="text-dark" style={{ paddingBottom: "5rem" }}>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Book Maker</p>
                        {arb &&
                          arb.bookmakers.split(",").map((bookmaker) => (
                            <p key={bookmaker} style={{ display: "block" }}>
                              {bookmaker}
                            </p>
                          ))}
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Market</p>
                        {arb &&
                          arb.markets.split(",").map((market) => (
                            <p className="text-muted" key={market}>
                              {market}
                            </p>
                          ))}
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Odds</p>
                        {arb && arb.odds.split(",").map((odd) => <p key={odd}>{odd}</p>)}
                      </div>
                      <div>
                        <p style={{ fontWeight: "bold", fontSize: "17px" }}>Go to</p>
                        {arb &&
                          arb.bookmakersLink.split(",").map((bookmaker) => (
                            <p key={bookmaker} style={{ display: "block" }}>
                              <a href={`https://en.surebet.com${bookmaker}`} target="_blank">
                                <i className="fa-solid fa-up-right-from-square"></i>
                              </a>
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>
                ))}
            </>
          )}
        </SoftBox>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
