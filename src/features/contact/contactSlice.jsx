import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  isLoading: false,
  alertText: "",
  alertType: "",
  showAlert: false,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    removeAlert: (state) => {
      state.isLoading = false;
      (state.alertText = ""), (state.alertType = ""), (state.showAlert = false);
    },
    dispalyAlert: (state, action) => {
      (state.isLoading = true),
        (state.alertText = action.payload.alertText),
        (state.alertType = action.payload.alertType),
        (state.showAlert = true);
    },
  },
});

export const { removeAlert, dispalyAlert } = contactSlice.actions;

export default contactSlice.reducer;
