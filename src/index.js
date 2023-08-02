import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Draw from "./pages/Draw";
import SignUp from "./pages/SignUp";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		{/* <App /> */}
		<BrowserRouter>
			<Routes>
				<Route index element={<App />} />
				<Route path="login" element={<Login />} />
				<Route path="home" element={<Home />} />
				<Route path="draw" element={<Draw />} />
				<Route path="signup" element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
