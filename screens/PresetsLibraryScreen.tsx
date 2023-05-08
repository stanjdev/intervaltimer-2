import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Alert,
  StyleSheet,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppButton from '../components/AppButton';
const { width, height } = Dimensions.get('window');
const bgImage = require('../assets/splash/splash-screen-ellipse.png');
import PresetButton from '../components/PresetButton';
const trashcan = require('../assets/screen-icons/trashcan.png');

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SwipeListView } from 'react-native-swipe-list-view';
import { useSelector, useDispatch } from 'react-redux';
import { deletePreset } from '../redux/presetsSlice';
import { NavProps } from './screenTypes';

export default function PresetsLibraryScreen ({ route, navigation }: NavProps) {
  const isFocused = useIsFocused();

  const reduxSavedPresets = useSelector((state: any) => state.presets.value)
  const dispatch = useDispatch();

  // let [fontsLoaded] = useFonts({
  //   'SourceCodePro-Regular': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Regular.ttf'),
  //   'SourceCodePro-Medium': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Medium.ttf'),
  //   'SourceCodePro-SemiBold': require('../assets/fonts/Source_Code_Pro/SourceCodePro-SemiBold.ttf'),
  // });

  const [ presetsLib, setPresetsLib ] = useState(reduxSavedPresets || []);

  const goBack = () => {
    navigation.navigate("TimerSetScreen");
  }

  useEffect(() => {
    setPresetsLib(reduxSavedPresets)
  }, [reduxSavedPresets])

  useEffect(() => {
    // USEFUL FOR RECALLING ANY ASYNCSTORAGE STORED PRESETS, ON FIRST MOUNT
    setTimeout(async() => {
      // setPresetsLib(reduxSavedPresets)

      // // let storedPresets = await AsyncStorage.getItem('presetsArray');
      // let storedPresets = undefined;
      // // let presetsArr = storedPresets ? await JSON.parse(storedPresets) : sampleWorkouts;
      // let presetsArr = storedPresets ? await JSON.parse(storedPresets) : new Array();
      // setPresetsLib(presetsArr);
    }, 0)
  }, [])

  const sampleWorkouts = [
    {
      key: "1",
      presetName: "SAMPLE WORKOUT 1",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }, {
      key: "2",
      presetName: "FRIDAY HIIT",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }, {
      key: "3",
      presetName: "SLOW CHEST WORKOUT",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }, {
      key: "4",
      presetName: "SAMPLE WORKOUT 2",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }, {
      key: "5",
      presetName: "FRIDAY HIIT",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }, {
      key: "6",
      presetName: "SLOW CHEST WORKOUT",
      numSets: 10,
      workTime: 180,
      restTime: 360,
    }
  ];

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) rowMap[rowKey].closeRow();
  };

  const deleteItem = (data, rowMap) => {
    Alert.alert("Delete this preset?", "This action cannot be undone.", [
      {text: "Delete", style: "cancel", onPress: async () => {
        const idx = reduxSavedPresets.indexOf(data.item)
        dispatch(deletePreset(idx))
        setPresetsLib(reduxSavedPresets);
      }},
      {text: "Cancel", onPress: () => closeRow(rowMap, data.item.key)}
    ]);
  };


  const renderFrontItem = (data, i) => (
    <View>
      <PresetButton
        key={data.item.presetName}
        presetName={data.item.presetName}
        sets={data.item.numSets}
        workTime={data.item.workTime}
        restTime={data.item.restTime}
        onPress={() => navigation.navigate('TimerSetScreen', { presetInfo: data.item })}
      />
    </View>
  );

  const renderHiddenItem = (data, rowMap) => (
    <TouchableWithoutFeedback onPress={() => deleteItem(data, rowMap)}>
      <View style={styles.rowBack}>
        <View style={{alignSelf: "flex-end", alignItems: "center", marginRight: 27 }}>
          <Image source={trashcan} style={{ height: 20, width: 20 }} resizeMode="contain"></Image>
          <Text style={[ styles.sourceCodeProMedium, { fontSize: 12, color: "white" }]}>DELETE</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );


  return (
    <View style={styles.container}>
      <StatusBar hidden={true}/>
      <SafeAreaView>
        <View style={{ width: width, flexDirection: "row", alignItems: "center"}}>
          <TouchableOpacity onPress={goBack} style={{ padding: 15}}>
            <Image source={require('../assets/screen-icons/back-arrow-white.png')} style={{height: 20, marginLeft: 0}} resizeMode="contain"/>
          </TouchableOpacity>
          <Text style={[{textAlign: "center", fontSize: 20, color: "#E0E0E0", position: "absolute", zIndex: -1, width: width}, styles.sourceCodeProMedium]}>SAVED PRESETS</Text>
        </View>


    {presetsLib.length ?
      <View style={{ alignItems: "center", marginBottom: height * 0.05, height: height }}>
        <SwipeListView
          data={presetsLib}
          renderItem={renderFrontItem}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-95}
          leftOpenValue={0}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          disableRightSwipe={true}
          // onRowOpen={rowKey => console.log(`opened ${rowKey}`)}
        />

        {/* MOCK DATA, FlatList */}
        {/* <FlatList
          data={sampleWorkouts}
          // renderItem={({item}) => <PresetButton presetName={item.presetName} onPress={() => console.log("OFIDSJf")}/>}
          renderItem={({item}) => <PresetButton
            key={item.presetName}
            presetName={item.presetName}
            sets={item.numSets}
            workTime={item.workTime}
            restTime={item.restTime}
            onPress={() => navigation.navigate('TimerSetScreen', { presetInfo: item })}
          />}
          keyExtractor={item => item.key}
        /> */}
      </View>
    :
      <View style={{height: height, width: width, justifyContent: "center", alignItems: "center" }}>
        <ImageBackground source={bgImage} style={styles.image}>
          <Text style={[styles.titleText, styles.sourceCodeProMedium]}>NO SAVED PRESETS</Text>
        </ImageBackground>
        <AppButton
          title={"CREATE A NEW WORKOUT"}
          buttonStyles={[styles.button, styles.yellowButton]}
          buttonTextStyles={[styles.buttonText, styles.sourceCodeProMedium]}
          onPress={goBack}
        />
      </View>
    }


      {/* OLD WAY, SHOW Programmatically rendered PRESETS: */}
      {/* <ScrollView
        // scrollEnabled={!swipeDeleteOpened}
      >
        <View style={{ alignItems: "center", marginTop: height * 0.17, marginBottom: height * 0.05 }}>
          <PresetButton presetName="LEG DAY #2" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="FRIDAY HIIT" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="SLOW CHEST WORKOUT" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
          <PresetButton presetName="STRETCH ROUTINE" onPress={() => console.log("OFIDSJf")}/>
        </View>
      </ScrollView> */}

      </SafeAreaView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    height: 312,
    width: 312,
    resizeMode: "contain",
    // justifyContent: "center",
    alignItems: "center",
    // transform: [{rotateY: "180deg"}]
  },
  button: {
    height: 47,
    width: width * 0.8,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 7,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {width: 3, height: 3},
    // position: "absolute",
    // bottom: height * 0.1
  },
  yellowButton: {
    backgroundColor: "#FAFF00",
  },
  buttonText: {
    color: "#000",
    flex: 1,
    textAlign: "center",
    fontSize: 19,
  },
  titleText: {
    color: "white",
    fontSize: 24,
    // transform: [{rotateY: "180deg"}]
  },
  subTitleText: {
    color: "#828282",
    fontSize: 20,
  },
  sourceCodeProMedium: {
    // fontFamily: 'SourceCodePro-Medium'
  },
  rowBack: {
    backgroundColor: 'maroon',
    height: 90,
    width: width * 0.8,
    alignSelf: "flex-end",
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 7,
    marginBottom: 7
  }
});
