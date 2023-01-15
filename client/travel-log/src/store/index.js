import { configureStore } from "@reduxjs/toolkit";
import travelLogSlice from "./travel-log-store";

const store = configureStore({
  reducer: { travelLog: travelLogSlice.reducer },
});

export default store;
