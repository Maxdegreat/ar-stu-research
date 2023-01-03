import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posePoints: [
    {
      id: "nose",
      amount: 0,
    },
    {
      id: "leftEye",
      amount: 0,
    },
    {
      id: "rightEye",
      amount: 0,
    },
  ],
};

export const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    increaseNose: (state, { payload }) => {
      console.log("in the increase method");
      const poseItem = state.posePoints.find((p) => p.id === "nose");
      poseItem.amount = poseItem.amount + 1
      console.log("amount is now " + poseItem);
    },

    increaseLeftEye: (state, { payload }) => {
      console.log("in the increase method");
      const poseItem = state.posePoints.find((p) => p.id === "leftEye");
      poseItem.amount = poseItem.amount + 1
      console.log("amount is now " + poseItem);
    },

    increaseRightEye: (state, { payload }) => {
      console.log("in the increase method");
      const poseItem = state.posePoints.find((p) => p.id === "rightEye");
      poseItem.amount = poseItem.amount + 1
      console.log("amount is now " + poseItem);
    },

  },
});

// Action creators are generated for each case reducer function
export const selectPoints = (state) => {
  return state.points.posePoints.map((p) => p);
};

export const { increaseNose, increaseLeftEye, increaseRightEye } = pointsSlice.actions;

export default pointsSlice.reducer;
