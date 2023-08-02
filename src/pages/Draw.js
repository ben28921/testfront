import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Button, colors, backdropClasses } from "@mui/material";
import NavBar from "../components/Navbar";
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
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import TablePagination from "@mui/material/TablePagination";

const Draw = () => {
	const redBall = [
		1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46,
	];
	const blueBall = [
		3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48,
	];
	const greenBall = [
		5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49,
	];
	const checkColor = (num) => {
		if (redBall.includes(parseInt(num))) {
			return "#EC565A";
			// console.log(num, "red");
		} else if (greenBall.indexOf(parseInt(num)) > -1) {
			return "#009933";
			// console.log(num, "green");
		} else {
			return "#5799EC";
			// 	// 	// console.log(num, "blue");
			// 	// 	console.log(num);
		}
	};
	// const redBall = [12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46];
	// const blueBall = [10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48];
	// const greenBall = [11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49];
	const navigate = useNavigate();
	const [stocks, setStocks] = useState([]);
	const [bgColor, setBgColor] = useState("#EC565A");
	const [day, setDay] = useState();
	const token = localStorage.getItem("token");
	let ballColor;

	const getStockData = () => {
		// axios
		// 	.get(
		// 		"https://bet.hkjc.com/contentserver/jcbw/cmc/last30draw.json"

		// 		// name: name,
		// 		// password: password,
		// 	)
		axios({
			url: "http://127.0.0.1:5000/draw",
		})
			// .then((response) => {
			//   return response.data;
			// })
			.then((data) => {
				console.log(data);
				setStocks(data.data.data);
				console.log("aaaa", data);
			})
			.catch((err) => console.log(err));
		// console.log(a);
	};
	useEffect(() => {
		getStockData();
	}, []);

	const handleChangePage = (e, newPage) => {
		setDay(newPage);
	};
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
					<Box
						sx={{
							backgroundColor: "#03a8ac",
						}}
					>
						<TableContainer
							component={Paper}
							sx={{
								display: "flex",
								justifyContent: "center",
							}}
						>
							<Table
								sx={{ minWidth: 650, maxWidth: "50%", border: "solid 0px" }}
								aria-label="simple table"
							>
								<TableHead sx={{ backgroundColor: "#E9E9E9" }}>
									<TableRow>
										<TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
										<TableCell sx={{ fontWeight: "bold" }}>Date</TableCell>
										<TableCell sx={{ fontWeight: "bold" }} align="center">
											Number
										</TableCell>
										{/* <TableCell>Speical Number</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{stocks.map((data, i) => (
										<TableRow
											key={data.id}
											sx={{
												backgroundColor: `${i % 2 === 0 ? "#AAA" : "#888"}`,
											}}
										>
											<TableCell component="th" scope="row">
												{data.id}
											</TableCell>
											<TableCell>
												<Grid container sx={{ alignItems: "center" }}>
													<CalendarMonthIcon />
													{data.date}
												</Grid>
											</TableCell>
											<TableCell
												sx={{
													display: "flex",
													justifyContent: "space-between",
													alignItems: "center",
												}}
											>
												{data.Number.map((num, i) => {
													//console.log("AA");
													//console.log(redBall.includes(num));
													//console.log(num);

													// if (redBall.includes(parseInt(num))) {
													// 	ballColor = "#EC565A";
													// 	// console.log(num, "red");
													// } else if (greenBall.indexOf(parseInt(num)) > -1) {
													// 	ballColor = "#009933";
													// 	// console.log(num, "green");
													// } else {
													// 	ballColor = "#5799EC";
													// 	// 	// 	// console.log(num, "blue");
													// 	// 	// 	console.log(num);
													// }
													ballColor = checkColor(num);
													return (
														<Box
															key={`ball-${i}`}
															sx={{
																borderRadius: "100px",
																minWidth: "20px",
																background: "#fff",
																display: "flex",
																alignContent: "center",
																justifyContent: "center",
																padding: 1,
																border: `4px solid ${ballColor}`,
															}}
														>
															{num}
														</Box>
													);
												})}
												<AddIcon />
												{/* <span
													style={{
														backgroundColor: "blue",
														borderRadius: "100px",
														minWidth: "20px",
														display: "flex",
														alignContent: "center",
														justifyContent: "center",
														color: "white",
													}}
												>
													{data.sno}
												</span> */}
												{/* ballColor = checkColor(data.sno); */}
												<Box
													sx={{
														backgroundColor: "#5799EC",
														borderRadius: "100px",
														minWidth: "20px",
														display: "flex",
														alignContent: "center",
														justifyContent: "center",
														background: "#fff",
														padding: 1,
														border: `4px solid ${ballColor} `,
													}}
												>
													{data.sno}
												</Box>
											</TableCell>
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

export default Draw;
