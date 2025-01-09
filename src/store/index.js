import { configureStore } from "@reduxjs/toolkit";

import NumSlice from "./module/NumSlice"
const store = configureStore({
    reducer: {
        NumSlice:NumSlice.reducer
    }
});
export default store;