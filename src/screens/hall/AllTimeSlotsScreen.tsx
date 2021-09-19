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

const AllTimeSlotsScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params.id);
    const [exam, setExam] = React.useState('');
    const [timeSlots, settimeSlots] = React.useState([]);

    useEffect(() => {
        console.log(route);
        
        const data = examState.exams.find((res: IExam) => res.id === route?.params.id)
        setExam(data.name);
        getAllTimeSlots();
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
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }
    const onDeleteSubject = async (id: number) => {
        try {
            const data = await deleteHall(id, userState.token);
            // console.log(data.data.data[0]);
            if (data.data.data) {
                // a_deleteSubject(id);
                settimeSlots(timeSlots.filter((sub: ISubject) => sub.id !== id));
            }
            setloading(false);
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }

    return (

        <View style={{height: '100%', backgroundColor: colors.secondary_color}}>
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'All Time slots', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <View style={styles.inners}>
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
                    {timeSlots && timeSlots.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, marginTop: '1%' }}>
                        {
                            (timeSlots).map((_timeSlot: ITimeSlot, index: number) => (
                                <OneHallComponent
                                    key={index}
                                    hall={_timeSlot}
                                    onDelete={() => { onDeleteSubject(1) }}
                                    onEdit={() => { navigation.navigate('UpdateTimeSlot', {timeSlot: _timeSlot, examId }) }}
                                />)
                            )
                        }
                    </ScrollView>}
                {/* </ScrollView> */}
                {timeSlots.length <= 0 && !loading && <View style={{ justifyContent: 'center' }}>
                    <EmptyAnimation message={"timeSlots not found"} />
                </View>}
            </View>
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
        // flex: 1,
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        height: "90%",
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