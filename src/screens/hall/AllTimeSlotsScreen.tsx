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
import { OneSubjectComponent } from '../../components/oneSubject.component';
import { IExam } from '../../services/exam/exam.interface';
import { deleteHall, loadHalls } from '../../services/hall/hall.service';
import { OneHallComponent } from '../../components/onehall.component';

const AllTimeSlotsScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params);
    const [exam, setExam] = React.useState('');
    const [subjects, setSubjects] = React.useState([]);

    useEffect(() => {
        const data = examState.exams.find((res: IExam) => res.id === route?.params)
        setExam(data.name);
        getAllSubjects();
    }, [])

    const getAllSubjects = async () => {
        setloading(true);
        try {
            const data = await loadHalls(examId, userState.token);
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
    const onDeleteSubject = async (id: number) => {
        try {
            const data = await deleteHall(id, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                // a_deleteSubject(id);
                setSubjects(subjects.filter((sub: ISubject) => sub.id !== id));
            }
            setloading(false);
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }

    return (

        <View style={{minHeight: '100%'}}>
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'All Time slots', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
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
                        <Button title="Add Time Slot" onPress={() => { navigation.navigate('AddTimeSlots', examId) }} buttonStyle={styles.btnContainer}/>
                    </View>
                </View>
                {/* <ScrollView> */}
                    {subjects && subjects.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, marginTop: '1%' }}>
                        {
                            (subjects).map((_subject: ISubject, index: number) => (
                                <OneHallComponent
                                    key={index}
                                    hall={_subject}
                                    onDelete={() => { onDeleteSubject(_subject.id) }}
                                    onEdit={() => { navigation.navigate('UpdateSubject', _subject) }}
                                />)
                            )
                        }
                    </ScrollView>}
                {/* </ScrollView> */}
                {subjects.length <= 0 && !loading && <View style={{ justifyContent: 'center', height: '100%', }}>
                    <EmptyAnimation message={"Subjects not found"} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AllTimeSlotsScreen);