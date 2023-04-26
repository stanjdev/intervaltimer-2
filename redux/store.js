import { configureStore } from "@reduxjs/toolkit";
import presetsSlice from "./presetsSlice";
import currentTimerSettingSlice from "./currentTimerSettingSlice";

export const store = configureStore({
  reducer: {
    presets: presetsSlice,
    currentTimerSetting: currentTimerSettingSlice
  }
})

