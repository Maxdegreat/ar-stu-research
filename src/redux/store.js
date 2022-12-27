import { configureStore } from '@reduxjs/toolkit'
import pointsReducer from '../features/timer/pointsSlice'

export const store = configureStore({
  reducer: {
    points: pointsReducer,
  },
})