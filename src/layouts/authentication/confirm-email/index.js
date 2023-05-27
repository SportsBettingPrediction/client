import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

const EmailConfirmPage = () => {
  const params = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    confirmEmail()
  },[])

  async function confirmEmail() {
    const response = await fetch(
      `https://sportbetpredict.onrender.com/api/email-confirmation/${params.id}/${params.token}`
    );
    const data = await response.json();
    if (response.ok) {
      setSuccessMessage(data.message);
    }
    if (!response.ok) {
      console.log(data)
      setErrorMessage(data.message);
    }
  }
  return (
    <>
      <DefaultNavbar />
      <div className="passwordResetDiv">
        {successMessage && (
          <>
            <p>Verified</p>
            <p>{successMessage}</p>
          </>
        )}
        {errorMessage && (
          <>
            <p>Verified</p>
            <p>{errorMessage}</p>
          </>
        )}
      </div>
    </>
  );
};

export default EmailConfirmPage;
