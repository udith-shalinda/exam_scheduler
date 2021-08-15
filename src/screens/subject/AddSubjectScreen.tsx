import * as React from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { IExam } from '../../services/exam/exam.interface';
import { A_addExam } from '../../redux/exam/exam.action';
import { LoadingAnimation } from '../../components/loading.component';
import { addSubject } from '../../services/subject/subject.service';
import { ICreateSubject } from '../../services/subject/subject.interface';

const AddSubjectScreen = ({ userState, navigation, examState, route }: any) => {
    const [subject, onChangeSubject] = React.useState<ICreateSubject>({
        name: '',
        mainYear: 1,
        repeatedYears: '',
        time: 2,
        stu_count: 50,
        examId: route?.params
    });
    const [exam, onChangeExam] = React.useState("");
    const [errorMessages, setErrorMessages] = React.useState({
        name: '',
        mainYear: '',
        repeatedYears: ''
    });
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (!userState.token) {
            navigation.navigate('Login');
        } else {
            const data = examState.exams.find((res: IExam) => res.id === route?.params)
            onChangeExam(data.name);
        }
    }, [])

    const resetErrorMessage = () => {
        setErrorMessages({
            name: '',
            mainYear: '',
            repeatedYears: ''
        })
    }


    const onAddSubject = async () => {
        if ((subject.name).length === 0) {
            setErrorMessages({
                ...errorMessages,
                name: 'name cannot be empty'
            });
            return;
        }
        if (subject.mainYear <= 0 && subject.mainYear > 4) {
            setErrorMessages({
                ...errorMessages,
                mainYear: 'Year should be between 1 to 4'
            });
            return;
        }

        setLoading(true);
        try {
            const data = await addSubject(subject, userState.token);
            setLoading(false);

            navigation.navigate('AllSubjects', subject.examId);

        } catch (error) {
            console.log(error.response?.data?.message);
            setLoading(false);

        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Add Subject', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                        <LoadingAnimation />
                    </Overlay>}
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Exam Name</Text>
                        <TextInput placeholder="Name"
                            onChangeText={(text) => { onChangeSubject({ ...subject, name: text }); resetErrorMessage() }}
                            value={subject.name} style={styles.textInput} />
                        {errorMessages.name.length > 0 && <Text style={styles.errormessage}>{errorMessages.name}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Main Year</Text>
                        <TextInput placeholder="Year" keyboardType="number-pad"
                            onChangeText={(text) => { onChangeSubject({ ...subject, mainYear: +text }); resetErrorMessage() }}
                            value={(subject.mainYear).toString()} style={styles.textInput} />
                        {errorMessages.mainYear.length > 0 && <Text style={styles.errormessage}>{errorMessages.mainYear}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Repeated Years</Text>
                        <TextInput placeholder="Repeated Years like 2,3"
                            onChangeText={(text) => { onChangeSubject({ ...subject, repeatedYears: text }); resetErrorMessage() }}
                            value={subject.repeatedYears} style={styles.textInput} />
                        {errorMessages.repeatedYears.length > 0 && <Text style={styles.errormessage}>{errorMessages.repeatedYears}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Student Count</Text>
                        <TextInput placeholder="student count" keyboardType="numeric"
                            onChangeText={(text) => { onChangeSubject({ ...subject, stu_count: +text }); resetErrorMessage() }}
                            value={(subject.stu_count).toString()} style={styles.textInput} />
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Exam Name</Text>
                        <TextInput placeholder="Exam name"
                            editable={false}
                            value={exam} style={styles.textInput} />
                    </View>
                    <View style={styles.btnContainer}>
                        <Button title="Add" onPress={() => onAddSubject()} />
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
        paddingTop: 5,
        paddingBottom: 5
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
    a_addExam: (exam: IExam) => {
        dispatch(A_addExam(exam));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddSubjectScreen);