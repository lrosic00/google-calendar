import * as dateFns from "date-fns";
import parseISO from "date-fns/parseISO";

const parseGroups = (groups) =>
	Object.keys(groups).map((label) => ({
		label,
		events: groups[label],
	}));

export const GroupEventsByDay = (events) => {
	const groups = events.reduce((groups, singleEvent) => {
		let startingDate = singleEvent.start.dateTime.substring(0, 10);
		startingDate = parseISO(startingDate).toString().substring(4, 15);
		if (!groups[startingDate]) groups[startingDate] = [];
		groups[startingDate].push(singleEvent);

		return groups;
	}, {});

	return parseGroups(groups);
};

export const GroupEventsByWeek = (events) => {
	const groups = events.reduce((groups, singleEvent) => {
		const startingDate = singleEvent.start.dateTime.substring(0, 10);
		const parsedStartingDate = parseISO(startingDate);

		const startOfWeek = dateFns.startOfWeek(parsedStartingDate, {
			weekStartsOn: 1,
		});
		const endOfWeek = dateFns.endOfWeek(parsedStartingDate, {
			weekStartsOn: 1,
		});

		const label =
			startOfWeek.toString().substring(4, 15) +
			" - " +
			endOfWeek.toString().substring(4, 15);

		if (!groups[label]) groups[label] = [];
		groups[label].push(singleEvent);
		return groups;
	}, {});

	return parseGroups(groups);
};
