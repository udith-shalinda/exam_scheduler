import React from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import DatePicker from 'react-native-date-picker';
import {colors} from './../utils/theam.json';
import { Icon, Text } from 'react-native-elements';

export const SelectDateComponent = ({ visibleDate, date, setDate, setvisibleDate }: any) => {
    return (
        <Overlay isVisible={visibleDate.state} onBackdropPress={() => { setvisibleDate({state: false, index: 0}) }} overlayStyle={{ backgroundColor: colors.secondary_color }}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.main_color}}>Select a Date</Text>
            <Icon name="check-circle" color={colors.main_color} onPress={() => setvisibleDate({state: false, index: 0})}></Icon>
            </View>
            <View style={{padding: 20}}>
                <DatePicker
                    mode="date"
                    minuteInterval={30}
                    date={date}
                    onDateChange={(d)=> setDate(d, visibleDate.index)}
                    style={{backgroundColor: colors.secondary_color}}
                    textColor={colors.main_color}
                />
            </View>

        </Overlay>
    );
};