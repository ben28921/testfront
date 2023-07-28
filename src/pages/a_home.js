import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import NavBar from "../components/Navbar";
import Title from "../components/Title";
import Footer from "../components/Footer";

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

  const handleClick = (event) => {
    navigate("/login");
    localStorage.clear();
  };

  useEffect(() => {
    //change the title
    document.title = `You clicked ${count} times`;

    console.log("a", count);
    //if count equal to 15 redirect to login
    if (count === 15) {
      navigate("/login");
      localStorage.clear();
      console.log("b", count);
    }
  }, [count]);

  if (!authenticated) {
    navigate("/login");
  } else {
    return (
      <Grid
        sx={{
          backgroundColor: "#03a8ac",
        }}
      >
        <NavBar />
        <Title />
        <Grid
          container
          sx={{
            padding: 50,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Grid display={"flex"} sx={{ position: "relative" }}>
            {/* <AddIcon sx={{ fontSize: 100 }} onClick={increase}></AddIcon>
            <Typography fontSize={72}>{count}</Typography>
            <RemoveIcon sx={{ fontSize: 100 }} onClick={decrease}></RemoveIcon> */}

            <Box
              display={"block"}
              sx={{
                justifyContent: "center",
                alignContent: "center",
                left: 0,
                bottom: -100,
                position: "absolute",
              }}
            >
              <Grid>
                {/* <Button
                  sx={{ width: 300 }}
                  variant="contained"
                  backgroundColor="green"
                  onClick={handleClick}
                >
                  logout
                </Button> */}
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Footer />
      </Grid>
    );
  }
};

export default Home;
