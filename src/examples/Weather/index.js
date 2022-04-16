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

import React, { useState, useEffect } from "react";

// @mui material components
import Divider from "@mui/material/Divider";

import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Custom styles for the Clock
import WeatherRoot from "examples/Weather/WeatherRoot";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setVisible
} from "context";

function Weather() {
  const [data, setData] = useState([]);
  const [countryName, setCountryName] = useState([]);
  const [controller, dispatch] = useMaterialUIController();
  const { searchContent, visible, darkMode } = controller;
  const [visibleResult, setVisibleResult] = useState(false)
  const handleCloseWeather = () => setVisible(dispatch, false);

  // Date
  const d = new Date();
  const date = d.getDate();
  const year = d.getFullYear();
  const month = d.toLocaleString("default", {month: 'long'});
  const day = d.toLocaleString("default", {weekday: 'long'});

  // Time
  const time = d.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const placeholderLocation = [{
    name: 'HoChiMinh',
    country: 'VN',
  }];

  const placeholderWeather = {
    weather: [{
      main: 'Clouds',
    }],
    main: {
      temp: 300,
      temp_min: 297,
      temp_max: 303,
    }
  };

  let temp = (296.1 - 273.15).toFixed(2);
  let tempMin = (297.3 - 273.15).toFixed(2);
  let tempMax = (300 - 273.15).toFixed(2);

  const handleOnclick = async (e) => {
    setVisibleResult(false);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${e.lat}&lon=${e.lon}&appid=3b9acedd8b3d02015d5abc67a5bbdbf4`);
    if (response.status != 200) {
      console.log(response.status + ', falling back to preset data');
        setData(placeholderWeather);
        return;
    }
    setData(await response.json());
  };

  useEffect(() => {
    setVisibleResult(true);
    const fetchWeather = async () => {
      console.log(searchContent);
      const res1 = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchContent}&limit=5&appid=3b9acedd8b3d02015d5abc67a5bbdbf4`);
      if (res1.status != 200) {
        console.log(res1.status + ', falling back to preset data');
        setCountryName(placeholderLocation);
        return;
      }
      const countryname = await res1.json()
      setCountryName(countryname);
    }
    fetchWeather();
  }, [searchContent]);

  let emoji = null;
  if(typeof data.main !== "undefined") {
    temp = (data.main.temp - 273.15).toFixed(2);
    tempMin = (data.main.temp_min - 273.15).toFixed(2);
    tempMax = (data.main.temp_max - 273.15).toFixed(2);
    if (data.weather[0].main === "Clouds") {
        emoji = "fa-cloud";
    } else if (data.weather[0].main === "Thunderstorm") {
        emoji = "fa-bolt";
    } else if (data.weather[0].main === "Drizzle") {
        emoji = "fa-cloud-rain";
    } else if (data.weather[0].main === "Rain") {
        emoji = "fa-cloud-shower-heavy";
    } else if (data.weather[0].main === "Snow") {
        emoji = "fa-snow-flake";
    } else {
        emoji = "fa-smog"
    }
  } 

  return (
    <WeatherRoot variant="permanent" ownerState={{ visible }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">Location</MDTypography>
          <MDTypography variant="body2" color="text">
            Location and weather
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
          onClick={handleCloseWeather}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        { visibleResult ? (countryName.map(x => (
          <MDBox pt={0.5} pb={3} px={2}>
            <MDButton onClick={() => handleOnclick(x)}>
              {x.name} ({x.country})
            </MDButton>
          </MDBox>
        ))) : (
          <MDBox pt={0.5} pb={3} px={2}>
            {(typeof data.main !== "undefined") ? (<div className="card text-white text-center border-0">
            {/* <img src={`http://source.unsplash.com/600x900/?${data.weather[0].main}`} className="card-img" alt="..." /> */}
            <div className="card-img-overlay">
            <div className="bg-dark bg-opacity-50 py-3">
                    <h2 className="card-title">{data.name}</h2>
                    <p className="card-text lead">
                        {day}, {month} {date}, {year}
                        <br />
                        {time}
                    </p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`} />
                    <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
                    <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
                    <p className="lead">{tempMin}&deg;C | {tempMax}&deg;C</p>
                </div>
            </div>
            </div>) : [] }    
          </MDBox>
        )}
      </MDBox>
    </WeatherRoot>
  );
}

export default Weather;
