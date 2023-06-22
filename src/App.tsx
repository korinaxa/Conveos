import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route }
	from "react-router-dom";
import DetailedPage from "./components/DetailedPage";
import FirstPage from "./components/FirstPage";

function App() {
return (
	<Router>
	<Routes>
		<Route path="/movie/:Title" element={<DetailedPage />}/>
		<Route path="/" element={<FirstPage/>}/>
	</Routes>
	</Router>
);
}

export default App;
