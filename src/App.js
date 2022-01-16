import "./App.css";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { useSelector } from "react-redux";

function App() {
	const isLogged = useSelector((state) => state.calendar.isLogged);
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			{isLogged ? <Home /> : <Login />}
			<footer></footer>
		</div>
	);
}

export default App;
