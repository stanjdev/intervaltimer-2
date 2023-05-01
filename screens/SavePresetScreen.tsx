import React, { useEffect, useState } from 'react';
import { Text, View, StatusBar, Image, Dimensions, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { savePreset } from '../redux/presetsSlice';
import { NavProps } from './screenTypes';

const { width, height } = Dimensions.get('window');

export default function SavePresetScreen({ navigation, route }: NavProps) {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const carryOverTimerSetting = useSelector((state: any) => state.currentTimerSetting.value)

  // let [fontsLoaded] = useFonts({
  //   'SourceCodePro-Regular': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Regular.ttf'),
  //   'SourceCodePro-Medium': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Medium.ttf'),
  //   'SourceCodePro-SemiBold': require('../assets/fonts/Source_Code_Pro/SourceCodePro-SemiBold.ttf'),
  // });

  // const { sets=3, workTime=1, rest=2 } = route.params;
  // const sets = route.params?.sets || 3;
  // const workTime = route.params?.workTime || 60;
  // const rest = route.params?.rest || 120;

  const {sets, workTime, rest} = carryOverTimerSetting;
  // const sets = carryOverTimerSetting?.sets || 3;
  // const workTime = carryOverTimerSetting?.workTime || 60;
  // const rest = carryOverTimerSetting?.rest || 120;

  // Whenever carryOverTimerSetting updates from TimerSetScreen, dispatches those updates.
  useEffect(() => {
    setPresetInfo({
      presetName: '',
      numSets: sets,
      workTime: workTime,
      restTime: rest,
      key: ''
    })
  }, [carryOverTimerSetting])

  const [ presetInfo, setPresetInfo ] = useState({
    presetName: "",
    numSets: sets,
    workTime: workTime,
    restTime: rest,
    key: ""
  });

  const presetNameInputChange = (value) => {
    if (value.length !== 0) {
      setPresetInfo({
        ...presetInfo,
        presetName: value,
        key: value
      });
    } else {
      setPresetInfo({
        ...presetInfo,
        presetName: ""
      })
    }
  };

  const [ saveButtonPressed, setSaveButtonPressed ] = useState(false);

  async function saveAndGoBack(presetInfo) {
    setSaveButtonPressed(true);

    dispatch(savePreset(presetInfo));

    // await AsyncStorage.removeItem('presetsArray');

    // Store into localStorage
    // let storedPresets = await AsyncStorage.getItem('presetsArray');
    // let storedPresets = undefined;
    // let presetsArr = storedPresets ? await JSON.parse(storedPresets) : new Array();

    // if there isn't a duplicate, store it normally: , else auto-generate a suffix to the key and name.
    // await presetsArr.push(presetInfo);
    // await AsyncStorage.setItem('presetsArray', JSON.stringify(presetsArr));
    // console.log("presetsArr:", presetsArr);

    setTimeout(() => {
      navigation.navigate('TimerSetScreen', { presetInfo });
      setSaveButtonPressed(false);
      setPresetInfo({
        ...presetInfo,
        presetName: "",
        key: "blank key"
      });
    }, 1000)
  };

  return (
    <View style={{ flex: 1, resizeMode: "cover", justifyContent: "center", backgroundColor: "black" }}>
      {isFocused ? <StatusBar hidden={false} barStyle="light-content"/> : null}
      {/* <TouchableOpacity onPress={() => navigation.goBack()} style={{position: "absolute", top: height * 0.065, zIndex: 100, padding: 15}}>
        <Image source={require('../assets/screen-icons/back-arrow-white.png')} style={{height: 20, }} resizeMode="contain"/>
      </TouchableOpacity> */}

      <View style={{marginTop: 80}}>
        <View style={{flexDirection: "row"}}>
          <View style={{backgroundColor: "black", flex: 1, height: height * 0.85, alignItems: "center" }}>

            <View style={{ alignItems: "center", justifyContent: "space-between", height: 150, marginBottom: height > 700 ? 175 : 100 }}>
              <Text style={{textAlign: "center", fontSize: 14, color: "#FFF"}}>NAME YOUR PRESET</Text>
              <TextInput
                placeholder="NEW WORKOUT"
                placeholderTextColor="#828282"
                onChangeText={value => presetNameInputChange(value)}
                value={presetInfo.presetName}
                autoCapitalize="characters"
                autoFocus
                autoCorrect={false}
                style={[{
                  backgroundColor: "#333333",
                  color: "#FFFFFF",
                  fontSize: 24,
                  textAlign: "center",
                  height: 46,
                  width: width * 0.9,
                  borderRadius: 8,
              }, styles.sourceCodeProMedium]}>
              </TextInput>
              <View style={{flexDirection: "row", justifyContent: "space-around", width: width}}>
                <Text style={{ fontSize: 14, color: "#FFF", }}>{sets} SETS</Text>
                <Text style={{ fontSize: 14, color: "#FFF", }}>{`${Math.floor(workTime / 60)}:${workTime % 60 || "00"}`} WORK</Text>
                <Text style={{ fontSize: 14, color: "#FFF", }}>{`${Math.floor(rest / 60)}:${rest % 60 || "00"}`} REST</Text>
              </View>
            </View>

            <AppButton
              title={saveButtonPressed ? "SAVING..." : "SAVE"}
              buttonStyles={[styles.buttonStyle, !presetInfo.presetName || saveButtonPressed ? styles.disabledButton : styles.yellowButton]}
              buttonTextStyles={styles.buttonText}
              disabled={!presetInfo.presetName || saveButtonPressed}
              onPress={() => saveAndGoBack(presetInfo)}
            />

          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 47,
    width: width * 0.8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width: 3, height: 3},
    backgroundColor: "#FAFF00",
  },
  yellowButton: {
    backgroundColor: "#FAFF00",
  },
  disabledButton: {
    backgroundColor: "rgba(250, 255, 0, 0.5)",
  },
  buttonText: {
    color: "#000",
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    letterSpacing: 1,
    // fontFamily: "SourceCodePro-Medium"
  },
  sourceCodeProRegular: {
    // fontFamily: "SourceCodePro-Regular"
  },
  sourceCodeProSemiBold: {
    // fontFamily: "SourceCodePro-SemiBold"
  },
  sourceCodeProMedium: {
    // fontFamily: "SourceCodePro-Medium"
  }
});
