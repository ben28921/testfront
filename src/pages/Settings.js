import {
	Grid,
	Box,
	Typography,
	Container,
	TextField,
	Button,
} from "@mui/material";
import NavBar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
const Settings = () => {
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		if (data.get("password") === data.get("password2")) {
			axios
				.put("http://127.0.0.1:5000/changePassword", {
					name: localStorage.getItem("name"),

					oldPassword: data.get("newpassword"),
					newPassword: data.get("newpassword"),
					// name: name,
					// password: password,
				})
				.then((res) => {
					// // // check login status
					// // console.log(res.data["msg"]);
					// if (res.data.token) {
					// 	localStorage.setItem("token", res.data.token);
					// 	navigate("/draw");
					// } else {
					// 	alert("Wrong username or password");
					// }
					console.log(res.data);
					if (res.data.ok) {
						// alert("Update Password Success");

						Swal.fire("Update Password Success");
						navigate("/login");
					} else if (res.data.msg === "password not match") {
						Swal.fire("Wrong Old Password");
					}
					// // console.table(res.data);
				})
				.catch((error) => {
					console.error(error);
				});
		} else {
			Swal.fire("Password do not match");
		}
	};
	return (
		<Grid>
			<NavBar />
			<Box
				sx={{
					marginTop: 30,
					display: "flex",
					flexDirection: "column",

					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography component="h1" variant="h5">
					Setting
				</Typography>
				<Box component="form" onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{/* <Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="userName"
								label="User Name"
								name="userName"
								autoComplete="userName"
							/>
						</Grid> */}
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="oldpassword"
								label="Old Password"
								type="password"
								id="oldPassword"
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="newpassword"
								label="New Password"
								type="password"
								id="newPassword"
								autoComplete="new-password"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="newpassword2"
								label="Confirm New Password"
								type="password"
								id="newPassword2"
								autoComplete="new-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Change Password
					</Button>
				</Box>
			</Box>
			<Grid></Grid>
		</Grid>
	);
};

export default Settings;
