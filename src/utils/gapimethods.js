import { GroupEventsByDay, GroupEventsByWeek } from "./helperMethods";
import { CLIENT_ID, API_KEY, DISCOVERY_DOCS, SCOPES } from "./config";

var gapi = window.gapi;

export const initializeClient = () => {
	gapi.load("client:auth2", () => {
		console.log("loaded client");

		gapi.client.init({
			apiKey: API_KEY,
			clientId: CLIENT_ID,
			discoveryDocs: DISCOVERY_DOCS,
			scope: SCOPES,
		});

		gapi.client.load("calendar", "v3", () => console.log("Done!"));
	});
};

//USER STUFF
export const signIn = async () => {
	const user = await gapi.auth2.getAuthInstance().signIn();
	return { firstName: user.su.FX, lastName: user.su.UV, email: user.su.ev };
};
export const signOut = async () => {
	const res = await gapi.auth2.getAuthInstance().signOut();
};

//EVENT STUFF
export const getAllEvents = async (numberOfDays) => {
	let lowerBound = new Date();
	let upperBound = new Date(lowerBound);
	upperBound.setDate(upperBound.getDate() + numberOfDays);

	const events = await gapi.client.calendar.events.list({
		calendarId: "primary",
		timeMin: lowerBound.toISOString(),
		timeMax: upperBound.toISOString(),
		showDeleted: false,
		singleEvents: true,
		orderBy: "startTime",
	});

	//Group events depending on chosen value
	const groupedEvents =
		numberOfDays !== 30
			? GroupEventsByDay(events.result.items)
			: GroupEventsByWeek(events.result.items);

	return groupedEvents;
};
export const deleteEvent = async (id) => {
	const res = await gapi.client.calendar.events.delete({
		calendarId: "primary",
		eventId: id,
	});
};
export const createEvent = async (event) => {
	const res = await gapi.client.calendar.events.insert({
		calendarId: "primary",
		resource: event,
	});
	return res;
};
