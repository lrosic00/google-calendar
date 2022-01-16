import React, { useState } from "react";
import styled from "styled-components";
import { createEvent } from "../utils/gapimethods";
import CloseIcon from "@mui/icons-material/Close";

function AddEventModal(props) {
	const [state, setState] = useState({
		startDate: "",
		endDate: "",
		title: "",
	});

	const handleChange = (input) => (e) => {
		setState({ ...state, [input]: e.target.value });
	};

	const checkValidDates = () =>
		state.startDate < state.endDate ? true : false;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!checkValidDates()) return;
		const event = {
			summary: state.title,
			start: {
				dateTime: state.startDate + ":00",
				timeZone: "Europe/Belgrade",
			},
			end: {
				dateTime: state.endDate + ":00",
				timeZone: "Europe/Belgrade",
			},
		};
		const res = await createEvent(event);
		props.handleModal();
	};

	return (
		<Modal>
			<Body>
				<CloseIcon
					style={{
						position: "absolute",
						top: "1%",
						right: "1%",
						fontSize: "30px",
						cursor: "pointer",
					}}
					onClick={props.handleModal}
				/>
				<Header>Create new event</Header>
				<Form onSubmit={handleSubmit}>
					<label htmlFor="title">Title</label>
					<input
						name="title"
						type="text"
						value={state.title}
						onChange={handleChange("title")}
						placeholder="Event title"
						required
					/>

					<label htmlFor="time">Start date</label>
					<input
						name="startDate"
						type="datetime-local"
						value={state.startTime}
						onChange={handleChange("startDate")}
						placeholder="Start Time"
					/>
					<label htmlFor="time">End date</label>
					<input
						name="endDate"
						type="datetime-local"
						onChange={handleChange("endDate")}
						placeholder="End Time"
						min={state.startDate}
						max={state.startDate.substring(0, 11) + "23:59"}
					/>

					<Button
						type="submit"
						disabled={
							state.startDate === "" ||
							state.endDate === "" ||
							state.title === ""
						}
					>
						Add event
					</Button>
				</Form>
			</Body>
		</Modal>
	);
}

export default AddEventModal;

const Modal = styled.div`
	position: absolute;
	height: 100%;
	width: 100%;
	top: 0;
	background: rgba(0, 0, 0, 0.5);
	display: grid;
	place-items: center;
`;
const Body = styled.div`
	background-color: white;
	height: 40em;
	max-height: 60%;
	max-width: 55%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	position: relative;
	padding: 2em 4em;
	border-radius: 5px;
`;
const Form = styled.form`
	display: flex;
	flex-direction: column;
	height: 100%;
	> label {
		margin-top: 1.5em;
	}
	> input {
		padding: 0.5em;
	}
`;
const Button = styled.button`
	display: block;
	width: 100%;
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

	&:disabled {
		background-image: none;
		background-color: #bbbbbbbb;
		cursor: default;
	}
`;
const Header = styled.h1`
	border-bottom: 2px solid #c516d8;
`;
