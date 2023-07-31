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

const Draw = () => {
	const navigate = useNavigate();
	const [stocks, setStocks] = useState([]);
	const token = localStorage.getItem("token");
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
										<TableCell>ID</TableCell>
										<TableCell>Date</TableCell>
										<TableCell align="center">Number</TableCell>
										{/* <TableCell>Speical Number</TableCell> */}
									</TableRow>
								</TableHead>
								<TableBody>
									{stocks.map((data) => (
										<TableRow
											key={data.id}
											// sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
										>
											<TableCell component="th" scope="row">
												{data.id}
											</TableCell>
											<TableCell>{data.date}</TableCell>
											<TableCell
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												{data.Number.map((num) => (
													<Box
														sx={{
															backgroundColor: "#EC565A",
															borderRadius: "100px",
															minWidth: "20px",
															display: "flex",
															alignContent: "center",
															justifyContent: "center",
															color: "white",
															padding: 1,
														}}
													>
														{num}
													</Box>
												))}
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

												<Box
													sx={{
														backgroundColor: "#5799EC",
														borderRadius: "100px",
														minWidth: "20px",
														display: "flex",
														alignContent: "center",
														justifyContent: "center",
														color: "white",
														padding: 1,
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
