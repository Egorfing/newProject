import { buildSlice } from '@/shared/lib/store/buildSlice'
import { createSlice } from '@reduxjs/toolkit'
import { CounterSchema } from '../types/counterSchems'

export interface CounterState {
  value: number
}

const initialState: CounterSchema = {
  value: 0
}

export const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    }
  }
})

export const { 
  actions: counterActions,
  reducer: counterReducer,
  useActions: useCounterActions
 } = counterSlice
