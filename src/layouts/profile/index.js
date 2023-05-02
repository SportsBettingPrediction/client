import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

import { useEffect, useState } from "react";

// Images
// import homeDecor1 from "assets/images/home-decor-1.jpg";
// import homeDecor2 from "assets/images/home-decor-2.jpg";
// import homeDecor3 from "assets/images/home-decor-3.jpg";
// import team1 from "assets/images/team-1.jpg";
// import team2 from "assets/images/team-2.jpg";
// import team3 from "assets/images/team-3.jpg";
// import team4 from "assets/images/team-4.jpg";
import Sidenav from "examples/Sidenav";

function Overview({ brand, routes }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  // console.log();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/authentication/sign-in");
    }
  }, []);

  async function changePassword() {
    if (oldPassword.length <= 0 || newPassword.length <= 0) {
      setMsg("Please the fields can not be left empty");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    setLoading(true);
    const resp = await fetch("https://sportbetpredict.onrender.com/api/changepassword", {
      method: "POST",
      body: JSON.stringify({ setOldPassword, setNewPassword }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    });
    if (resp) {
      setLoading(false);
    }
    const data = await resp.json();
    if (resp.ok) {
      console.log(data);
      setMsg("Password Changed Successfully");
    }
    if (!resp.ok) {
      setMsg("Something went wrong");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  }

  return (
    <DashboardLayout>
      <Header />
      <Sidenav brand={brand} brandName="Soft UI Dashboard" routes={routes} />
      <div className="userDoubleInfo">
        <div className="userSingleInfo">
          <p>First Name</p>
          <div className="iconAndDetail">
            <i className="fa-solid fa-user"></i>
            <p>{loggedInUser && loggedInUser.userDetails.firstname}</p>
          </div>
        </div>
        <div className="userSingleInfo">
          <p>Last Name</p>
          <div className="iconAndDetail">
            <i className="fa-solid fa-user"></i>
            <p>{loggedInUser && loggedInUser.userDetails.lastname}</p>
          </div>
        </div>
      </div>

      <div className="userDoubleInfo">
        <div className="userSingleInfo">
          <p>Email</p>
          <div className="iconAndDetail">
            <i className="fa-solid fa-envelope"></i>
            <p>{loggedInUser && loggedInUser.userDetails.email}</p>
          </div>
        </div>
        <div className="userSingleInfo">
          <p>Payment Address</p>
          <div className="iconAndDetail">
            <i className="fa-solid fa-wallet"></i>
            <p>{loggedInUser && loggedInUser.userDetails.paymentAddress}</p>
          </div>
        </div>
      </div>

      <div className="userSingleInfo">
        <p>Password</p>
        <div className="iconAndDetail">
          <i className="fa-solid fa-key"></i>
          <p>**********</p>
        </div>
        <div className="changePasswordTab">
          <button
            onClick={() => setShowPasswordTab(!showPasswordTab)}
            className="changePasswordButton"
          >
            {!showPasswordTab ? (
              <>Change Password</>
            ) : (
              <>
                <i className="fa-solid fa-xmark"></i>
              </>
            )}
          </button>
          <div>
            {msg && <p className="msg">{msg}</p>}
            {showPasswordTab && (
              <>
                <input
                  type="password"
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="New password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <br />
                {!loading ? (
                  <button type="button" className="submitButton" onClick={changePassword}>
                    Submit
                  </button>
                ) : (
                  <button type="button" disabled className="buttonload">
                    <i className="fa fa-spinner fa-spin"></i>
                    <p style={{ margin: 0 }}>Submit</p>
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Overview;
