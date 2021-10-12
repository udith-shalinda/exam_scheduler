import * as React from 'react';
import { connect } from 'react-redux'
import {
    View, StyleSheet, Text,
} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { EmptyAnimation } from '../../components/empty.component';
import { LoadingAnimation } from '../../components/loading.component';
import { ISubject } from '../../services/subject/subject.interface';
import { IExam } from '../../services/exam/exam.interface';
import { deleteHall, loadHalls } from '../../services/hall/hall.service';
import { OneHallComponent } from '../../components/onehall.component';
import { ITimeSlot } from '../../services/hall/hall.interface';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { userRoleTypes } from '../../services/user/user.interface';
import { ErrorAnimation, errorMessageType } from '../../components/error.component';
import { ToolBarHeader } from '../../components/Header.component';

const AllTimeSlotsScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params.id);
    const [exam, setExam] = React.useState('');
    const [timeSlots, settimeSlots] = React.useState([]);
    const [isError, setIsError] = React.useState<errorMessageType>({isVisible: false, message: '', onOkay: ()=>{}})

    useEffect(() => {
        const data = examState.exams.find((res: IExam) => res.id === route?.params.id)
        setExam(data.name);
        const unsubscribe = navigation.addListener('focus', () => {
            getAllTimeSlots();
          });
          return unsubscribe;
    }, [])

    const getAllTimeSlots = async () => {
        setloading(true);
        try {
            const data = await loadHalls(examId, userState.token);
            // console.log(data.data.data[0]);
            if (data.data.data) {
                settimeSlots(data.data.data);
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Loading TimeSlot failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }
    const onDeleteSubject = async (id: number) => {
        try {
            setloading(true);
            const data = await deleteHall(id, userState.token);
            // console.log(data.data.data[0]);
            if (data.data.data) {
                // a_deleteSubject(id);
                settimeSlots(timeSlots.filter((time: ITimeSlot) => time.hall_id !== id));
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Delete TimeSlot failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }

    return (

        <View style={{ height: '100%', backgroundColor: colors.secondary_color }}>
            <ToolBarHeader
                title={"All Time Slots"} 
                // setUsers={setUsers} 
                // setToken={setToken}
                navigation={navigation}
                isLogoutAv={false}
                isBackAv={true}
            />
            <View style={styles.inners}>
                {(isError.isVisible && !loading) && 
                    <ErrorAnimation errorMsg={isError}/>}
                {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {exam.length > 0 && <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.main_color, marginLeft: 25, marginTop: 20 }}> {'Exam: ' + exam}</Text>}
                {timeSlots && timeSlots.length > 0 && 
                <ScrollView style={{ backgroundColor: colors.secondary_color, marginTop: '1%', height: '60%' }}>
                    {
                        (timeSlots).map((_timeSlot: ITimeSlot, index: number) => (
                            <OneHallComponent
                                key={index}
                                hall={_timeSlot}
                                onDelete={() => { onDeleteSubject(_timeSlot.hall_id) }}
                                onEdit={() => { navigation.navigate('UpdateTimeSlot', { timeSlot: _timeSlot, examId }) }}
                                admin={userRoleTypes.admin === userState.user.role ? true : false}
                            />)
                        )
                    }
                </ScrollView>}
                {timeSlots.length <= 0 && !loading && <View style={{ justifyContent: 'center', flexGrow: 1 }}>
                    <EmptyAnimation message={"timeSlots not found"} />
                </View>}
            </View>
            {userState?.user?.role === userRoleTypes.admin && <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'flex-end', right: 10, height: '100%', bottom: 10 }}>
                <Button
                    onPress={() => { navigation.navigate('AddTimeSlots', examId) }}
                    buttonStyle={{ backgroundColor: colors.main_color, width: 50, height: 50, borderRadius: 50 }}
                    icon={
                        <Icon name="plus" type="font-awesome-5" style={{ alignSelf: 'flex-end' }} color={colors.secondary_color} size={14}></Icon>
                    }
                />
            </View>}
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    inners: {
        // paddingTop: '20%',
        // padding: 24,
        flexGrow: 1,
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        // height: "90%",
    },
    btnContainer: {
        backgroundColor: colors.main_color,
        marginTop: 5,
        borderRadius: 50,
        // width: '50%',
        alignSelf: 'flex-end',
        paddingHorizontal: 15,
        marginRight: 20
    },
});

const mapStateToProps = (state: any) => ({
    userState: state.user,
    examState: state.exam,
})

const mapDispatchToProps = (dispatch: any) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(AllTimeSlotsScreen);