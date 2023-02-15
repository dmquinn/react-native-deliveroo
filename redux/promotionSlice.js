import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const promotionSlice = createSlice({
  name: "promotion",
  initialState,
  reducers: {
    setPromotion: (state, action) => {
      state.promotion = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setPromotion } = promotionSlice.actions;

export const selectPromotion = (state) => {
  console.log("STATE", state);
  // state.promotion.promotion;
};

export default promotionSlice.reducer;
