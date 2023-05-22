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

import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import GithubSocial from "layouts/authentication/components/Socials/github";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import AuthApi from "../../../api/auth";
import { useAuth } from "../../../auth-context/auth.context";
import { API_SERVER } from "config/constant";

function SignIn() {
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    username: "test4",
    password: "1234567890",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.removeItem("user");
  }, []);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("https://sportbetpredict.onrender.com/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response) {
      setIsLoading(false);
    }
    const data = await response.json();
    if (!response.ok) {
      setError(data.message);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } else {
      console.log(data);
    }
  };

  // const handleRedirect = () => {
  //   return navigate("/dashboard");
  // };

  return (
    <CoverLayout
      title="Welcome back"
      description="Please enter your username and password to sign in"
      image={curved9}
    >
      {isLoading ? (
        <SoftBox display="flex" justifyContent="center">
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </SoftBox>
      ) : (
        <>
          <SoftBox display="flex" flexDirection="column" alignItems="center" mb={2}>
            {/* <GithubSocial /> */}
          </SoftBox>
          <Separator />
          <SoftBox component="form" role="form">
            <SoftBox mb={2}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Username
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="text"
                name="username"
                value={formData?.username}
                onChange={handleFormData}
                placeholder="Username"
              />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography component="label" variant="caption" fontWeight="bold">
                  Password
                </SoftTypography>
              </SoftBox>
              <SoftInput
                type="password"
                name="password"
                onChange={handleFormData}
                placeholder="Password"
                value={formData?.password}
              />
            </SoftBox>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
              <div></div>
              <Link to="/forgotpassword" style={{ fontSize: "14px", color: "#344767" }}>
                Forgot Password?
              </Link>
            </div>
            <SoftBox display="flex" alignItems="center">
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <SoftTypography
                variant="button"
                fontWeight="regular"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;Remember me
              </SoftTypography>
            </SoftBox>
            <SoftBox mt={2} mb={2} textAlign="center">
              <h6
                style={{
                  fontSize: ".8em",
                  color: "red",
                  textAlign: "center",
                  fontWeight: 400,
                  transition: ".2s all",
                }}
              >
                {error}
              </h6>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton variant="gradient" color="info" onClick={submitFormData} fullWidth>
                sign in
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography variant="button" color="text" fontWeight="regular">
                Don&apos;t have an account?
                <SoftTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </>
      )}
    </CoverLayout>
  );
}

export default SignIn;
