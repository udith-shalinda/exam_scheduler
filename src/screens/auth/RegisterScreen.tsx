import * as React from 'react';
import { connect } from 'react-redux'
import { IUser, setUser, setUserToken, updateUserLoading } from '../../redux/user/user.action';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator
} from 'react-native';
import { Header, Overlay } from 'react-native-elements';
import { colors } from './../../utils/theam.json';
import { register } from '../../services/user/user.service';

const RegisterScreen = ({ userState, navigation, setUsers, setToken }: any) => {
    const [email, onChangeEmail] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState('');
    const [confirmpassword, onChangeconfirmpassword] = React.useState('');
    const [errorMessages, setErrorMessage] = React.useState({
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loading, setLoading] = React.useState(false);

    const onSignUpPress = async () => {
        if (password !== confirmpassword) {
            setErrorMessage(
                {
                    ...errorMessages,
                    password: 'password and confirm password is not the same',
                    confirmPassword: 'password and confirm password is not the same'
                });
            return;
        } else if (username.length < 3) {
            setErrorMessage(
                {
                    ...errorMessages,
                    userName: 'username should be longer than 3 letters',
                });
            return;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(email).toLowerCase())) {
            setErrorMessage(
                {
                    ...errorMessages,
                    email: 'Invalid email',
                });
            return;
        }
        setLoading(true);
        try {
            const dataset = {
                email,
                username,
                password
            }
            const result = await register(dataset);
            console.log(result.data.data);
            setLoading(false);
            // navigation.navigate('Home');
        } catch (error) {
            if (error.response?.data?.message) {
                if ((error.response.data.message).search('Email') !== -1) {
                    setErrorMessage(
                        {
                            ...errorMessages,
                            email: error.response.data.message
                        });
                } else if ((error.response.data.message).search('Password') !== -1) {
                    setErrorMessage(
                        {
                            ...errorMessages,
                            password: error.response.data.message
                        });
                } else if ((error.response.data.message).search('Username') !== -1) {
                    setErrorMessage(
                        {
                            ...errorMessages,
                            userName: error.response.data.message
                        });
                }

            }
            setLoading(false);
        }
    }
    const clearErrorMessages = () => {
        setErrorMessage({
            userName: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
            keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
        >
            <Header
                // leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' } }}
                centerComponent={{ text: 'Register', style: { color: '#fff', fontSize: 23, textAlign: 'left' } }}
                // rightComponent={{ icon: 'home', color: '#fff' }}
                backgroundColor={colors.main_color}
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    {loading && <Overlay isVisible={loading} >
                        <ActivityIndicator size="large" color={colors.main_color} />
                    </Overlay>}
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>username</Text>
                        <TextInput placeholder="username"
                            onChangeText={text => { onChangeUsername(text); clearErrorMessages(); }}
                            value={username} style={styles.textInput} />
                        {errorMessages?.userName?.length > 0 && <Text style={styles.errormessage}>{errorMessages?.userName}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput placeholder="Email" keyboardType="email-address"
                            onChangeText={text => { onChangeEmail(text); clearErrorMessages(); }}
                            value={email} style={styles.textInput} />
                        {errorMessages.email.length > 0 && <Text style={styles.errormessage}>{errorMessages.email}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput onChangeText={text => { onChangePassword(text); clearErrorMessages(); }}
                            value={password} placeholder="Password" style={styles.textInput} secureTextEntry={true} inlineImageLeft="google" />
                        {errorMessages.password.length > 0 && <Text style={styles.errormessage} >{errorMessages.password}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Confirm Password</Text>
                        <TextInput onChangeText={text => { onChangeconfirmpassword(text); clearErrorMessages(); }}
                            value={confirmpassword} placeholder="Confirm Password" style={styles.textInput} secureTextEntry={true} inlineImageLeft="google" />
                        {errorMessages.confirmPassword.length > 0 && <Text style={styles.errormessage} >{errorMessages.confirmPassword}</Text>}
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Sign Up" onPress={() => onSignUpPress()} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 25, alignSelf: 'center' }}>
                        <Text style={{ color: colors.main_color }}>Or Sign Up with
                        </Text>
                        <Image source={require('./../../assets/logo/google.png')} style={{ alignSelf: 'center', marginLeft: 10 }} />
                    </View>
                    <Text style={{ color: colors.main_color, marginTop: 45, textAlign: 'right', marginRight: 25 }}
                    onPress={() => {navigation.navigate('Login');}}>Login with email
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        paddingTop: '15%',
        padding: 24,
        flex: 1,
        backgroundColor: colors.secondary_color,
        height: '100%'
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
        paddingTop: 5,
        paddingBottom: 5
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
        // dispatch(setUser(user));
        console.log('user', user);
    },
    setToken: (token: string) => {
        dispatch(setUserToken(token));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);