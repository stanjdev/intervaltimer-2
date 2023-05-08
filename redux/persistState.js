


// const SAVED_TIMERS = "SAVED_TIMERS"

// // Load State
// export const loadState = async () => {
//   try {
//     const serializedState = await AsyncStorage.getItem(SAVED_TIMERS);
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (err) {
//     console.log("Error loading data:", err)
//     return undefined;
//   }
// }

// // Save State
// export const saveState = async (state) => {
//   try {
//     const serializedState = JSON.stringify(state);
//     await AsyncStorage.setItem(SAVED_TIMERS, serializedState);
//   } catch (err) {
//     console.log("Error saving data:" + err);
//   }
// }
