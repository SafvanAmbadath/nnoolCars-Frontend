import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  name: null,
  email: null,
};

export const adminSliceReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setLoginAdmin: (state, action) => {
      // console.log(action);
      console.log(action.payload);
      state.token = action.payload.token;
      state.name = action.payload.name;
      state.email = action.payload.email;
      // console.log(state.email, ".....");
    },
    setLogoutAdmin: (state, action) => {
      state.token = null;
      state.name = null;
      state.email = null;
    },
  },
});
// console.log(adminSliceReducer );

export const { setLoginAdmin, setLogoutAdmin } = adminSliceReducer.actions;
export default adminSliceReducer;
