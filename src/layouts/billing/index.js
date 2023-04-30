// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React components
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import Sidenav from "examples/Sidenav";
import shieldImage from "../../images/secure-shield.png";
import grid from "../../images/grid.png";
import qrcode from "../../images/qr-code.png";
import { useState } from "react";

// Soft UI Dashboard React routes
// import routes from "routes";

function Payment({ brand, routes }) {
  const [subScriptionModalOpen, setSubScriptionModalOpen] = useState("");
  function openModal() {
    setSubScriptionModalOpen(!subScriptionModalOpen);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              {/* <Grid item xs={12} xl={6}>
                  <MasterCard number={4562112245947852} holder="jack peterson" expires="11/22" />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="paypal"
                    title="paypal"
                    description="Freelance Payment"
                    value="$455.00"
                  />
                </Grid> */}
              <Grid item xs={12}>
                <div className="subscription">
                  <img src={shieldImage} />
                  <div className="subscriptionText">
                    <h2>Monthly Subscription</h2>
                    <p>Timeline 5th Oct - 5th Nov</p>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={6}>
              <div className="subscription">
                <img src={grid} />
                <div className="subscriptionText">
                  <h2>No Active Subscription</h2>
                  <p>Subscribe to continue placing bets</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </SoftBox>

        {subScriptionModalOpen && (
          <SoftBox>
            <div className="subscription">
              <img src={qrcode} />
              <div className="subscriptionText">
                <h2>USDC - BSC Chain</h2>
                <div className="addressAndIcon">
                  <input type="text" />
                  <i class="fa-regular fa-copy"></i>
                </div>
              </div>
            </div>
          </SoftBox>
        )}

        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Grid item xs={12}>
                <div className="subscription">
                  <div className="subscriptionText">
                    <h2>$10</h2>
                    <p>Lorem....</p>
                    <button onClick={openModal}>Verify</button>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="subscription">
                <div className="subscriptionText">
                  <h2>$55</h2>
                  <p>Lorem....</p>
                  <button onClick={openModal}>Verify</button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="subscription">
                <div className="subscriptionText">
                  <h2>$100</h2>
                  <p>Lorem....</p>
                  <button onClick={openModal}>Verify</button>
                </div>
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Payment;
