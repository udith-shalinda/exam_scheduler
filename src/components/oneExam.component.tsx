import React from 'react';
import { StyleSheet, View } from "react-native";
import { Card, Icon, Text } from "react-native-elements";
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { colors } from './../utils/theam.json';


export const OneExamComponent = ({ exam, onClick, onEdit, onDelete }: any) => {
    return (
        <View style={styles.card}>
            <TouchableWithoutFeedback style={{ flexDirection: 'row', justifyContent: 'space-between' }} onPress={onClick}>
                <View>
                    <Text style={{ fontSize: 14, color: colors.main_color }}>Id: {exam.id}</Text>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.main_color }}>Name: {exam.name}</Text>
                </View>
                <View>
                    <Icon name='edit' onPress={onEdit}></Icon>
                    <Icon name='delete' color={colors.error_msg} onPress={onDelete}></Icon>
                </View>
            </TouchableWithoutFeedback>
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