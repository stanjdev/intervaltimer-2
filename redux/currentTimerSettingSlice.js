import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {}
};

/*
    {
      numSets: 10,
      workTime: 180,
      restTime: 360,
    },
*/

export const currentTimerSettingSlice = createSlice({
  name: 'currentTimerSetting',
  initialState,
  reducers: {
    updateCurrentTimerSettingSlice: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { updateCurrentTimerSettingSlice } = currentTimerSettingSlice.actions;

export default currentTimerSettingSlice.reducer

