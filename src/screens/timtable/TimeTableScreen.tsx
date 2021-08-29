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

const TimeTableScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params);
    const [exam, setExam] = React.useState('');
    const [timeTable, settimeTable] = React.useState([])
    // To generate time table
    const [subjects, setSubjects] = React.useState([]);
    const [timeSlots, settimeSlots] = React.useState([]);
    const [timeTableGenerated, settimeTableGenerated] = React.useState(false)



    useEffect(() => {
        const data = examState.exams.find((res: IExam) => res.id === route?.params)
        setExam(data.name);
        getTimeTable();
        if(timeTable.length ===0 && subjects.length === 0 && timeSlots.length === 0){
            settimeTableGenerated(false);
        }else{
            settimeTableGenerated(true);
        }
    }, [])
    const generateTimeTable = async  () => {
        if(subjects.length === 0 && timeSlots.length === 0){
            getAllSubjects();
            getAllTimeSlots();
        }
        // TODO generate time table
    }

    const getTimeTable = async () => {
        setloading(true);
        // TODO load time table;
        setTimeout(() => {
            setloading(false);
        }, 1000);
    }
    const getAllTimeSlots = async () => {
        setloading(true);
        try {
            const data = await loadHalls(examId, userState.token);
            // console.log(data.data.data[0]);
            if (data.data.data) {
                settimeSlots(data.data.data);
            }
            setloading(false);
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }
    const getAllSubjects = async () => {
        setloading(true);
        try {
            const data = await loadSubjects(examId, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                setSubjects(data.data.data);
            }
            setloading(false);
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }

    return (

        <View>
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Time Table', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <View style={styles.inner}>
                {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {exam.length > 0 && <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.main_color, marginLeft: 25, marginTop: 20 }}> {'Exam: ' + exam}</Text>}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    <View>
                        {!timeTableGenerated && <Button buttonStyle={styles.btnContainer} title="Genarate Time Table" onPress={() => { generateTimeTable() }} />}
                    </View>
                    <View >
                        <Button buttonStyle={styles.btnContainer} title="All Subjects" onPress={() => { navigation.navigate('AllSubjects', examId) }} />
                    </View>
                </View>
                {subjects && subjects.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, minHeight: '90%', marginTop: '1%' }}>
                    {
                        (subjects).map((_subject: ISubject) => (
                            <OneSubjectComponent
                                key={_subject.id}
                                subject={_subject}
                                onDelete={() => { }}
                                onEdit={() => { navigation.navigate('UpdateSubject', _subject) }}
                            />)
                        )
                    }
                </ScrollView>}
                {timeTable.length <= 0 && !loading && <View style={{ justifyContent: 'center', height: '60%', }}>
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
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        minHeight: "100%",
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