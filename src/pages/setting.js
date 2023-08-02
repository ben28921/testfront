import {
	Grid,
	Box,
	Typography,
	Container,
	TextField,
	Button,
} from "@mui/material";
import NavBar from "../components/Navbar";
const setting = () => {
	const handleSubmit = (e) => {
		e.preventDefault();
	};
	return (
		<Grid>
			<NavBar />
			<Box
				container
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
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								id="userName"
								label="User Name"
								name="userName"
								autoComplete="userName"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
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

export default setting;
