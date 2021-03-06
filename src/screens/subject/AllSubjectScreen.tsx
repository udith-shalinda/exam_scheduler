import * as React from 'react';
import { connect } from 'react-redux'
import { IUser, setUser, setUserToken, updateUserLoading } from '../../redux/user/user.action';
import {
    View, StyleSheet, Text,
    TouchableWithoutFeedback, Keyboard, ActivityIndicator,
} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { FAB, Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { EmptyAnimation } from '../../components/empty.component';
import { LoadingAnimation } from '../../components/loading.component';
import { deleteSubject, loadSubjects } from '../../services/subject/subject.service';
import { ISubject } from '../../services/subject/subject.interface';
import { OneSubjectComponent } from '../../components/oneSubject.component';
import { IExam } from '../../services/exam/exam.interface';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { userRoleTypes } from '../../services/user/user.interface';
import { ErrorAnimation, errorMessageType } from '../../components/error.component';
import { ToolBarHeader } from '../../components/Header.component';

const AllSubjecScreen = ({ navigation, userState, route, examState }: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params.id);
    const [exam, setExam] = React.useState('');
    const [subjects, setSubjects] = React.useState([]);
    const [isError, setIsError] = React.useState<errorMessageType>({isVisible: false, message: '', onOkay: ()=>{}})


    useEffect(() => {
        const data = examState.exams.find((res: IExam) => res.id === route?.params.id)
        setExam(data.name);
        getAllSubjects();
        const unsubscribe = navigation.addListener('focus', () => {
            getAllSubjects();
          });
          return unsubscribe;
    }, [])

    const getAllSubjects = async () => {
        setloading(true);
        try {
            const data = await loadSubjects(examId, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                setSubjects(data.data.data);
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Loading All Exams failed', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }
    const onDeleteSubject = async (id: number) => {
        try {
            setloading(true);
            const data = await deleteSubject(id, userState.token);
            // console.log(data.data.data);
            if (data.data.data) {
                // a_deleteSubject(id);
                setSubjects(subjects.filter((sub: ISubject) => sub.id !== id));
            }
            setloading(false);
        } catch (error: any) {
            console.log(error.response.data);
            setloading(false);
            setIsError({isVisible: true, message: 'Delete Exam failed. Please try again', onOkay: ()=> {setIsError({...error, isVisible: false})}})
        }
    }

    return (

        <View style={{ height: '100%' }}>
            <ToolBarHeader
                title={"All Subjects"} 
                // setUsers={setUsers} 
                // setToken={setToken}
                navigation={navigation}
                isLogoutAv={false}
                isBackAv={true}
            />
            <View style={styles.inner}>
                {(isError.isVisible && !loading) && 
                    <ErrorAnimation errorMsg={isError}/>}
                {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {exam.length > 0 && <Text style={{ fontSize: 22, fontWeight: 'bold', color: colors.main_color, marginLeft: 25, marginTop: 20 }}> {'Exam: ' + exam}</Text>}
                <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                    {/* <View>
                        <Button buttonStyle={styles.btnContainer} title="Add Subject" onPress={() => { navigation.navigate('AddSubject', examId) }} />
                    </View> */}
                    {/* <View >
                        <Button buttonStyle={styles.btnContainer} title="All Time Slots" onPress={() => { navigation.navigate('AllTimeSlots', examId) }} />
                    </View> */}
                </View>
                {subjects && subjects.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, marginTop: '1%' }}>
                    {
                        (subjects).map((_subject: ISubject) => (
                            <OneSubjectComponent
                                key={_subject.id}
                                subject={_subject}
                                onDelete={() => { onDeleteSubject(_subject.id) }}
                                onEdit={() => { navigation.navigate('UpdateSubject', _subject) }}
                                admin={userRoleTypes.admin === userState.user.role ? true: false}
                            />)
                        )
                    }
                </ScrollView>}
                {subjects.length <= 0 && !loading && <View style={{ justifyContent: 'center', flexGrow: 1 }}>
                    <EmptyAnimation message={"Subjects not found"} />
                </View>}
            </View>
            {userState?.user?.role === userRoleTypes.admin && <View style={{ position: 'absolute', flexDirection: 'column', justifyContent: 'flex-end', right: 10, height: '100%', bottom: 10 }}>
                <Button
                    onPress={() => { navigation.navigate('AddSubject', examId) }}
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
    inner: {
        // paddingTop: '20%',
        // padding: 24,
        flexGrow: 1,
        backgroundColor: colors.secondary_color,
        // justifyContent: "center"
        // minHeight: "70%",
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

export default connect(mapStateToProps, mapDispatchToProps)(AllSubjecScreen);