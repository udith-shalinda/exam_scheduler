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
import { View, Text, Button } from 'react-native';
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

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();
export const store = createStore(reducers);
function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={RegisterScreen} />
          {/* Exam screens` */}
          <Stack.Screen name="AllExams" component={AllExamScreen} />
          <Stack.Screen name="UpdateExam" component={EditExamScreen} />
          <Stack.Screen name="AddExam" component={AddExamScreen} />
          {/* Subject Screens           */}
          <Stack.Screen name="AllSubjects" component={AllSubjectScreen} />
          <Stack.Screen name="AddSubject" component={AddSubjectScreen} />
          <Stack.Screen name="UpdateSubject" component={EditSubjectScreen} />
          {/* Time slots */}
          <Stack.Screen name="AllTimeSlots" component={AllTimeSlotsScreen} />


          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;