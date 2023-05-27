import "./Style.css";
import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Soft UI Dashboard React routes
import routes from "./routes";
// import { ProtectedRoute } from "./ProtectedRoute";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logo-ct.png";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Dashboard from "layouts/dashboard";
import Overview from "layouts/profile";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import ForgotPassword from "layouts/authentication/forgotpassword";
import PasswordResetPage from "layouts/authentication/password-reset-page";
import EmailConfirmPage from "layouts/authentication/confirm-email";

export default function App() {
  return (
    <ThemeProvider theme={themeRTL}>
      <Routes>
        <Route path="/authentication/sign-in" element={<SignIn />} />
        <Route path="/authentication/sign-up" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/api/reset-password/:id/:token" element={<PasswordResetPage />} />
        <Route path="/api/email-confirmation/:id/:token" element={<EmailConfirmPage />} />
        <Route path="/payments" element={<Billing brand={brand} routes={routes} />} />
        <Route path="/" element={<Dashboard brand={brand} routes={routes} />} />
        <Route path="/dashboard" element={<Dashboard brand={brand} routes={routes} />} />
        <Route path="/profile" element={<Overview brand={brand} routes={routes} />} />
        <Route path="/arbitragecalculator" element={<RTL brand={brand} routes={routes} />} />
      </Routes>
    </ThemeProvider>
  );
}
