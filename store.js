import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./redux/basketSlice";
import promotionReducer from "./redux/promotionSlice";

export const store = configureStore({
  reducer: {
    basket: basketReducer,
    promotion: promotionReducer,
  },
});
