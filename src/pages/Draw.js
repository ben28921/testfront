import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState, useMemo } from "react";
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
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Swal from "sweetalert2";
// import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
// import Pagination from "../Pagination";
import Pagination from "./Pagination";
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

	let PageSize = 10;

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
	const [draws, setdraws] = useState([]);
	const [draws2, setdraws2] = useState([]);
	const [bgColor, setBgColor] = useState("#EC565A");
	// const [day, setDay] = useState();
	const token = localStorage.getItem("token");
	const [day, setDay] = useState(30);
	const [date, setDate] = useState();
	const [selectedDate, setselectedDate] = useState();
	let ballColor;

	const [currentPage, setCurrentPage] = useState(1);

	const getDrawDateP = (a, b) => {
		axios
			.get("http://127.0.0.1:5000/DrawP", {
				params: { sday: a, eday: b },
			})
			.then((data) => {
				setdraws(data.data.data);
			});
	};

	// const currentTableData = useMemo(() => {
	// 	const firstPageIndex = (currentPage - 1) * PageSize;
	// 	const lastPageIndex = firstPageIndex + PageSize;

	// 	// return data.slice(firstPageIndex, lastPageIndex);
	// 	return getDrawDateP(firstPageIndex, lastPageIndex);
	// }, [currentPage]);

	const getAllData = (a) => {
		// axios
		// 	.get(
		// 		"https://bet.hkjc.com/contentserver/jcbw/cmc/last30draw.json"

		// 		// name: name,
		// 		// password: password,
		// 	)
		axios
			.get("http://127.0.0.1:5000/draw", {
				params: { day: a },
			})
			// .then((response) => {
			//   return response.data;
			// })
			.then((data) => {
				console.log(data);
				setdraws(data.data.data);
				console.log("aaaa", data);
			})
			.catch((err) => console.log(err));
		// console.log(a);
	};

	const getDrawAllDate = () => {
		axios
			.get("http://127.0.0.1:5000/getAllDate")

			.then((data) => {
				setdraws2(data.data.data);
			});
	};
	const getDrawDate = (a) => {
		axios
			.get("http://127.0.0.1:5000/getLuckyDrawDate", {
				params: { date: a },
			})
			.then((data) => {
				setdraws(data.data.data);
			});
	};
	useEffect(() => {
		getAllData(day);
		getDrawAllDate();
		// getDrawDate();
		// getAllData(day);
		console.log("v", day);
		// alert(`${day} sort to 20 day`);
	}, [day]);

	const handleChange = (e) => {
		setDay(e.target.value);
		// alert(`${day} sort to 20 day`);
		getAllData(e.target.value);
		console.log(e.target.value);
		Swal.fire("Table Change ");
	};
	const handleChangePage = (e, newPage) => {
		setDay(newPage);
	};
	const handleChangeDate = (e) => {
		// setselectedDate(e.target.value);
		console.log(e.target.value);
		getDrawDate(e.target.value);
	};
	if (!token) {
		navigate("/login");
	} else {
		if (draws) {
			// navigate("/login");
			return (
				// <Container fixed>
				<Grid
					sx={
						{
							// backgroundColor: "#03a8ac",
						}
					}
				>
					<NavBar />

					{/* <Title /> */}
					{/* <AddIcon sx={{ fontSize: 100 }} onClick={increase}></AddIcon>
                <Typography fontSize={72}>{count}</Typography>
              <RemoveIcon sx={{ fontSize: 100 }} onClick={decrease}></RemoveIcon> */}

					<Box
						sx={
							{
								// backgroundColor: "#03a8ac",
							}
						}
					>
						<Box display={"flex"} sx={{ padding: 1, minWidth: 20 }}>
							<FormControl fullWidth>
								<InputLabel id="select-label-1">Days</InputLabel>
								<Select
									labelId="select-label-1"
									id="select-1"
									value={day}
									// label="Day"
									onChange={handleChange}
								>
									<MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>

							<FormControl fullWidth>
								<InputLabel id="select-label-2">Date</InputLabel>
								<Select
									labelId="select-label-2"
									id="select-2"
									// value={day}
									label="Date"
									onChange={handleChangeDate}
								>
									{draws2.map((data, i) => (
										// <MenuItem key={i} value={data.date}>
										<MenuItem value={data.date}>{data.date}</MenuItem>
										// </MenuItem>
									))}

									{/* <MenuItem value={10}>Ten</MenuItem>
									<MenuItem value={20}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem> */}
								</Select>
							</FormControl>
						</Box>

						<Box sx={{ padding: 1, minWidth: 120 }}></Box>

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
									{draws.map((data, i) => (
										<TableRow
											key={data.id}
											sx={{
												backgroundColor: `${i % 2 === 0 ? "white" : "#dee2e6"}`,
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
						{/* <Stack
							sx={{ justifyContent: "center", alignItems: "center" }}
							spacing={2}
						>
							<Pagination count={10} />
						</Stack> */}
						{/* <Pagination
							className="pagination-bar"
							currentPage={currentPage}
							totalCount={draws.length}
							pageSize={PageSize}
							onPageChange={(page) => setCurrentPage(page)}
						/> */}
					</Box>
					{/* <Footer /> */}
				</Grid>
			);
		}
	}
};

export default Draw;
