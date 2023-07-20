import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { blue } from "@mui/material/colors";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/Navbar.js";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();
let updateCount = 0;
const Home = () => {
  const navigate = useNavigate();
  const [authenticated, setauthenticated] = useState(null);
  useEffect(() => {
    // Check user logged in or not
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser) {
      setauthenticated(loggedInUser);
    }
  }, []);

  const [count, setCount] = useState(10);
  // const [update, setUpdate] = useState();
  const increase = () => {
    setCount(count + 1);
  };
  const decrease = () => {
    setCount(count - 1);
  };

  // const testing = () => {
  //   setUpdate(new Date());
  // };
  // const [color, setColor] = useState("green");

  // const [count, setCount] = useState(0);

  useEffect(() => {
    //change the title
    document.title = `You clicked ${count} times`;
    // updateCount++;
    // console.log(updateCount);
    console.log("a", count);
    //if count equal to 15 redirect to login
    if (count === 15) {
      navigate("/login");
      localStorage.clear();
      console.log("b", count);
    }
  }, [count]);
  // const handleClick = () => {
  //   setColor("blue");
  // };

  if (!authenticated) {
    navigate("/login");
    // <Navigate replace to="/login" />;
  } else {
    return (
      // <Container fixed>
      //   <Grid
      //     display={"flex"}
      //     sx={{ justifyContent: "center", alignContent: "center" }}
      //   >
      //     <p>Welcome to your Home</p>

      //     <p>You clicked {count} times</p>
      //     <button onClick={() => setCount(count + 1)}>Click me</button>
      //   </Grid>
      // </Container>
      // <Container fixed>
      // <NavBar />
      <Grid
        container
        display={"flex"}
        sx={{
          padding: 50,
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "#03a9fc",
        }}
      >
        <Grid display={"flex"} sx={{ position: "relative" }}>
          <AddIcon sx={{ fontSize: 100 }} onClick={increase}></AddIcon>
          <Typography fontSize={72}>{count}</Typography>
          <RemoveIcon sx={{ fontSize: 100 }} onClick={decrease}></RemoveIcon>

          <Grid
            display={"flex"}
            sx={{
              justifyContent: "center",
              alignContent: "center",
              position: "absolute",
            }}
          >
            <button>logout</button>
          </Grid>
        </Grid>
        {/* <AddIcon sx={{ fontSize: 200 }} onClick={testing}></AddIcon> */}
        {/* <button className="chevron chevron-up" onClick={decrease} /> */}
        {/* <button className="chevron chevron-down" onClick={increase} /> */}
      </Grid>

      // </Container>
    );
  }
};
// const Dashboard = () => {
//   return (
//     <div>
//       <p>Welcome to your Dashboard</p>
//     </div>
//   );
// };
export default Home;
