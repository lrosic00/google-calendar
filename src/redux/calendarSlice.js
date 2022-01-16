import { createSlice } from "@reduxjs/toolkit";

const calendarSlice = createSlice({
	name: "calendar",
	initialState: {
		user: {},
		events: [],
		isLoading: false,
		isLogged: false,
	},
	reducers: {
		getEvents: (state, action) => {
			state.events = action.payload;
		},
		setLogin: (state, action) => {
			state.isLogged = action.payload;
		},
		logout: (state) => {
			state.user = {};
			state.events = [];
			state.isLoading = false;
			state.isLogged = false;
		},
		setLoading: (state, action) => {
			state.isLoading = action.payload;
		},

		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { getEvents, setLogin, logout, setLoading, setUser } =
	calendarSlice.actions;
export default calendarSlice.reducer;
