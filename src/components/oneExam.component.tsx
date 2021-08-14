import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import {colors} from './../utils/theam.json';


export const OneExamComponent = ({exam, onEdit, onDelete}: any) => {
    return (
        <View>
           <Text>{exam.id}</Text> 
           <Text>{exam.name}</Text> 
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        paddingTop: '20%',
        padding: 24,
        flex: 1,
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        minHeight: "100%",
    },
});