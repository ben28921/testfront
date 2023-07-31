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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import axios from "axios";
import Container from "@mui/material/Container";

const Home = () => {
	const navigate = useNavigate();
	const [stocks, setStocks] = useState([]);
	const token = localStorage.getItem("token");
	const getStockData = () => {
		axios
			.get(
				"http://127.0.0.1:5000/stock",
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}

				// name: name,
				// password: password,
			)
			// .then((response) => {
			//   return response.data;
			// })
			.then((data) => {
				console.log(data);
				setStocks(data.data);
				console.log("aaaa", data);
			});
		// console.log(a);
	};

	useEffect(() => {
		getStockData();
	}, []);
	if (!token) {
		navigate("/login");
	} else {
		if (stocks) {
			// navigate("/login");
			return (
				// <Container fixed>
				<Grid
					sx={{
						backgroundColor: "#03a8ac",
					}}
				>
					<NavBar />
					{/* <Title /> */}
					{/* <AddIcon sx={{ fontSize: 100 }} onClick={increase}></AddIcon>
                <Typography fontSize={72}>{count}</Typography>
              <RemoveIcon sx={{ fontSize: 100 }} onClick={decrease}></RemoveIcon> */}
					<Box sx={{ backgroundColor: "#03a8ac", height: 600 }}>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 650 }} aria-label="simple table">
								<TableHead>
									<TableRow>
										<TableCell>Code</TableCell>
										<TableCell align="right">Name</TableCell>
										<TableCell align="right">StockPrice</TableCell>
										<TableCell align="right">Mkt Cap</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{stocks.map((data) => (
										<TableRow
											key={data.name}
											sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{data.code}
											</TableCell>
											<TableCell align="right">{data.name}</TableCell>
											<TableCell align="right">{data.nominal}</TableCell>
											<TableCell align="right">{data.Turnover}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
					{/* <Footer /> */}
				</Grid>
			);
		}
	}
};

export default Home;
