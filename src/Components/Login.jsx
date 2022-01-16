import React, { useEffect } from "react";
import styled from "styled-components";
import { initializeClient, signIn } from "../utils/gapimethods";

//REDUX
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setLogin, setUser } from "../redux/calendarSlice";

//ICONS
import CircularProgress from "@mui/material/CircularProgress";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";

function Login() {
	const dispatch = useDispatch();
	const isLoading = useSelector((state) => state.calendar.isLoading);
	useEffect(() => {
		initializeClient();
	});

	const handleClick = async () => {
		dispatch(setLoading(true));
		const user = await signIn();
		dispatch(setUser(user));
		dispatch(setLogin(true));
		dispatch(setLoading(false));
	};
	return (
		<Container>
			<Wrapper>
				<EventNoteTwoToneIcon fontSize="large" />
				<Header>Google calendar</Header>
				<Message>
					Here you can see all events in your google account, delete ones you
					don't plan to attend and add new ones aswell
				</Message>
				{isLoading && (
					<CircularProgress style={{ color: "#c516d8", margin: "auto 0" }} />
				)}
				<Button onClick={handleClick}>Sign in with google</Button>
			</Wrapper>
		</Container>
	);
}
export default Login;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgb(1, 104, 201);
	background: linear-gradient(
		45deg,
		rgba(1, 104, 201, 0.5) 0%,
		rgba(170, 2, 236, 0.5) 100%
	);
`;
const Wrapper = styled.div`
	padding: 40px 20px;
	max-width: 420px;
	background-color: white;
	border-radius: 5px;
	min-height: 50%;

	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
	box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25),
		0 17px 50px 0 rgba(0, 0, 0, 0.19);
`;
const Button = styled.button`
	display: block;
	width: 80%;
	padding: 1em;
	margin-top: auto;
	border: none;
	text-transform: uppercase;
	letter-spacing: 1px;
	font-weight: bold;
	color: #fff;
	background-image: linear-gradient(to right, #d24ae4, #15cae1);
	cursor: pointer;
	border-radius: 5px;
	background-size: 200% 50%;
	transition: background-position 0.4s;

	&:hover {
		background-position: 100% 0%;
	}
`;
const Header = styled.h1`
	text-transform: uppercase;
	font-size: 1.2em;
	font-weight: bold;
	letter-spacing: 1px;
	padding: 4px 0;
	border-bottom: 2px solid #c516d8;
	margin-bottom: 20px;
`;
const Message = styled.p`
	text-align: center;
	padding: 0 1em;
`;
