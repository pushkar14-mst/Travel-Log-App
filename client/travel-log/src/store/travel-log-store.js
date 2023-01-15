import { createSlice } from "@reduxjs/toolkit";

const travelLogSlice = createSlice({
  name: "travelLog",
  initialState: {
    title: "",
    author: "",
    location: [],
    rating: 0,
    experience: "",
  },
  reducers: {
    addExperience(state, action) {
      state.title = action.payload.title;
      state.author = action.payload.author;
      state.location = action.payload.location;
      state.rating = action.payload.rating;
      state.experience = action.payload.description;
      console.log(action.payload);
    },
  },
});

export const travelLogActions = travelLogSlice.actions;
export default travelLogSlice;
