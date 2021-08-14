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
import { loadExams } from '../../services/exam/exam.service';
import { A_setExams } from '../../redux/exam/exam.action';
import { EmptyAnimation } from '../../components/empty.component';

const AllExamScreen = ({  navigation, examState, useState, a_setExams }: any) => {
    const [loading, setloading] = React.useState(false);

    useEffect(() => {
        getAllExams();
    }, [])
    
    const getAllExams = async () => {
        const data = await loadExams(useState.token);
        if(data.data.data){
            a_setExams(data.data.data);
        }
    }

    return (

        <View>
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'All Exam', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {loading && <Overlay isVisible={loading} >
                        <ActivityIndicator size="large" color={colors.main_color} />
                    </Overlay>}
                    <ScrollView>
                        {
                            examState.exams && examState.exams.length > 0 ? 
                            examState.exams.map((exam: IExam) => {
                                <OneExamComponent exam={exam} onEdit={()=>{}} onDelete={()=> {}}/>
                                
                            }): <EmptyAnimation/>
                        }
                    </ScrollView>

                </View>
            </TouchableWithoutFeedback>
        </View>

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
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        minHeight: "100%",
    },
});

const mapStateToProps = (state: any) => ({
    userState: state.user,
    examState: state.exam,
})

const mapDispatchToProps = (dispatch: any) => ({
    a_setExams: (exams: IExam[]) => {
        dispatch(A_setExams(exams));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExamScreen);