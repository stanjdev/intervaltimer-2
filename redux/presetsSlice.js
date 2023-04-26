import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

/*
    [{
      key: "1",
      presetName: "SAMPLE WORKOUT 1",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }]
*/

export const presetsSlice = createSlice({
  name: 'presets',
  initialState,
  reducers: {
    savePreset: (state, action) => {
      state.value.push(action.payload)
    }
  }
})

export const { savePreset } = presetsSlice.actions

export default presetsSlice.reducer
