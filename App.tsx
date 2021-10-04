/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import * as React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux'
import HomeScreen from './src/screens/HomeScreen';
import { setUser } from './src/redux/user/user.action';
import { createStore } from '@reduxjs/toolkit';
import reducers from './src/redux/index'
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import AddExamScreen from './src/screens/exam/AddExamScreen';
import AllExamScreen from './src/screens/exam/AllExamScreen';
import EditExamScreen from './src/screens/exam/EditExamScreen';
import AllSubjectScreen from './src/screens/subject/AllSubjectScreen';
import AddSubjectScreen from './src/screens/subject/AddSubjectScreen';
import EditSubjectScreen from './src/screens/subject/EditSubjectScreen';
import AllTimeSlotsScreen from './src/screens/hall/AllTimeSlotsScreen';
import AddTimeSlotScreen from './src/screens/hall/AddTimeSlotScreen';
import EditTimeSlotScreen from './src/screens/hall/EditTimeSlotScreen';
import TimeTableScreen from './src/screens/timtable/TimeTableScreen';
import { linking } from './src/config/linking';
import { TabNavigator } from './src/navigator/tabnavigator';
import messaging from '@react-native-firebase/messaging';


const Stack = createStackNavigator();
export const store = createStore(reducers);
function App() {

  React.useEffect(() => {
    // messaging()
    // .getToken()
    // .then(token => {
    //   console.log(token);
    // });

    const unsubscribe = messaging().onMessage(async (remoteMessage: any) => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage);
    });
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        // setLoading(false);
      });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }} initialRouteName="Home">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
          {/* Exam screens` */}
          <Stack.Screen name="AllExams" component={AllExamScreen} />
          <Stack.Screen name="UpdateExam" component={EditExamScreen} />
          <Stack.Screen name="AddExam" component={AddExamScreen} />
          {/* Subject Screens           */}
          {/* <Stack.Screen name="AllSubjects" component={AllSubjectScreen} /> */}
          <Stack.Screen name="AddSubject" component={AddSubjectScreen} />
          <Stack.Screen name="UpdateSubject" component={EditSubjectScreen} />
          {/* Time slots */}
          {/* <Stack.Screen name="AllTimeSlots" component={AllTimeSlotsScreen} /> */}
          <Stack.Screen name="AddTimeSlots" component={AddTimeSlotScreen} />
          <Stack.Screen name="UpdateTimeSlot" component={EditTimeSlotScreen} />
          {/* Time Table view */}
          {/* <Stack.Screen name="TimeTable" component={TimeTableScreen} /> */}

          {/* Init page */}
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Tab page */}
          <Stack.Screen name="Tab" component={TabNavigator} />

        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;