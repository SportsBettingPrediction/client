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
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
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
import Sidenav from "examples/Sidenav";

function Overview({ brand, routes }) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const [showPasswordTab, setShowPasswordTab] = useState(false);
  const [loading, setLoading] = useState(false);

  const [oldpassword, setOldPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [warning, setWarning] = useState(false);
  const [checkedValues, setCheckedValues] = useState([]);
  const [bookMakersArray, setBookMakersArray] = useState([
    "18​Bet",
    "1Win",
    "22​Bet",
    "3et",
    "888​sport",
    "Be​tano",
    "Be​tano (NG)",
    "Bet​boro",
    "Bet​safe",
    "Betsson",
    "Betsson (ES)",
    "Bet​Victor",
    "Bet​first (BE)",
    "Blue​Chip",
    "Bodog (EN)",
    "Bodog (EU)",
    "Bwin",
    "Cash​point",
    "Cloud​Bet",
    "Cool​Bet",
    "Coral",
    "Dafa​bet (Dafa Sports)",
    "Dafa​bet (OW)",
    "Ef​Bet",
    "Fav​Bet",
    "Ger​ma​ni​a (HR)",
    "GG​Bet",
    "Hol​land Casino",
    "i​For​Bet",
    " Jacks",
    "KTO",
    "Mara​thon",
    "Match​book",
    "Mel​Bet",
    "Moz​zart",
    "Olimp",
    "Pari​match",
    "Pari​match (CY)",
    "Rollbit",
    "Sbo​Bet",
    "Sbo​bet (e​Sport IM)",
    "Stake",
    "Supra​bets",
    "Tempo​Bet",
    "Titan​Bet",
    "Wil​liam Hill",
    "Win​mas​ters",
    "WWin",
    "Zenit",
    "1x​Bet",
    "BetKing",
    "Bet9ja",
    "BetPawa",
    "Betbonanza",
    "MerryBet",
    "NairaBet",
    "SportyBet",
  ]);

  const [favouriteBookMakers, setFavouriteBookMakers] = useState([]);

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/dashboard/authentication/sign-in");
    }
    getFavouriteBookMakers();
  }, []);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckedValues((prevValues) => [...prevValues, value]);
    } else {
      setCheckedValues((prevValues) => prevValues.filter((v) => v !== value));
    }
  };

  async function chooseBookMakers() {
    if (checkedValues.length < 5) {
      setWarning(true);
      setTimeout(() => {
        setWarning(false);
      }, 3000);
      return;
    } else {
      setLoading(true);
      const response = await fetch(
        "https://sportbetpredict.onrender.com/api/account/bookmakers/user-favourite",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loggedInUser.token}`,
          },
          body: JSON.stringify(checkedValues),
        }
      );
      const data = await response.json();
      if (response) {
        setLoading(false);
      }
      if (response.ok) {
        setSuccessMsg(true);
        setTimeout(() => {
          setSuccessMsg(false);
        }, 3000);
        getFavouriteBookMakers()
      }
      console.log(data);
    }
  }

  async function getFavouriteBookMakers() {
    setLoading(true);
    const response = await fetch(
      "https://sportbetpredict.onrender.com/api/account/bookmakers/display-favourites",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loggedInUser.token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (response) {
      setLoading(false);
    }
    if (response.ok) {
      setFavouriteBookMakers(data.message);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Sidenav brand={brand} brandName="Arbsking" routes={routes} />
      {warning && (
        <div className="subModal">
          <i className="fa-solid fa-xmark"></i>
          <p>Please select at least 5 bookmakers.</p>
        </div>
      )}
      {successMsg && (
        <div className="subModal">
          <i className="fa-solid fa-check"></i>
          <p>Favourite bookmakers added sucessfully.</p>
        </div>
      )}
      <h6 style={{ marginTop:"2.5rem" }}>Select Favourite Bookmakers</h6>
      <div className="bookmakersContainer" style={{ marginTop:"1rem" }}>
        {bookMakersArray.map((bookmaker) => (
          <div className="book-maker-box">
            <input type="checkbox" value={bookmaker} onChange={handleCheckboxChange} />
            <label for={bookmaker}> {bookmaker} </label>
          </div>
        ))}
      </div>
      {!loading ? (
        <button className="chooseBookMakers" onClick={chooseBookMakers}>
          Add to favourites
        </button>
      ) : (
        <button className="chooseBookMakers">
          <i className="fa-solid fa-spinner"></i> Add to favourites
        </button>
      )}
      <div className="favouriteBookMakers">
        <h6 style={{ marginBottom: "0" }}>My Favourite BookMakers</h6>
        <div className="bookmakersContainer" style={{ marginTop: "1rem" }}>
          {favouriteBookMakers &&
            favouriteBookMakers.map((favouriteBookMaker) => <p>{favouriteBookMaker}</p>)}
        </div>
      </div>
      <div className="fotter">
        <Footer />
      </div>
    </DashboardLayout>
  );
}

export default Overview;
