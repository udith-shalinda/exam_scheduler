import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AllSubjectScreen from '../screens/subject/AllSubjectScreen';
import AllTimeSlotsScreen from '../screens/hall/AllTimeSlotsScreen';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import {colors } from './../utils/theam.json';
import TimeTableScreen from '../screens/timtable/TimeTableScreen';
const Tab = createBottomTabNavigator();

export const TabNavigator = ({ route }: any) => {
    return (
        <Tab.Navigator
            screenOptions={(props) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'menu';

                    if (props.route.name === 'TimeTable') {
                        iconName = focused
                            ? 'calendar-alt'
                            : 'calendar-alt';
                    } else if (props.route.name === 'Subjects') {
                        iconName = focused ? 'book' : 'book';
                    }else if(props.route.name === 'TimeSlots') {
                        iconName = focused ? 'clock' : 'clock';
                    }

                    // You can return any component that you like here!
                    return <Icon type="font-awesome-5" name={iconName} size={size} color={color}></Icon>;
                },
                tabBarActiveTintColor: colors.secondary_color,
                tabBarInactiveTintColor: colors.main_color,
                tabBarActiveBackgroundColor: colors.main_color,
                tabBarInactiveBackgroundColor: colors.secondary_color
            })}
        >
            <Tab.Screen name="TimeTable" component={TimeTableScreen} initialParams={{...route.params.params, color: colors.main_color}} />
            <Tab.Screen name="Subjects" component={AllSubjectScreen} initialParams={{...route.params.params, color: colors.main_color}} />
            <Tab.Screen name="TimeSlots" component={AllTimeSlotsScreen} initialParams={{...route.params.params, color: colors.main_color}} />
        </Tab.Navigator>
    );
}