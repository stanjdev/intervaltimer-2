import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    {
      key: "sample1",
      presetName: "SAMPLE WORKOUT 1",
      numSets: 3,
      workTime: 100,
      restTime: 300,
    },
    {
      key: "sample2",
      presetName: "SAMPLE WORKOUT 2",
      numSets: 4,
      workTime: 180,
      restTime: 360,
    },
    {
      key: "sample3",
      presetName: "PRACTICE PIANO",
      numSets: 2,
      workTime: 140,
      restTime: 230,
    },
    {
      key: "sample4",
      presetName: "STUDY SESSION",
      numSets: 6,
      workTime: 60,
      restTime: 120,
    },
    {
      key: "sample5",
      presetName: "WORKOUT 5",
      numSets: 4,
      workTime: 40,
      restTime: 80,
    },
  ],
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
