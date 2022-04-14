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
// Axios for API call
import axios from "axios";

// use state
import React, {useState , useEffect} from "react";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components 
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  // var data = 29999;
  // data = 29;
  // data = 281;
  const TEMPERATURE_URL = "https://danganhapi1.herokuapp.com/api/temperature"; 
  const HUMIDITY_URL = "https://danganhapi1.herokuapp.com/api/humidity";
  const LANDHUMIDITY_URL = "https://danganhapi1.herokuapp.com/api/landHumidity"
  const LIGHT_URL = "https://danganhapi1.herokuapp.com/api/lightButton"
  // const [temperature, getID] = useState(0);
  const [tempList, getTempList] = useState([]);
  const [humidityList, getHumidityList] = useState([]);
  const [landHumidityList, getLandHumidityList] = useState([]);
  const [lightStatus, getLightStatus] = useState(false);


  const getIDs = () => {
    axios.get(TEMPERATURE_URL).then((response) => {
      // const id = response.data[response.data.length - 1].value;
      const mytempList = response.data.map( x => x.value); // Get the 
      // getID(id);
      getTempList(mytempList)
    })
    .catch((error) => console.error(`error : ${error}`));

    axios.get(HUMIDITY_URL).then((response) => {
      // const id = response.data[response.data.length - 1].value;
      const myHumidityist = response.data.map( x => x.value); // Get the 
      // getID(id);
      getHumidityList(myHumidityist)
    })
    .catch((error) => console.error(`error : ${error}`));

    axios.get(LANDHUMIDITY_URL).then((response) => {
      // const id = response.data[response.data.length - 1].value;
      const myLandHumidityist = response.data.map( x => x.value); // Get the 
      // getID(id);
      getLandHumidityList(myLandHumidityist)
    })
    .catch((error) => console.error(`error : ${error}`));

    axios.get(LIGHT_URL).then((response) => {
      // const id = response.data[response.data.length - 1].value;
      const myLightStatus = response.data[0].value; // Get the 
      // getID(id);
      getLightStatus(myLightStatus)
    })
    .catch((error) => console.error(`error : ${error}`));
  };

  useEffect(() => {
    getIDs();
  } , 0);

  const TemperatureData = {
    labels: [...Array(tempList.length).keys()].map(x => "Day ".concat((x + 1).toString())),
    datasets: { label: "Temperature", data: tempList },
  };

  const HumidityData = {
    labels: [...Array(humidityList.length).keys()].map(x => "Day ".concat((x + 1).toString())),
    datasets: { label: "Humidity", data: humidityList },
  };

  const LandHumidityData = {
    labels: [...Array(landHumidityList.length).keys()].map(x => "Day ".concat((x + 1).toString())),
    datasets: { label: "Humidity", data: landHumidityList },
  };

  // const HumidityData = {
  //   labels: [...Array(tempList.length).keys()].map(x => "Day ".concat((x + 1).toString())),
  //   datasets: { label: "Temperature", data: humidityList },
  // };
  // const[amount, setAmount]=useState(0);

  // const fetchOnce = () => {
  //   var data;
  //   return axios.get("https://jsonplaceholder.typicode.com/photos")
  //   .then((response) => {
  //     const len = response.data.length;
  //     const clone = response.data.slice(len-10,len);
  //     // console.log(Array.from(clone)[0]['id'])
  //     data = clone[0]['id'];
  //     setAmount(data);
  //   });
  // }

  // fetchOnce();

  // console.log("this is the id the second time : " , temperature);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="thermostat"
                title="Temperature (C)"
                count={tempList[tempList.length - 1]}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>

          
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="water"
                title="Air humidity"
                count={humidityList[humidityList.length - 1]}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Land humidity"
                count= {landHumidityList[landHumidityList.length - 1]}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "than yesterday",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Lights"
                count = {lightStatus === false ? "Light is off" : "Light is on"}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Last 10 days temperatures"
                  description="Temperature in the last 10 days of the garden"
                  date="campaign sent 2 days ago"
                  chart={TemperatureData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Last 10 days humidity"
                  description={
                    <>
                      Air humidity for the last 10 days.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={HumidityData}
                />
              </MDBox>
            </Grid>

            
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Last 10 days land humidity"
                  description="Land humidity for the last 10 days"
                  date="just updated"
                  chart={LandHumidityData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
