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
    },
    deletePreset: (state, action) => {
      state.value.splice(action.payload, 1)
    }
  }
})

export const { savePreset, deletePreset } = presetsSlice.actions

export default presetsSlice.reducer
