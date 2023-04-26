import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Image } from 'react-native';

// import Ionicons from '@expo/vector-icons/Ionicons'
// import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Navigation({navigation}: any) {
  return (
    <NavigationContainer>
      {/* <RootStackNavigator /> */}
      <RootTabNavigator />
    </NavigationContainer>
  );
};


import MySplashScreen from '../screens/MySplashScreen';
import TimerSetScreen from '../screens/TimerSetScreen';
import TimerExerciseScreen from '../screens/TimerExerciseScreen';
import SavePresetScreen from '../screens/SavePresetScreen';
import PresetsLibraryScreen from '../screens/PresetsLibraryScreen';


const Stack = createStackNavigator();

function RootStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="MySplashScreen" component={MySplashScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerSetScreen" component={TimerSetScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="SavePresetScreen" component={SavePresetScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="PresetsLibraryScreen" component={PresetsLibraryScreen} />
      <Stack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerExerciseScreen" component={TimerExerciseScreen} />
    </Stack.Navigator>
  )
};

const PresetStack = createStackNavigator();
function PresetStackScreen() {
  return (
    <PresetStack.Navigator>
      <PresetStack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="PresetsLibraryScreen" component={PresetsLibraryScreen} />
    </PresetStack.Navigator>
  )
};

const TimerStack = createStackNavigator();
function TimerStackScreen() {
  return (
    <TimerStack.Navigator>
      {/* <TimerStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="MySplashScreen" component={MySplashScreen} /> */}
      <TimerStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerSetScreen" component={TimerSetScreen} />
      <TimerStack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="SavePresetScreen" component={SavePresetScreen} />
      <TimerStack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="PresetsLibraryScreen" component={PresetsLibraryScreen} />
      <TimerStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerExerciseScreen" component={TimerExerciseScreen} />
    </TimerStack.Navigator>
  )
};

const SavePresetStack = createStackNavigator();
function SavePresetStackScreen() {
  return (
    <SavePresetStack.Navigator>
      {/* <SavePresetStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="MySplashScreen" component={MySplashScreen} /> */}
      <SavePresetStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerSetScreen" component={TimerSetScreen} />
      <SavePresetStack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="SavePresetScreen" component={SavePresetScreen} />
      <SavePresetStack.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="PresetsLibraryScreen" component={PresetsLibraryScreen} />
      <SavePresetStack.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="TimerExerciseScreen" component={TimerExerciseScreen} />
    </SavePresetStack.Navigator>
  )
};

const Tab = createBottomTabNavigator();

function RootTabNavigator() {
  return (
    <Tab.Navigator
    initialRouteName='Timer'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Timer') {
            return <Image source={require('../assets/screen-icons/clock.png')} style={{height: 24, width: 24, tintColor: 'black'}} resizeMode="contain"/>
          } else if (route.name === 'Presets') {
            return <Image source={require('../assets/screen-icons/library.png')} style={{height: 21, width: 21, tintColor: 'black'}} resizeMode="contain"/>
          } else if (route.name === 'Save Preset') {
            return <Image source={require('../assets/screen-icons/plus-symbol.png')} style={{height: 20, width: 20, tintColor: 'black'}} resizeMode="contain"/>
          }
          // return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="Presets" component={PresetStackScreen} />
      <Tab.Screen options={{headerShown:false, ...TransitionPresets.ScaleFromCenterAndroid }} name="Timer" component={TimerStackScreen} />
      <Tab.Screen options={{headerShown:false, ...TransitionPresets.RevealFromBottomAndroid }} name="Save Preset" component={SavePresetScreen} />
    </Tab.Navigator>
  )
};
