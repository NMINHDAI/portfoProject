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
    openClock,
    darkMode,
  } = controller;
  const [dateTime, setDateTime] = useState(new Date());

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 1000);
  }, []);

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
          <MDTypography variant="h5">Clock</MDTypography>
          <MDTypography variant="body2" color="text">
            See the current date and time.
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
            {
              dateTime.toLocaleDateString('en-GB', {
                timeZone: 'asia/ho_chi_minh',
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                weekday: 'long',
              })
            }
          </MDBox>
        </MDBox>

        <MDBox>
          <MDTypography variant="h6">Time</MDTypography>

          <MDBox mb={0.5}>
            {
              dateTime.toLocaleString('en-GB', {
                timeZone: 'asia/ho_chi_minh',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
              })
            }
          </MDBox>
        </MDBox>
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
