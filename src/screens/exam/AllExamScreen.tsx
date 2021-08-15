import * as React from 'react';
import { connect } from 'react-redux'
import { IUser, setUser, setUserToken, updateUserLoading } from '../../redux/user/user.action';
import {
    View, StyleSheet, Text,
    TouchableWithoutFeedback, Keyboard, ActivityIndicator
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { ScrollView } from 'react-native-gesture-handler';
import { IExam } from '../../services/exam/exam.interface';
import { OneExamComponent } from '../../components/oneExam.component';
import { useEffect } from 'react';
import { deleteExam, loadExams } from '../../services/exam/exam.service';
import { A_deleteExam, A_setExams } from '../../redux/exam/exam.action';
import { EmptyAnimation } from '../../components/empty.component';
import { LoadingAnimation } from '../../components/loading.component';

const AllExamScreen = ({ navigation, examState, userState, a_setExams, a_deleteExam}: any) => {
    const [loading, setloading] = React.useState(false);

    useEffect(() => {
        getAllExams();
    }, [])

    const getAllExams = async () => {
        setloading(true);
        try {
            const data = await loadExams(userState.token);
            if (data.data.data) {
                a_setExams(data.data.data);
            }
            setloading(false);
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }
    const onDeleteExam = async (id: number) => {
        try {
            const data = await deleteExam(id, userState.token);
            console.log(data.data.data);
            if (data.data.data) {
                a_deleteExam(id);
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
                centerComponent={{ text: 'All Exams', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <View style={styles.inner}>
                {loading && <Overlay isVisible={loading} overlayStyle={{backgroundColor: colors.secondary_color}}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {examState.exams && examState.exams.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, minHeight: '100%', marginTop: '10%' }}>
                    {
                        
                        (examState.exams).map((exam: IExam) => (
                            <OneExamComponent 
                                key={exam.id}
                                exam={exam} 
                                onDelete={()=>{onDeleteExam(exam.id)}}
                                onEdit={()=> {navigation.navigate('UpdateExam', exam.id)}}    
                                onClick={()=> {navigation.navigate('AllSubjects', exam.id)}}
                            />)
                        )
                    }
                </ScrollView>}
                {examState?.exams.length <= 0 && !loading && <View style={{ justifyContent: 'center', height: '100%', }}>
                    <EmptyAnimation message={"Examinations not found"} />

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
});

const mapStateToProps = (state: any) => ({
    userState: state.user,
    examState: state.exam,
})

const mapDispatchToProps = (dispatch: any) => ({
    a_setExams: (exams: IExam[]) => {
        dispatch(A_setExams(exams));
    },
    a_deleteExam: (id: number) => {
        dispatch(A_deleteExam(id));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExamScreen);