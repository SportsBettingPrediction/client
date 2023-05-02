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
import { useEffect } from "react";

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
        <div className="topInputsAbitrage">
          <div>
            <p>How many bets will you place?</p>
            <select name="languages" id="percentFilter">
              <option value="golang">2</option>
              <option value="javascript">3</option>
              <option value="php">4</option>
              <option value="java">5</option>
            </select>
          </div>
          <div>
            <p>Estimate Total Stake</p>
            <input type="number" className="" />
          </div>
        </div>

        <div className="bottomInputAbitrage">
          <div className="abitrageOdds">
            <p>Bet 1</p>
            <div>
              <p>Odds (decimal)</p>
              <input type="number" />
            </div>
            <div>
              <p>Stake</p>
              <input type="number" />
            </div>
            <div>
              <p>Payout</p>
              <input type="number" />
            </div>
            <div>
              <p>Profit</p>
              <input type="number" />
            </div>
          </div>

          <div className="abitrageOdds">
            <p>Bet 2</p>
            <div>
              <p>Odds (decimal)</p>
              <input type="number" />
            </div>
            <div>
              <p>Stake</p>
              <input type="number" />
            </div>
            <div>
              <p>Payout</p>
              <input type="number" />
            </div>
            <div>
              <p>Profit</p>
              <input type="number" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RTL;
