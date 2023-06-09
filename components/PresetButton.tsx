import React from 'react';
import { TouchableOpacity, View, Text, Image, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('window');



export default function PresetButton ({onPress, presetName, sets=4, workTime=120, restTime=180}) {

  let [fontsLoaded] = useFonts({
    'SourceCodePro-Regular': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Regular.ttf'),
    'SourceCodePro-Medium': require('../assets/fonts/Source_Code_Pro/SourceCodePro-Medium.ttf'),
    'SourceCodePro-SemiBold': require('../assets/fonts/Source_Code_Pro/SourceCodePro-SemiBold.ttf'),
  });

  return (
    <TouchableWithoutFeedback onPress={onPress} >
      <View style={styles.button}>
          <View style={{flexDirection: "column"}}>
            <Text style={[styles.presetNameTextStyle, styles.sourceCodeProMedium]}>{presetName}</Text>
            <View style={[styles.subTextStyle]}>
              <Text style={styles.subTextFont}>{sets} SETS</Text>
              <Text style={styles.subTextFont}>{`${Math.floor(workTime / 60)}:${workTime % 60 || "00"}`} WORK</Text>
              <Text style={styles.subTextFont}>{`${Math.floor(restTime / 60)}:${restTime % 60 || "00"}`} REST</Text>
            </View>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#333333",
    height: 90,
    width: width * 0.88,
    borderRadius: 8,
    justifyContent: "center",
    marginTop: 7,
    marginBottom: 7
  },
  presetNameTextStyle: {
    fontSize: 24,
    color: "#FFFFFF",
    width: width * 0.88,
    paddingLeft: 18,
    // borderWidth: 1,
    // borderColor: "orange"
  },
  subTextStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 8,
    width: width * 0.88,
    // borderWidth: 1,
    // borderColor: "lightgreen"
  },
  subTextFont: {
    fontSize: 14,
    // fontFamily: "SourceCodePro-Medium",
    color: "#FFF"
  },
  sourceCodeProMedium: {
    // fontFamily: 'SourceCodePro-Medium'
  },
});
