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

// react-router-dom components
import { useLocation, Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAvatar from "components/MDAvatar";
// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Custom styles for the Chatting
import ChattingRoot from "examples/Chatting/ChattingRoot";
import decode from "jwt-decode";
// Material Dashboard 2 React context
import { useMaterialUIController, setOpenChatting } from "context";
import { GoogleLogin } from "react-google-login";

import { signin } from "../../actions/auth";
import * as actionType from "../../constants/actionTypes";

const initialState = { email: "", password: "" };

function Chatting() {
  const [controller, dispatch] = useMaterialUIController();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const authdispatch = useDispatch();
  const location = useLocation();
  const { openChatting, darkMode } = controller;
  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  const handleCloseChatting = () => setOpenChatting(dispatch, false);

  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    authdispatch(signin(form, navigate));
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      authdispatch({ type: actionType.AUTH, data: { result, token } });
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = (e) => console.log(e);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const logout = () => {
    authdispatch({ type: actionType.LOGOUT });

    navigate("/dashboard");

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    console.log("chatting", user);
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,

    "&:hover, &:focus, &:focus:not(:hover)": {
      background: darkMode ? background.sidenav : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${darkMode ? white.main : dark.main}`,
    },
  });

  return (
    <ChattingRoot variant="permanent" ownerState={{ openChatting }}>
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        {user?.result ? (
          <MDBox>
            <MDTypography variant="h5">Welcome to my blog</MDTypography>
            <MDTypography variant="subtitle2" color="text">
              Please leave a message.
            </MDTypography>
          </MDBox>
        ) : (
          <MDBox>
            <MDTypography variant="h5">Material UI Configurator</MDTypography>
            <MDTypography variant="body2" color="text">
              See our dashboard options.
            </MDTypography>
          </MDBox>
        )}

        <Icon
          sx={({ typography: { size }, palette: { dark, white } }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: "currentColor",
            strokeWidth: "2px",
            cursor: "pointer",
            transform: "translateY(5px)",
          })}
          onClick={handleCloseChatting}
        >
          close
        </Icon>
      </MDBox>
      <Divider />
      <MDBox pt={0.5} pb={3} px={3}>
        {user?.result ? (
          <MDBox display="flex" justifyContent="space-between" alignItems="center" lineHeight={1}>
            <MDBox display="flex" alignItems="center" lineHeight={1}>
              <MDAvatar alt={user?.result.name} src={user?.result.imageUrl} size="sm" />
              <MDBox ml={2} sx={{ width: "10rem", maxWidth: "10rem" }} lineHeight={1}>
                <MDTypography
                  display="block"
                  variant="button"
                  fontWeight="medium"
                  white-space="nowrap"
                  overflow="hidden"
                  text-overflow="ellipsis"
                >
                  {user?.result.name}
                </MDTypography>
                <MDTypography
                  display="block"
                  variant="caption"
                  white-space="nowrap"
                  overflow="hidden"
                  text-overflow="ellipsis"
                >
                  {user?.result.email}
                </MDTypography>
              </MDBox>
            </MDBox>
            <MDBox sx={{ mx: 1, width: "4rem", minWidth: "4rem" }}>
              <MDButton
                color="dark"
                variant="gradient"
                onClick={logout}
                fullWidth
                sx={sidenavTypeButtonsStyles}
              >
                Log out
              </MDButton>
            </MDBox>
          </MDBox>
        ) : (
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Sign in
              </MDTypography>
              <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <FacebookIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                    <GitHubIcon color="inherit" />
                  </MDTypography>
                </Grid>
                <Grid item xs={2}>
                  <GoogleLogin
                    clientId="1044726543814-3p8cq48607juvn0van3c4jo8dli1mfic.apps.googleusercontent.com"
                    render={(renderProps) => (
                      <MDTypography
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                        component={MuiLink}
                        href="#"
                        variant="body1"
                        color="white"
                      >
                        <GoogleIcon color="inherit" />
                      </MDTypography>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleError}
                    cookiePolicy="single_host_origin"
                  />
                </Grid>
              </Grid>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput
                    name="email"
                    type="email"
                    label="Email"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput
                    name="password"
                    type="password"
                    label="Password"
                    onChange={handleChange}
                    fullWidth
                  />
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton
                    type="submit"
                    variant="gradient"
                    color="info"
                    fullWidth
                    onClick={handleSubmit}
                  >
                    Sign in
                  </MDButton>
                </MDBox>
                <MDBox mt={3} mb={1} textAlign="center">
                  <MDTypography variant="button" color="text">
                    Don&apos;t have an account?{" "}
                    <MDTypography
                      component={Link}
                      to="/authentication/sign-up"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MDTypography>
                  </MDTypography>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        )}
      </MDBox>
    </ChattingRoot>
  );
}

export default Chatting;
