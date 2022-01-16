import React from "react";
import styled from "styled-components";
import parseISO from "date-fns/parseISO";
import { deleteEvent, getAllEvents } from "../utils/gapimethods";

//REDUX
import { useDispatch } from "react-redux";
import { getEvents } from "../redux/calendarSlice";

//ICONS
import Tooltip from "@mui/material/Tooltip";
import EventNoteTwoToneIcon from "@mui/icons-material/EventNoteTwoTone";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

function EventGroup({ groups, numberOfDays }) {
	const dispatch = useDispatch();

	const handleDelete = async (id) => {
		const res = await deleteEvent(id);
		dispatch(getEvents(await getAllEvents(numberOfDays)));
	};

	return (
		<GroupWrapper>
			<legend>{groups.label}</legend>
			{groups.events.map((event, i) => (
				<Row id={event.id} key={i}>
					<Tooltip title="Title" placement="top">
						{event.summary === undefined ? (
							<span>Untitled event</span>
						) : (
							<span>{event.summary} </span>
						)}
					</Tooltip>

					{/* Filler */}
					<span style={{ flexGrow: 2 }}></span>

					<Tooltip title="Date" placement="top">
						<span>
							<EventNoteTwoToneIcon fontSize="small" />
							{parseISO(event.start.dateTime).toString().substring(4, 10)}
						</span>
					</Tooltip>

					<Tooltip title="Time" placement="top">
						<span style={{ width: "7.7em" }}>
							<AccessTimeIcon fontSize="small" />
							{event.start.dateTime.substring(11, 16)}
							{" - "}
							{event.end.dateTime.substring(11, 16)}
						</span>
					</Tooltip>

					<Tooltip title="Delete" placement="top">
						<DeleteOutlinedIcon
							onClick={() => handleDelete(event.id)}
							id={event.id}
							style={{ cursor: "pointer" }}
						/>
					</Tooltip>
				</Row>
			))}
		</GroupWrapper>
	);
}

export default EventGroup;

const GroupWrapper = styled.fieldset`
	width: 100%;
	border: 1px solid #c516d8;
	border-radius: 2px;
	margin-bottom: 3em;
	padding: 1em;
`;

const Row = styled.div`
	/* background-color: olive; */
	display: flex;
	justify-content: space-between;

	margin-bottom: 1em;
	gap: 1.5em;

	&:last-child {
		margin-bottom: 0;
	}
	background-color: #f7f5f5a7;
	border-radius: 0.5em;
	padding: 0.5em;

	> span > svg {
		vertical-align: text-bottom;
	}
	> span &:last-child {
		width: 4.5em;
	}
`;
