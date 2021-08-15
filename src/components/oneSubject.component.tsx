import React from 'react';
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { colors } from './../utils/theam.json';


export const OneSubjectComponent = ({ subject, onClick, onEdit, onDelete }: any) => {
    
    return (
        <View style={styles.card}>
            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={onClick}>
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.main_color }}>Name: {subject.name}</Text>
                    <Text style={{ fontSize: 14, color: colors.main_color, paddingLeft: '35%' }}>Years: {subject.mainYear }{subject.repeatedYears && ","+ subject.repeatedYears}</Text>
                    <Text style={{ fontSize: 14, color: colors.main_color, paddingLeft: '45%'}}>Students: {subject.stu_count}</Text>
                </View>
                <View>
                    <Icon name='edit' onPress={onEdit}></Icon>
                    <Icon name='delete' color={colors.error_msg} onPress={onDelete}></Icon>
                </View>
            </TouchableOpacity>
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