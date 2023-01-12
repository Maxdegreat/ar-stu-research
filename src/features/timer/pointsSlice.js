import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posePoints: [
    {
      id: "nose",
      amount: [0],
    },
    {
      id: "leftEye",
      amount: [0],
    },
    {
      id: "rightEye",
      amount: [0],
    },
  ],
};

export const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    increaseNose: (state, { payload }) => {
      const poseItem = state.posePoints.find((p) => p.id === "nose");
      poseItem.amount[0] += 1
    },

    logNonAtentiveTimeStamp: (state, { payload }) => {
      if (payload.keypoint == 0)
        poseItem = state.posePoints.find((p) => p.id === "nose");
      else if (payload.keypoint == 1)
        poseItem = state.posePoints.find((p) => p.id === "LeftEye");
      else if (payload.keypoint == 2)
        poseItem = state.posePoints.find((p) => p.id === "RightEye");
      poseItem.amount.push(Date.now())
    },

    increaseLeftEye: (state, { payload }) => {
      const poseItem = state.posePoints.find((p) => p.id === "leftEye");
      poseItem.amount[0] += 1
    },

    increaseRightEye: (state, { payload }) => {
      const poseItem = state.posePoints.find((p) => p.id === "rightEye");
      poseItem.amount[0] += 1
    },

  },
});

// Action creators are generated for each case reducer function
export const selectPoints = (state) => {
  return state.points.posePoints.map((p) => p);
};


export const { increaseNose, increaseLeftEye, increaseRightEye, logNonAtentiveTimeStamp } = pointsSlice.actions;

export default pointsSlice.reducer;
