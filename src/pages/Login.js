import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Title from "../components/Title";
import axios from "axios";

const defaultTheme = createTheme();

export default function Login() {
	const navigate = useNavigate();
	// const [name, setName] = useState(" ");
	// const [password, setPassword] = useState(" ");

	// const [authenticated, setAuthenticated] = useState(
	//   //set up the localStorage
	//   localStorage.getItem(localStorage.getItem("authenticated") || false)
	// );

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);

		axios
			.post("http://127.0.0.1:5000/Login", {
				name: data.get("email"),
				password: data.get("password"),
				// name: name,
				// password: password,
			})
			.then((res) => {
				// // check login status
				// console.log(res.data["msg"]);
				if (res.data.token) {
					localStorage.setItem("token", res.data.token);
					navigate("/draw");
				} else {
					alert("Wrong username or password");
				}
				// console.log(res.data["msg"]);
				// // console.table(res.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<ThemeProvider theme={defaultTheme}>
			<Typography component="h1" variant="h5"></Typography>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 30,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Title />
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="User Name"
							name="email"
							autoComplete="email"
							autoFocus
							// value={name}
							// onChange={(e) => setName(e.target.value)}
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							// value={password}
							// onChange={(e) => setPassword(e.target.value)}
						/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, backgroundColor: "#0377fc" }}
						>
							Sign In
						</Button>

						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2"></Link>
							</Grid>
							<Grid item>
								<Link href="/signup" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
