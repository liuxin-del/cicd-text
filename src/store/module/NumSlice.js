import { createSlice } from "@reduxjs/toolkit";

const NumSlice = createSlice({
  name: "NumSlice",
  initialState: {
    shoplist:[]
  },
  reducers: {
    addNum(state,action) {
      
    },
  },
})

export const {addNum} = NumSlice.actions
export default NumSlice