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
import { deleteSubject, loadSubjects } from '../../services/subject/subject.service';
import { ISubject } from '../../services/subject/subject.interface';
import { OneSubjectComponent } from '../../components/oneSubject.component';
import { IExam } from '../../services/exam/exam.interface';
import { loadHalls } from '../../services/hall/hall.service';
import { addTimeTable, generateTimeTableFromData, getAllTimeTableByExam } from '../../services/timetable/TimeTable.service';
import { OneTimeTableComponent } from '../../components/oneTimeTable.component';
import { userRoleTypes } from '../../services/user/user.interface';
import { errorMessageType } from '../../components/error.component';
import { ToolBarHeader } from '../../components/Header.component';
import { ITimeTable } from '../../services/timetable/TimeTable.interface';

const TimeTableScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params.id);
    const [exam, setExam] = React.useState('');
    const [timeTable, settimeTable] = React.useState([])
    // To generate time table
    const [subjects, setSubjects] = React.useState<ISubject[]>([]);
    const [timeSlots, settimeSlots] = React.useState([]);
    const [timeTableGenerated, settimeTableGenerated] = React.useState(true)
    const [isError, setIsError] = React.useState<errorMessageType>({isVisible: false, message: '', onOkay: ()=>{}})

    useEffect(() => {
        const data = examState.exams.find((res: IExam) => res.id === route?.params.id)
        setExam(data.name);
        if (timeTable.length === 0 || subjects.length === 0 || timeSlots.length === 0) {
            settimeTableGenerated(false);
        }
        const unsubscribe = navigation.addListener('focus', () => {
            getTimeTable();
          });
          return unsubscribe;
    }, [])

    // useEffect(() => {
    //     if(subjects.length > 0 && timeSlots.length > 0 ){
    //         generateTimeTableFromData(subjects, timeSlots);
    //     }
    // }, [subjects, timeSlots])

    const generateTimeTable = async () => {
        setloading(true);
        if (subjects.length === 0 || timeSlots.length === 0) {
            await getAllSubjects();
            await getAllTimeSlots();
        }
        const data: any = await generateTimeTableFromData(subjects, timeSlots);
        console.log(data);
        const newTimeTable = await addTimeTable(data, userState.token); 
        console.log('newTimeTable', newTimeTable.data.data);
        settimeTable(newTimeTable.data.data);
        if(data.data.data.length > 0){
            settimeTableGenerated(true);
        }
        setloading(false);
    }

    const getTimeTable = async () => {
        setloading(true);
        const data = await getAllTimeTableByExam(examId, userState.token);
        settimeTable(data.data.data);
        if(data.data.data.length > 0){
            settimeTableGenerated(true);
        }
        setloading(false);
    }
    const getAllTimeSlots = async () => {
        // setloading(true);
        try {
            const data = await loadHalls(examId, userState.token);
            // console.log(data.data.data[0]);
            if (data.data.data) {
                console.log(data.data.data);
                settimeSlots(data.data.data);                
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
        }
    }
    const getAllSubjects = async () => {
        // setloading(true);
        try {
            const data = await loadSubjects(examId, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                console.log(data.data.data);
                setSubjects(data.data.data);
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
        }
    }

    return (

        <View style={{ height: '100%' }}>
            <ToolBarHeader
                title={"Time Table"} 
                // setUsers={setUsers} 
                // setToken={setToken}
                navigation={navigation}
                isLogoutAv={false}
                isBackAv={true}
            />
            <View style={styles.inner}>
                {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {exam.length > 0 && <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.main_color, marginLeft: 25, marginTop: 20 }}> {'Exam: ' + exam}</Text>}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <View>
                        {!timeTableGenerated && userState?.user?.role === userRoleTypes.admin && <Button buttonStyle={styles.btnContainer} title="Genarate Time Table" onPress={() => { generateTimeTable() }} />}
                    </View>
                    {/* <View >
                        <Button buttonStyle={styles.btnContainer} title="All Subjects" onPress={() => { navigation.navigate('AllSubjects', examId) }} />
                    </View> */}
                </View>
                {timeTable && timeTable.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, height: '60%', marginTop: '1%' }}>
                    {
                        (timeTable).map((_time: ISubject) => (
                            <OneTimeTableComponent
                                key={_time.id}
                                timeTable={_time}
                            />)
                        )
                    }
                </ScrollView>}
                {timeTable.length <= 0 && !loading && <View style={{ justifyContent: 'center', flexGrow: 1}}>
                    <EmptyAnimation message={"Time table not found"} />
                </View>}
            </View>
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        // flex: 1
    },
    inner: {
        // paddingTop: '20%',
        // padding: 24,
        // flex: 1,
        flexGrow: 1,
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        // minHeight: "100%",
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeTableScreen);