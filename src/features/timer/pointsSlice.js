import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  nose: 0,
  leftEye: 0,
  rightEye: 0,
  leftShoulder: 0,
  rightShoulder: 0,

  // if points below are seen this will play in a negative when forming the output of the 
  // subjects attention points.
  leftHip: 0,
  rightHip: 0,
  rightKnee: 0,
  leftKnee: 0,
}

export const pointsSlice = createSlice({
  name: 'points',
  initialState,
  reducers: {
  
    
  },
});

// Action creators are generated for each case reducer function
export const selectPoints = (state) => state.points;

export const { decrementSec, setTime } = pointsSlice.actions

export default pointsSlice.reducer