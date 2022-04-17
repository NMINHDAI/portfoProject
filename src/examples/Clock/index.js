/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";

// react-github-btn
import GitHubButton from "react-github-btn";

// @mui material components
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// @mui icons
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Clock
import ClockRoot from "examples/Clock/ClockRoot";

// Material Dashboard 2 React context
import { useMaterialUIController, setOpenClock } from "context";

function Clock() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    searchContent,
    openClock,
    darkMode,
  } = controller;
  const [dateTime, setDateTime] = useState(new Date());
  const [geoData, setGeoData] = useState({});

  const placeholderResponse = {
    name: 'HoChiMinh',
    country: 'VN',
    weather: [{
      main: 'Clouds',
    }],
    main: {
      temp: 300,
      temp_min: 297,
      temp_max: 303,
    }
  };

  const fetchGeoData = async () => {
    const initRes = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchContent}&limit=5&appid=3b9acedd8b3d02015d5abc67a5bbdbf4`);
    if (initRes.status != 200) {
      console.log(initRes.status + ', falling back to preset data');
      setGeoData(placeholderResponse);
      return;
    }
    const locationRaw = (await initRes.json())[0];
    const weatherRaw = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationRaw.lat}&lon=${locationRaw.lon}&appid=3b9acedd8b3d02015d5abc67a5bbdbf4`)).json();
    const geoFinal = Object.assign(locationRaw, weatherRaw);
    setGeoData(geoFinal);
  };

  const fetchGeoDataWCoords = async (lat, lon) => {
    const weatherRaw = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3b9acedd8b3d02015d5abc67a5bbdbf4`);
    const geoFinal = await weatherRaw.json();
    console.log(geoFinal);
    setGeoData(geoFinal);
  }

  const date = () => {
    const newDt = (typeof geoData['timezone'] !== 'undefined')? 
      new Date(dateTime.getTime() + geoData['timezone'] * 1000) : 
      new Date();
    return newDt.toLocaleDateString('en-GB', {
      timeZone: 'UTC',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
    });
  }

  const time = () => {
    const newDt = (typeof geoData['timezone'] !== 'undefined')? 
      new Date(dateTime.getTime() + geoData['timezone'] * 1000) : 
      new Date();
    return newDt.toLocaleString('en-GB', {
      timeZone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });
  }

  const location = () => {
    return (typeof geoData['name'] !== 'undefined')?
    geoData['name'] : 'Null';
  };
  const weather = () => {
    return (typeof geoData['weather'] !== 'undefined')?
      geoData['weather'][0]['main'] : 'Null';
  };
  const tempCurrent = () => {
    return (typeof geoData['main'] !== 'undefined')?
    `Currently: ${formatTemp(geoData['main']['temp'])}\u00B0C` : 'Null';
  };
  const tempRange = () => {
    return (typeof geoData['main'] !== 'undefined')?
    `Range: ${formatTemp(geoData['main']['temp_min'])}\u00B0C ~ 
    ${formatTemp(geoData['main']['temp_max'])}\u00B0C` : 'Null';
  };

  const formatTemp = (t) => {
    return (t - 273.15).toFixed(2);
  };

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 1000);
    window.addEventListener('locationDecided', (e) => {fetchGeoDataWCoords(e.detail.lat, e.detail.lon);});
  }, []);

  // useEffect(() => {
  //   fetchGeoData();
  // }, [searchContent])

  const handleCloseClock = () => setOpenClock(dispatch, false);
  
  return (
    <ClockRoot variant="permanent" ownerState={{ openClock }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Time and weather</MDTypography>
          <MDTypography variant="body2" color="text">
            See the current time and weather.
          </MDTypography>
        </MDBox>

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseClock}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">Date</MDTypography>
          <MDBox mb={0.5}>
            {date()}
          </MDBox>
        </MDBox>

        <MDBox>
          <MDTypography variant="h6">Time</MDTypography>
          <MDBox mb={0.5}>
            {time()}
          </MDBox>
        </MDBox>

        <MDBox>
          <MDTypography variant="h6">Location</MDTypography>
          <MDBox mb={0.5}>
            {location()}
          </MDBox>
        </MDBox>

        <MDBox>
          <MDTypography variant="h6">Weather</MDTypography>
          <MDBox mb={0.5}>
            {weather()}
          </MDBox>
        </MDBox>

        <MDBox>
          <MDTypography variant="h6">Temperature</MDTypography>
          <MDBox mb={0.5}>
            {tempCurrent()}
          </MDBox>
          <MDBox mb={0.5}>
            {tempRange()}
          </MDBox>
        </MDBox>

        {/* <MDButton onClick={() => {console.log(dateTime.getTimezoneOffset());}}>
          Dump
        </MDButton> */}

        <Divider />
        <MDBox mt={3} mb={2}>
          <MDButton
            component={Link}
            href="https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/"
            target="_blank"
            rel="noreferrer"
            color={darkMode ? "light" : "dark"}
            variant="outlined"
            fullWidth
          >
            view documentation
          </MDButton>
        </MDBox>
        <MDBox display="flex" justifyContent="center">
          <GitHubButton
            href="https://github.com/creativetimofficial/material-dashboard-react"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star creativetimofficial/material-dashboard-react on GitHub"
          >
            Star
          </GitHubButton>
        </MDBox>
        <MDBox mt={2} textAlign="center">
          <MDBox mb={0.5}>
            <MDTypography variant="h6">Thank you for sharing!</MDTypography>
          </MDBox>

          <MDBox display="flex" justifyContent="center">
            <MDBox mr={1.5}>
              <MDButton
                component={Link}
                href="//twitter.com/intent/tweet?text=Check%20Material%20Dashboard%20React%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23react%20%mui&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-dashboard-react"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <TwitterIcon />
                &nbsp; Tweet
              </MDButton>
            </MDBox>
            <MDButton
              component={Link}
              href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard-react"
              target="_blank"
              rel="noreferrer"
              color="dark"
            >
              <FacebookIcon />
              &nbsp; Share
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
    </ClockRoot>
  );
}

export default Clock;
