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
import { Button } from 'react-native-elements/dist/buttons/Button';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { userRoleTypes } from '../../services/user/user.interface';
import { ErrorAnimation, errorMessageType } from '../../components/error.component';
import { storeToken } from '../../services/commen/asyncStorage.service';
import { ToolBarHeader } from '../../components/Header.component';

const AllExamScreen = ({ navigation, examState, userState, a_setExams, a_deleteExam, setUsers, setToken }: any) => {
    const [loading, setloading] = React.useState(false);
    const [isError, setIsError] = React.useState<errorMessageType>({isVisible: false, message: '', onOkay: ()=>{}})

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
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Loading Exam failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }
    const onDeleteExam = async (id: number) => {
        try {
            const data = await deleteExam(id, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                a_deleteExam(id);
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Delete Exam failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }
    const logOut = () => {
        setToken(null);
        setUsers(null);
        storeToken('');
        navigation.navigate('AllExams');
    }

    return (

        <View style={{ height: '100%' }}>
            <ToolBarHeader
                title={"All Exams"} 
                setUsers={setUsers} 
                setToken={setToken}
                navigation={navigation}
                isLogoutAv={true}
                isBackAv={false}
            />
            <View style={styles.inner}>
            {(isError.isVisible && !loading) && 
                    <ErrorAnimation errorMsg={isError}/>}
                {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {examState.exams && examState.exams.length > 0 &&
                <View style={{ backgroundColor: colors.secondary_color, marginTop: '10%', flexGrow: 1, height: '10%' }}> 
                    <ScrollView >
                    {

                        (examState.exams).map((exam: IExam, index: number) => (
                            <OneExamComponent
                                key={index}
                                exam={exam}
                                onDelete={() => { onDeleteExam(exam.id) }}
                                onEdit={() => { navigation.navigate('UpdateExam', exam.id) }}
                                onClick={() => { navigation.navigate('Tab', { screen: "TimeTable", params: { id: exam.id } }, exam.id) }}
                                admin={userRoleTypes.admin === userState?.user?.role ? true: false}
                            />)
                        )
                    }
                    </ScrollView>
                </View>
                }
                {examState?.exams.length <= 0 && !loading && <View style={{ justifyContent: 'center', flexGrow: 1 }}>
                    <EmptyAnimation message={"Examinations not found"} />

                </View>}
                {userState?.user?.role === userRoleTypes.admin && <View style={{ position: 'absolute', right: 10, bottom: 10 }}>
                    <Button
                        onPress={() => { navigation.navigate('AddExam') }}
                        buttonStyle={{ backgroundColor: colors.main_color, width: 50, height: 50, borderRadius: 50 }}
                        icon={
                            <Icon name="plus" type="font-awesome-5" style={{ alignSelf: 'flex-end' }} color={colors.secondary_color} size={14}></Icon>
                        }
                    />
                </View>}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    inner: {
        // paddingTop: '20%',
        // padding: 24,
        flexGrow: 1,
        backgroundColor: colors.secondary_color,
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
    },
    setUsers: (user: IUser) => {
        dispatch(setUser(user));

    },
    setToken: (token: string) => {
        dispatch(setUserToken(token));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AllExamScreen);