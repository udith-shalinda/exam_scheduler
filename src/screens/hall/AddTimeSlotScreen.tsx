import * as React from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import { Header, Icon, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { IExam } from '../../services/exam/exam.interface';
import { A_addExam } from '../../redux/exam/exam.action';
import { LoadingAnimation } from '../../components/loading.component';
import { addSubject } from '../../services/subject/subject.service';
import { ICreateSubject } from '../../services/subject/subject.interface';
import { IAv_Date, IAv_Time, IHall } from '../../services/hall/hall.interface';
import DatePicker from 'react-native-date-picker'
import { ScrollView } from 'react-native-gesture-handler';

const AddTimeSlotScreen = ({ userState, navigation, examState, route }: any) => {
    const [subject, onChangeSubject] = React.useState<IHall>({
        name: '',
        seats_count: 50,
        examId: route?.params,
        all_Av_Dates: []
    });
    const [exam, setExam] = React.useState("");
    const [errorMessages, setErrorMessages] = React.useState({
        name: '',
        seats_count: '',
    });
    const [loading, setLoading] = React.useState(false);
    const [visibleTime, setvisibleTime] = React.useState(false);
    const [visibleDate, setvisibleDate] = React.useState(false);

    const [av_dates, setAv_dates] = React.useState<IAv_Date[]>([])




    const [date, setDate] = React.useState(new Date())


    React.useEffect(() => {
        if (!userState.token) {
            navigation.navigate('Login');
        } else {
            const data = examState.exams.find((res: IExam) => res.id === route?.params)
            setExam(data.name);
        }
    }, [])

    const addNewDate = () => {
        setAv_dates([...av_dates, {
            date: new Date(),
            all_Av_Times: [{
                start: new Date(),
                end: new Date()
            }]
        }])
    }
    const deleteAv_date = (id: number) => {
        setAv_dates(av_dates.filter((av_date: IAv_Date, index: number) => index !== id));
    }
    const addnewTime = (dateId: number) => {
        setAv_dates(
            av_dates.map((av_date: IAv_Date, index: number) => {
                if (index === dateId) {
                    av_date.all_Av_Times = [...av_date.all_Av_Times, {
                        start: new Date(),
                        end: new Date()
                    }]
                }
                return av_date;
            })
        )
        // console.log(av_dates);

    }
    const deleteAv_time = (dateId: number, timeId: number) => {
        setAv_dates(av_dates.map((av_date: IAv_Date, dIndex) => {
            if (dIndex === dateId) {
                av_date.all_Av_Times = av_date.all_Av_Times.filter((av_time: IAv_Time, index: number) => index !== timeId)
            }
            return av_date;
        }));
    }

    const resetErrorMessage = () => {
        setErrorMessages({
            name: '',
            seats_count: ''
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
        if (subject.seats_count <= 0 && subject.seats_count > 4) {
            setErrorMessages({
                ...errorMessages,
                seats_count: 'Year should be between 1 to 4'
            });
            return;
        }

        setLoading(true);
        try {
            // const data = await addSubject(subject, userState.token);
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
                centerComponent={{ text: 'Add Time Slot', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView>
                    <View style={styles.inner}>
                        {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                            <LoadingAnimation />
                        </Overlay>}
                        <View style={styles.textInputScope}>
                            <Text style={styles.label}>Hall Name</Text>
                            <TextInput placeholder="Name"
                                onChangeText={(text) => { onChangeSubject({ ...subject, name: text }); resetErrorMessage() }}
                                value={subject.name} style={styles.textInput} />
                            {errorMessages.name.length > 0 && <Text style={styles.errormessage}>{errorMessages.name}</Text>}
                        </View>
                        <View style={styles.textInputScope}>
                            <Text style={styles.label}>Seats Count</Text>
                            <TextInput placeholder="Seats Count" keyboardType="number-pad"
                                onChangeText={(text) => { onChangeSubject({ ...subject, seats_count: +text }); resetErrorMessage() }}
                                value={(subject.seats_count).toString()} style={styles.textInput} />
                            {errorMessages.seats_count.length > 0 && <Text style={styles.errormessage}>{errorMessages.seats_count}</Text>}
                        </View>

                        <View style={styles.textInputScope}>
                            <Text style={styles.label}>Exam Name</Text>
                            <TextInput placeholder="Exam name"
                                editable={false}
                                value={exam} style={styles.textInput} />
                        </View>


                        {av_dates && av_dates.length > 0 &&
                            av_dates.map((av_date: IAv_Date, index: number) => {
                                return (
                                    <View style={styles.dateTime} key={index}>
                                        <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 15 }} onPress={() => { deleteAv_date(index) }}>
                                            <Icon name='minus-circle' type="font-awesome-5" color={colors.error_msg}></Icon>
                                        </TouchableOpacity>
                                        <View style={styles.textInputScope}>
                                            <Text style={styles.label}>Date</Text>
                                            <TextInput placeholder="Exam Date"
                                                onPressIn={() => setvisibleDate(true)}
                                                value={index.toString()} style={styles.textInput} />
                                        </View>
                                        {
                                            av_date.all_Av_Times.length > 0 &&
                                            av_date.all_Av_Times.map((av_time: IAv_Time, tIndex: number) => {
                                                return (
                                                    <View style={{ marginLeft: 40 }}>
                                                        <View style={{ flexDirection: 'row', alignContent: 'space-between' }}>
                                                            <View style={styles.timeInputScope}>
                                                                <Text style={styles.label}>Date</Text>
                                                                <TextInput placeholder="Exam Date"
                                                                    onPressIn={() => setvisibleDate(true)}
                                                                    value={tIndex.toString()} style={styles.textInput} />
                                                            </View>
                                                            <TouchableOpacity style={styles.timeIcon} onPress={() => { deleteAv_time(index,tIndex) }}>
                                                                <Icon name='minus-circle' type="font-awesome-5" color={colors.error_msg}></Icon>
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                )
                                            })

                                        }
                                        <TouchableOpacity onPress={() => addnewTime(index)}>
                                            <Text style={styles.addinglabel}>Add new Time slot</Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })

                        }

                        <TouchableOpacity onPress={() => addNewDate()}>
                            <Text style={styles.addinglabel}>Add new Date</Text>
                        </TouchableOpacity>


                        {/* overlays */}
                        <Overlay isVisible={visibleTime} onBackdropPress={() => { setvisibleTime(false) }}>
                            <DatePicker
                                mode="time"
                                minuteInterval={30}
                                date={date}
                                onDateChange={setDate}
                            />
                        </Overlay>
                        <Overlay isVisible={visibleDate} onBackdropPress={() => { setvisibleDate(false) }}>
                            <DatePicker
                                mode="date"
                                minuteInterval={30}
                                date={date}
                                onDateChange={setDate}
                            />

                        </Overlay>
                        <View >
                            <Button buttonStyle={styles.btnContainer} title="Add" onPress={() => onAddSubject()} />
                        </View>

                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        backgroundColor: colors.secondary_color
    },
    inner: {
        paddingTop: '10%',
        paddingHorizontal: 24,
        flex: 1,

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
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 45,
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: colors.main_color,
        marginTop: 2,
        borderRadius: 12,
        paddingHorizontal: 25,
        paddingVertical: 10,
        alignSelf: 'flex-end',
        marginRight: 15,
    },
    label: {
        fontSize: 11,
        color: colors.main_color,
        paddingLeft: 25,
        // backgroundColor: 'red',
        // marginBottom: -5
    },
    addinglabel: {
        fontSize: 13,
        color: colors.main_color,
        alignSelf: 'flex-end',
        marginRight: 15,
        fontWeight: 'bold'
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
    },
    timeInputScope: {
        width: '86%',
        marginBottom: 10
    },
    timeIcon: {
        alignSelf: 'center'
    },
    dateTime: {
        paddingVertical: 20,
        marginVertical: 10,
        marginHorizontal: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        borderColor: colors.main_color,
        color: colors.main_color,
        fontFamily: 'Cochin',
        fontSize: 16
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

export default connect(mapStateToProps, mapDispatchToProps)(AddTimeSlotScreen);