import * as React from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { colors } from '../../utils/theam.json';
import { updateExam } from '../../services/exam/exam.service';
import { IExam } from '../../services/exam/exam.interface';
import { A_updateExam } from '../../redux/exam/exam.action';
import { LoadingAnimation } from '../../components/loading.component';
import { ErrorAnimation, errorMessageType } from '../../components/error.component';
import { ToolBarHeader } from '../../components/Header.component';

const EditExamScreen = ({ userState, examState, navigation, a_editExam, route }: any) => {
    const [exam, onChangeExam] = React.useState("");
    const [examError, setExamError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [examId, setExamId] = React.useState(0);
    const [isError, setIsError] = React.useState<errorMessageType>({isVisible: false, message: '', onOkay: ()=>{}})

    React.useEffect(() => {
        if(!userState.token && route?.params){
            navigation.navigate('Login');
        }else{
            const data = examState.exams.find((res: IExam) => res.id === route?.params)
            onChangeExam(data.name);
            setExamId(route.params)
        }
    }, [])

    const onEditExam = async () => {
        if (exam.length > 0) {
            setLoading(true);
            try {
                const data = await updateExam({id: examId, name: exam }, userState.token);
                setLoading(false);
                if(data.data.data){
                    a_editExam({id: examId, name: exam })
                }
                navigation.navigate('AllExams');
            } catch (error: any) {
                console.log(error.response?.data);
                
                if (error.response?.data?.message) {
                    if ((error.response.data.message).search('Exam') !== -1) {
                        setExamError(error.response.data.message);
                    }
                }
                setLoading(false);
                setIsError({isVisible: true, message: 'Edit Exam failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
            }
        }else{
            setExamError('Name cannot be empty');
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ToolBarHeader
                title={"Update Exams"} 
                // setUsers={setUsers} 
                // setToken={setToken}
                navigation={navigation}
                isLogoutAv={false}
                isBackAv={true}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                {(isError.isVisible && !loading) && 
                    <ErrorAnimation errorMsg={isError}/>}
                    {loading && <Overlay isVisible={loading} overlayStyle={{backgroundColor: colors.secondary_color}}>
                        <LoadingAnimation/>
                    </Overlay>}
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Exam Name</Text>
                        <TextInput placeholder="Name" keyboardType="email-address"
                            onChangeText={(text) => {onChangeExam(text); setExamError('')}}
                            value={exam} style={styles.textInput} />
                        {examError.length > 0 && <Text style={styles.errormessage}>{examError}</Text>}
                    </View>

                    <View >
                        <Button buttonStyle={styles.btnContainer} title="Update" onPress={() => onEditExam()} />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        paddingTop: '20%',
        padding: 24,
        flex: 1,
        backgroundColor: colors.secondary_color
        // justifyContent: "center"
    },
    textInput: {
        height: 50,
        margin: 12,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        borderColor: colors.main_color,
        color: colors.main_color,
        fontFamily: 'Cochin',
        fontSize: 16
    },
    btnContainer: {
        backgroundColor: colors.main_color,
        marginTop: 12,
        borderRadius: 50,
        width: '50%',
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginRight: 20
    },
    label: {
        fontSize: 11,
        color: colors.main_color,
        paddingLeft: 25,
        // backgroundColor: 'red',
        // marginBottom: -5
    },
    errormessage: {
        fontSize: 13,
        color: colors.error_msg,
        paddingLeft: 25
    },
    textInputScope: {
        marginBottom: 10
    }
});

const mapStateToProps = (state: any) => ({
    userState: state.user,
    examState: state.exam
})

const mapDispatchToProps = (dispatch: any) => ({
    a_editExam: (exam: IExam) => {
        dispatch(A_updateExam(exam));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(EditExamScreen);