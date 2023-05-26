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
import { useState, useEffect } from "react";

// Soft UI Dashboard React routes
// import routes from "routes";

function Payment({ brand, routes }) {
  const [subScriptionStatus, setSubScriptionStatus] = useState();
  const [subScriptionInfo, setSubScriptionInfo] = useState("");
  const [subMsg, setSubMsg] = useState("");
  const [copyICon, setCopyIcon] = useState(true);
  const [loading10, setLoading10] = useState(false);
  const [loading55, setLoading55] = useState(false);
  const [loading110, setLoading110] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  // function openModal() {
  //   setSubScriptionModalOpen(!subScriptionModalOpen);
  // }

  function copyToClipboard() {
    navigator.clipboard.writeText(loggedInUser.userDetails.paymentAddress);
    setCopyIcon(!copyICon);
    setTimeout(() => {
      setCopyIcon(copyICon);
    }, 5000);
  }

  console.log(loggedInUser);

  useEffect(() => {
    getUsersSubscriptionStatus();
  }, []);

  async function payForSub(subId, subAmount) {
    if (subAmount === "10") {
      setLoading10(true);
    } else if (subAmount === "55") {
      setLoading55(true);
    } else {
      setLoading110(true);
    }
    console.log(subId);
    const response = await fetch("https://sportbetpredict.onrender.com/api/purchase/subscription", {
      method: "POST",
      body: JSON.stringify({
        subscription_id: subId,
        user_payment_address: `${loggedInUser.userDetails.paymentAddress}`,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (response) {
      setLoading10(false);
      setLoading55(false);
      setLoading110(false);
    }
    const data = await response.json();
    setSubMsg(data.message);
    setTimeout(() => {
      setSubMsg();
    }, 5000);
    console.log(data);
  }

  async function getUsersSubscriptionStatus() {
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/user/sub-status",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    setSubScriptionInfo(data);
    setSubScriptionStatus(data.subStatus);
  }

  return (
    <DashboardLayout>
      {subMsg && (
        <div className="subModal">
          <div className="subModalContent">{subMsg}</div>
        </div>
      )}
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <SoftBox mt={4}>
        <SoftBox mb={1.5}>
          <Grid container spacing={3}>
            {subScriptionStatus && subScriptionStatus ? (
              <Grid item xs={12} lg={6}>
                <Grid item xs={12}>
                  <div className="subscription">
                    <img src={shieldImage} />
                    <div className="subscriptionText">
                      <h2>Active Subscription</h2>
                      <p>
                        {new Date(subScriptionInfo.userSub.subACreatedAt).toString().slice(3, 11)} -
                        {new Date(subScriptionInfo.userSub.expiringDate).toString().slice(3, 11)}
                      </p>
                    </div>
                  </div>
                </Grid>
              </Grid>
            ) : (
              <>
                {subScriptionInfo && subScriptionInfo.userSubStatus === "No Subscription" ? (
                  <Grid item xs={12} lg={6}>
                    <div className="subscription">
                      <img src={grid} />
                      <div className="subscriptionText">
                        <h2>{subScriptionInfo.userSubStatus}</h2>
                        <p>Subscribe to continue placing bets</p>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} lg={6}>
                    <div className="subscription">
                      <img src={grid} />
                      <div className="subscriptionText">
                        <h2>{subScriptionInfo.userSubStatus}</h2>
                        <p>Subscribe to continue placing bets</p>
                      </div>
                    </div>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </SoftBox>
        <SoftBox>
          <div className="makePayment">
            <h2>MAKE PAYMENT</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industry's standard dummy text ever since the 1500s.
            </p>

            <div className="qrCodeAndAddress">
              <div className="qrCode">
                <QRCode
                  value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                  size="100"
                />
              </div>
              <div className="addressAndCopy">
                <input
                  type="text"
                  value={loggedInUser && loggedInUser.userDetails.paymentAddress}
                  disabled
                />
                {copyICon ? (
                  <i className="fa-regular fa-copy" onClick={copyToClipboard}></i>
                ) : (
                  <div>
                    <i className="fa-solid fa-check"></i>
                    <small>Copied</small>
                  </div>
                )}
              </div>
            </div>
            <p className="makePaymentBottomText">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
          </div>
        </SoftBox>

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
                  {!loading10 ? (
                    <button onClick={() => payForSub("64690b1694617642d7b9ef9f", "10")}>
                      Subscribe
                    </button>
                  ) : (
                    <button className="disabledBtn">
                      <i className="fa-solid fa-spinner"></i> Subscribe
                    </button>
                  )}
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
                {!loading55 ? (
                  <button onClick={() => payForSub("64690b1e94617642d7b9efa0", "55")}>
                    Subscribe
                  </button>
                ) : (
                  <button className="disabledBtn">
                    <i className="fa-solid fa-spinner"></i> Subscribe
                  </button>
                )}
              </div>
            </Grid>
            <Grid item xs={12} lg={4}>
              <div className="subscriptionPlans third">
                <h3>Premium</h3>
                <div className="priceAndDuration">
                  <h2>$110</h2>
                  <p>Yearly</p>
                </div>
                {!loading110 ? (
                  <button onClick={() => payForSub("64690b0b94617642d7b9ef9e", "110")}>
                    Subscribe
                  </button>
                ) : (
                  <button className="disabledBtn">
                    <i className="fa-solid fa-spinner"></i> Subscribe
                  </button>
                )}
              </div>
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Payment;
