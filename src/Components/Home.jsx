import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllEvents, signOut } from "../utils/gapimethods";

//COMPONENTS
import AddEventModal from "./AddEventModal";
import EventGroup from "./EventGroup";

//REDUX
import { getEvents, logout, setLoading } from "../redux/calendarSlice";
import { useSelector, useDispatch } from "react-redux";

//ICONS
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import CircularProgress from "@mui/material/CircularProgress";

function Home() {
	const dispatch = useDispatch();
	const [numberOfDays, setNumberOfDays] = useState(7);
	const [openModal, setOpenModal] = useState(false);
	const isLoading = useSelector((state) => state.calendar.isLoading);

	const events = useSelector((state) => state.calendar.events);

	useEffect(async () => {
		dispatch(setLoading(true));
		dispatch(getEvents(await getAllEvents(numberOfDays)));

		dispatch(setLoading(false));
	}, [numberOfDays]);

	const handleChange = (e) => {
		setNumberOfDays(parseInt(e.target.value));
	};
	const handleLogout = async () => {
		await signOut();
		dispatch(logout());
	};
	const handleModal = async () => {
		setOpenModal(!openModal);
		if (openModal === true)
			dispatch(getEvents(await getAllEvents(numberOfDays)));
	};

	return (
		<Container scroll={openModal}>
			<Wrapper>
				{/* NEW EVENT MODAL */}
				{openModal && (
					<AddEventModal
						numberOfDays={numberOfDays}
						handleModal={handleModal}
					/>
				)}
				{/* --------------- */}

				<EventNoteTwoToneIcon fontSize="large" />
				<Header>
					<h1>Welcome to google calendar</h1>
					<p>Here you can see your upcoming events up 30 days from now</p>
				</Header>

				<ButtonSection>
					<Select value={numberOfDays} onChange={handleChange}>
						<option value="1">Next 24 hours</option>
						<option value="7">Next 7 days</option>
						<option value="30">Next 30 days</option>
					</Select>
					<Button onClick={handleModal}>Add event</Button>
					<Button onClick={handleLogout}>Log out</Button>
				</ButtonSection>

				{isLoading ? (
					<CircularProgress style={{ color: "#c516d8", margin: "auto 0" }} />
				) : (
					<EventsSection>
						{events.length > 0 ? (
							events.map((groups, i) => (
								<EventGroup
									key={i}
									groups={groups}
									numberOfDays={numberOfDays}
								></EventGroup>
							))
						) : (
							<h1>
								No available events for next
								{numberOfDays === 1 ? " 24 hours" : numberOfDays + " days"}
							</h1>
						)}
					</EventsSection>
				)}
			</Wrapper>
		</Container>
	);
}

export default Home;

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	background: rgb(1, 104, 201);
	background: linear-gradient(
		45deg,
		rgba(1, 104, 201, 0.5) 0%,
		rgba(170, 2, 236, 0.5) 100%
	);
	padding-bottom: 5em;
	padding-top: 1em;
	flex-grow: 1;
	overflow-y: ${(props) => (props.scroll ? "hidden" : "auto")};
`;
const Wrapper = styled.div`
	max-width: 70%;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	padding: 3em 5em;
	box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25),
		0 17px 50px 0 rgba(0, 0, 0, 0.19);
	border-radius: 5px;
`;
const EventsSection = styled.section`
	width: 100%;
`;
const Header = styled.header`
	text-align: center;
	margin-bottom: 2em;
`;
const ButtonSection = styled.section`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin-bottom: 2em;
`;
const Button = styled.button`
	cursor: pointer;
	padding: 0.5em 1em;
	border-radius: 3px;
	text-transform: uppercase;

	&:hover {
	}
`;
const Select = styled.select`
	cursor: pointer;
	padding: 0.5em 1em;
	border: 1px solid black;
	border-radius: 3px;
	background-color: #efefef;
`;
