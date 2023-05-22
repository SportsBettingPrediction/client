import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const PasswordResetPage = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(id, token);
  }, []);

  async function resetPassword() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/forgotpassword/reset-password",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id, token: token, password: password }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (response) {
      setLoading(false);
      console.log(response);
    }
    if (response.ok) {
      setSuccessMsg(`Password has been reset successfully`);
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      navigate("/authentication/sign-in");
    }

    if (!response.ok) {
      setErrorMsg(data.message);
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  }
  return (
    <>
      <DefaultNavbar />
      <div className="passwordResetDiv">
        {successMsg && <p className="emailSuccess">{successMsg}</p>}
        {errorMsg && <p className="emailError">{errorMsg}</p>}
        <p>Reset Password</p>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
          placeholder="Confirm Password"
        />
        {!loading ? (
          <button className="resetPasswordBtn" onClick={(e) => resetPassword()}>
            Reset Password
          </button>
        ) : (
          <button className="resetPasswordBtn">
            <i className="fa-solid fa-spinner"></i> Reset Password
          </button>
        )}
      </div>
    </>
  );
};

export default PasswordResetPage;
