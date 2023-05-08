import { configureStore } from "@reduxjs/toolkit";
import presetsSlice from "./presetsSlice";
import currentTimerSettingSlice from "./currentTimerSettingSlice";

export const store = configureStore({
  reducer: {
    presets: presetsSlice,
    currentTimerSetting: currentTimerSettingSlice
  }
})




/*
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import currentTimerSettingSliceReducer from "./currentTimerSettingSlice";
import presetsSliceReducer from './presetsSlice';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
  presetsSliceReducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['presetsSliceReducer']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({reducer: persistedReducer})
// export const store = configureStore({
//   reducer: {
//     presets: presetsSliceReducer,
//     currentTimerSetting: currentTimerSettingSliceReducer
//   }
// })
export const persistor = persistStore(store)



*/
