import * as React from 'react';
import { connect } from 'react-redux'
import { IUser, setUser, setUserToken, updateUserLoading } from '../../redux/user/user.action';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard, Image, BackHandler
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { login, whoAmI } from '../../services/user/user.service';
import { LoadingAnimation } from '../../components/loading.component';
import { getToken, storeToken } from '../../services/commen/asyncStorage.service';

const LoginScreen = ({ userState, navigation, setUsers, setToken }: any) => {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [PasswordError, setPasswordError] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        loadUserFromToken();
        const unsubscribe = BackHandler.addEventListener('hardwareBackPress', () => {
            return true;
        });
        return () => {
            unsubscribe
        }
    }, [])


    const loadUserFromToken = async () => {
        setLoading(true);
        try {
            const token = await getToken();
            if (!token) {
                setLoading(false);
                return;
            }
            const data = await whoAmI(token)
            // console.log(data.data.user);
            setLoading(false);
            setToken(token);
            setUsers(data.data.user)
            navigation.navigate('AllExams');
        } catch (error: any) {
            setLoading(false);
        }
    }

    const onLoginPress = async () => {
        if (email.length > 0 && password.length > 0) {
            setLoading(true);
            try {
                const data = await login({ email, password });
                // console.log(data.data.data.user);
                setLoading(false);
                setToken(data.data.data.token);
                storeToken(data.data.data.token);
                setUsers(data.data.data.user)
                navigation.navigate('AllExams');

            } catch (error: any) {
                if (error.response?.data?.message) {
                    if ((error.response.data.message).search('Email') !== -1) {
                        setEmailError(error.response.data.message);
                    }
                    if ((error.response.data.message).search('Password') !== -1) {
                        setPasswordError(error.response.data.message);
                    }
                }
                setLoading(false);

            }
        }
    }

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Login', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {loading && <Overlay isVisible={loading} overlayStyle={{ backgroundColor: colors.secondary_color }}>
                        <LoadingAnimation width={100} height={100} />
                    </Overlay>}
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput placeholder="Email" keyboardType="email-address"
                            onChangeText={onChangeEmail}
                            value={email} style={styles.textInput} />
                        {emailError.length > 0 && <Text style={styles.errormessage}>{emailError}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput onChangeText={onChangePassword}
                            value={password} placeholder="Password" style={styles.textInput} secureTextEntry={true} inlineImageLeft="google" />
                        {PasswordError.length > 0 && <Text style={styles.errormessage} >{PasswordError}</Text>}
                    </View>

                    <View>
                        <Button buttonStyle={styles.btnContainer} title="Login" onPress={() => onLoginPress()} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 25, alignSelf: 'center' }}>
                        <Text style={{ color: colors.main_color }}>Or Login with
                        </Text>
                        <Image source={require('./../../assets/logo/google.png')} style={{ alignSelf: 'center', marginLeft: 10 }} />
                    </View>
                    <Text style={{ color: colors.main_color, marginTop: 45, textAlign: 'right', marginRight: 25 }}
                        onPress={() => { navigation.navigate('SignUp'); }}
                    >Create an account
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

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
        backgroundColor: colors.secondary_color
        // justifyContent: "center"
    },
    textInput: {
        height: 50,
        margin: 12,
        marginTop: 0,
        marginBottom: 0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 12,
        borderColor: colors.main_color,
        color: colors.main_color,
        fontFamily: 'Cochin',
        fontSize: 16
    },
    btnContainer: {
        backgroundColor: colors.main_color,
        marginTop: 12,
        borderRadius: 50,
        width: '50%',
        alignSelf: 'center',
        paddingHorizontal: 15,
        marginRight: 20
    },
    label: {
        fontSize: 11,
        color: colors.main_color,
        paddingLeft: 25,
        // backgroundColor: 'red',
        // marginBottom: -5
    },
    errormessage: {
        fontSize: 13,
        color: colors.error_msg,
        paddingLeft: 25
    },
    textInputScope: {
        marginBottom: 10
    }
});

const mapStateToProps = (state: any) => ({
    userState: state.user
})

const mapDispatchToProps = (dispatch: any) => ({
    updateLoading: (loading: boolean) => {
        dispatch(updateUserLoading(loading));
        // console.log('called');
    },
    setUsers: (user: IUser) => {
        dispatch(setUser(user));

    },
    setToken: (token: string) => {
        dispatch(setUserToken(token));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);