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
import { useEffect } from 'react';
import { EmptyAnimation } from '../../components/empty.component';
import { LoadingAnimation } from '../../components/loading.component';
import { deleteSubject, loadSubjects } from '../../services/subject/subject.service';
import { ISubject } from '../../services/subject/subject.interface';
import { OneSubjectComponent } from '../../components/oneSubject.component';

const AllSubjecScreen = ({ navigation, userState, route}: any) => {
    const [loading, setloading] = React.useState(false);
    const [examId, setExamId] = React.useState(route?.params);
    const [subjects, setSubjects] = React.useState([]);

    useEffect(() => {
        getAllSubjects();
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
        } catch (error) {
            console.log(error.response.data);
            setloading(false);
        }
    }
    const onDeleteSubject = async (id: number) => {
        try {
            const data = await deleteSubject(id, userState.token);
            console.log(data.data.data);
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

        <View>
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'All Subjects', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <View style={styles.inner}>
                {loading && <Overlay isVisible={loading} overlayStyle={{backgroundColor: colors.secondary_color}}>
                    <LoadingAnimation width={100} height={100} />
                </Overlay>}
                {subjects && subjects.length > 0 && <ScrollView style={{ backgroundColor: colors.secondary_color, minHeight: '100%', marginTop: '10%' }}>
                    {
                        (subjects).map((_subject: ISubject) => (
                            <OneSubjectComponent 
                                key={_subject.id}
                                subject={_subject} 
                                onDelete={()=>{onDeleteSubject(_subject.id)}}
                                onEdit={()=> {navigation.navigate('UpdateSubject', _subject.id)}}    
                                onClick={()=> {navigation.navigate('Home', _subject.id)}}
                            />)
                        )
                    }
                </ScrollView>}
                {subjects.length <= 0 && !loading &&  <View style={{justifyContent: 'center', height: '100%',}}>
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
        minHeight: "100%",
    },
});

const mapStateToProps = (state: any) => ({
    userState: state.user,
    examState: state.exam,
})

const mapDispatchToProps = (dispatch: any) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(AllSubjecScreen);