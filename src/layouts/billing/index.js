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
import QRCode from "react-qr-code";
import { useState } from "react";

// Soft UI Dashboard React routes
// import routes from "routes";

function Payment({ brand, routes }) {
  const [subScriptionModalOpen, setSubScriptionModalOpen] = useState("");
  const [copyICon, setCopyIcon] = useState(true);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  function openModal() {
    setSubScriptionModalOpen(!subScriptionModalOpen);
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(loggedInUser.userDetails.paymentAddress);
    setCopyIcon(!copyICon);
    setTimeout(() => {
      setCopyIcon(copyICon);
    }, 5000);
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
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

        {/* {subScriptionModalOpen && ( */}
        <SoftBox>
          <div className="makePayment">
            <h2>MAKE PAYMENT</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div class="qrCodeAndAddress">
              <div className="qrCode">
                <QRCode
                  value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                  size="100"
                />
              </div>
              <div class="addressAndCopy">
                {/* <p>{loggedInUser && loggedInUser.userDetails.paymentAddress}</p> */}
                <input
                  type="text"
                  value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                  disabled
                />
                {copyICon ? (
                  <i class="fa-regular fa-copy" onClick={copyToClipboard}></i>
                ) : (
                  <div>
                    <i class="fa-solid fa-check"></i>
                    <small>Copied</small>
                  </div>
                )}
              </div>
            </div>
            <p className="makePaymentBottomText">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
          </div>

          {/* <div className="subscription">
              <div className="subscriptionText">
                <h2>USDC - BSC Chain</h2>
                <div className="addressAndIcon">
                  <input
                    type="text"
                    value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                    disabled
                  />
                  {copyICon ? (
                    <i class="fa-regular fa-copy" onClick={copyToClipboard}></i>
                  ) : (
                    <div>
                      <i class="fa-solid fa-check"></i>
                      <small>Copied</small>
                    </div>
                  )}
                </div>
              </div>
            </div> */}
        </SoftBox>
        {/* )} */}

        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={4}>
              <Grid item xs={12}>
                <div className="subscriptionPlans">
                  <h3>Basic</h3>
                  <div className="priceAndDuration">
                    <h2>$10</h2>
                    <p>Monthly</p>
                  </div>
                  <button onClick={openModal}>Subscribe</button>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="subscriptionPlans second">
                <h3>Standard</h3>
                <div className="priceAndDuration">
                  <h2>$55</h2>
                  <p>6 - Months</p>
                </div>
                <button onClick={openModal}>Subscribe</button>
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="subscriptionPlans third">
                <h3>Premium</h3>
                <div className="priceAndDuration">
                  <h2>$110</h2>
                  <p>Yearly</p>
                </div>
                <button onClick={openModal}>Subscribe</button>
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Payment;
