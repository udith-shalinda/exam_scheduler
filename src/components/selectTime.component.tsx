import React, { useState } from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements/dist/overlay/Overlay';
import DatePicker from 'react-native-date-picker';
import { colors } from './../utils/theam.json';
import { Icon, Text } from 'react-native-elements';

export const SelectTimeComponent = ({ visibleTime, time, setTime, setvisibleTime }: any) => {
    const [timeState, settimeState] = useState<{start: Date, end: Date}>(time)
    return (
        <Overlay isVisible={visibleTime.state} onBackdropPress={() => { setvisibleTime({ state: false, dateId: 0, timeId: 0 }) }} overlayStyle={{ backgroundColor: colors.secondary_color }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: colors.main_color }}>Select a Date</Text>
                <Icon name="check-circle" color={colors.main_color} onPress={() => setvisibleTime({ state: false, dateId: 0, timeId: 0 })}></Icon>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <DatePicker
                    mode="time"
                    minuteInterval={30}
                    date={timeState.start}
                    onDateChange={(d) => {setTime({ start: d, end: timeState.end }, visibleTime.dateId, visibleTime.timeId), settimeState({ start: d, end: timeState.end })}}
                    style={{ backgroundColor: colors.secondary_color }}
                    textColor={colors.main_color}
                />
                <DatePicker
                    mode="time"
                    minuteInterval={30}
                    date={timeState.end}
                    onDateChange={(d) => {setTime({ start: timeState.start, end: d }, visibleTime.dateId, visibleTime.timeId); settimeState({ start: timeState.start, end: d })}}
                    style={{ backgroundColor: colors.secondary_color }}
                    textColor={colors.main_color}
                />
            </View>
        </Overlay>
    );
};