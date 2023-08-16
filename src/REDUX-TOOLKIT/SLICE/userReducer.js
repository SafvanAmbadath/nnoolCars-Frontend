import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: null,
    token: null,
    email: null,
    place: null,
    date: null,
    endDate: null,
    time: null,
    number: null,
    location: null,
};
export const clientSliceReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLogin: (state, action) => {
            console.log(action);
            console.log(state);
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.place = action.payload.place;
            state.number = action.payload.number;
            state.location = action.payload.location;
            state.date = action.payload.date;
            state.endDate = action.payload.endDate;
            state.time = action.payload.time;
        },
        setLogout: (state, action) => {
            state.id = null;
            state.name = null;
            state.token = null;
            state.email = null;
            state.place = null;
            state.number = null;
            state.location = null;
            state.date = null;
            state.endDate = null;
            state.time = null;
        },
    },
});

export const { setLogin, setLogout } = clientSliceReducer.actions;

export default clientSliceReducer.reducer;
