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
import { Link } from "react-router-dom";

function Dashboard({ brand, routes }) {
  const [arbs, setArbs] = useState("");
  const [arbsTotal, setArbsTotal] = useState("");
  const [arbsAvg, setArbsAvg] = useState("");
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/authentication/sign-in");
    }
    getOpportunities();
    // console.log(loggedInUser.token);
  }, []);

  async function getOpportunities() {
    const response = await fetch("https://sportbetpredict.onrender.com/api/account/arbs", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    const data = await response.json();
    setArbs(data);
    console.log(data);

    if (response.ok) {
      // Field to retrieve and sum
      const field = "profit";

      // Calculate the sum
      const sum = data.arbs.reduce(
        (accumulator, currentValue) => accumulator + currentValue[field],
        0
      );
      setArbsTotal(sum);

      setArbsAvg(sum / data.arbs.length);
      console.log(arbsAvg);
      console.log(data.arbs.length);
      console.log(sum);
      console.log((sum / data.arbs.length) * 100);
    }
  }

  const [selectedCompany, setSelectedCompany] = useState();

  function filterBetCompany(e) {
    setSelectedCompany(e.target.value);
  }

  return (
    <DashboardLayout>
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Amount Of Opportunities" }}
                count={arbs && arbs.arbs.length}
                // percentage={{ color: "success", text: "+55%" }}
                icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Total Percentage(%)" }}
                count={arbsTotal && arbsTotal}
                // percentage={{ color: "success", text: "+3%" }}
                icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={4}>
              <MiniStatisticsCard
                title={{ text: "Average % per Opportunity" }}
                count={arbsAvg && arbsAvg.toFixed(2)}
                // percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
          </Grid>
        </SoftBox>

        <div className="dropDowns">
          <select name="languages" id="bet_company" onChange={filterBetCompany}>
            <option>--Select Bet Company--</option>
            <option value="bet9ja">Bet 9ja</option>
            <option value="sportybet">Sporty Bet</option>
            <option value="betking">Bet King</option>
          </select>

          <select name="languages" id="percentFilter">
            <option value="golang">-- Percentage Profit --</option>
            <option value="javascript">10%</option>
            <option value="php">20%</option>
            <option value="java">30%</option>
          </select>
        </div>

        {/* <SoftBox mb={9}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}></Grid>
            <Grid item xs={12} lg={5}>
              
            </Grid>
          </Grid>
        </SoftBox> */}

        <div className="matchCard">
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
          <table className="table text-dark table-border table-hover">
            <thead>
              <tr>
                <th scope="col">Book Maker</th>
                <th scope="col">Market</th>
                <th scope="col">Odds</th>
              </tr>
            </thead>
            <tbody>
              {/* {allStudents && allStudents.map(student => ( */}
              <tr className="text-dark" style={{ paddingBottom: "5rem" }}>
                <td>Bet 9ja</td>
                <td>
                  <p className="text-muted">2</p>
                </td>
                <td>
                  <p>1.23</p>
                </td>
              </tr>
              <tr className="text-dark">
                <td>Bet 9ja</td>
                <td>
                  <p className="text-muted">2</p>
                </td>
                <td>
                  <p>1.23</p>
                </td>
              </tr>
              <tr className="text-dark">
                <td>Bet 9ja</td>
                <td>
                  <p className="text-muted">2</p>
                </td>
                <td>
                  <p>1.23</p>
                </td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>
        </div>
      </SoftBox>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
