
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { colors } from './../utils/theam.json';


export const OneHallComponent = ({ hall, onEdit, onDelete }: any) => {
    
    return (
        <View style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.main_color }}>{hall.name}</Text>
                    <Text style={{ fontSize: 14, color: colors.main_color, paddingLeft: '0%' }}>{new Date(hall.date).toLocaleDateString() }</Text>
                    <Text style={{ fontSize: 14, color: colors.main_color, paddingLeft: '0%'}}>{new Date(hall.start).toLocaleTimeString('en-US') + " to "+ new Date(hall.end).toLocaleTimeString('en-US')}</Text>
                </View>
                <View>
                    <Icon name='edit' onPress={onEdit}></Icon>
                    <Icon name='delete' color={colors.error_msg} onPress={onDelete}></Icon>
                </View>
            </View>
            {/* </Card> */}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        borderColor: colors.main_color,
        borderWidth: 2,
        padding: 16,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        backgroundColor: "#daf0e3",
        elevation: 3,
    }
});