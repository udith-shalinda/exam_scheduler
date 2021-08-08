import * as React from 'react';
import { connect } from 'react-redux'
import { IUser, setUser, updateUserLoading } from '../../redux/user/user.action';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {
    View, KeyboardAvoidingView,
    TextInput, StyleSheet, Text, Platform,
    TouchableWithoutFeedback, Keyboard, Image
} from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from './../../utils/theam.json';

const LoginScreen = ({ userState }: any) => {
    const [text, onChangeText] = React.useState("Useless Text");
    const [number, onChangeNumber] = React.useState(null);
    const [emailError, setEmailError] = React.useState('Email error');
    const [PasswordError, setPasswordError] = React.useState('');



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
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput placeholder="Email" keyboardType="email-address"
                            onChangeText={onChangeText}
                            value={text} style={styles.textInput} />
                        {emailError.length > 0 && <Text style={styles.errormessage}>{emailError}</Text>}
                    </View>
                    <View style={styles.textInputScope}>
                        <Text style={styles.label}>Password</Text>
                        <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} inlineImageLeft="google" />
                        {PasswordError.length > 0 && <Text  style={styles.errormessage} >{PasswordError}</Text>}
                    </View>

                    <View style={styles.btnContainer}>
                        <Button title="Login" onPress={() => null} />
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 25, alignSelf: 'center' }}>
                        <Text style={{ color: colors.main_color }}>Or Login with
                        </Text>
                        <Image source={require('./../../assets/logo/google.png')} style={{ alignSelf: 'center', marginLeft: 10 }} />
                    </View>
                    <Text style={{ color: colors.main_color, marginTop: 45, textAlign: 'right', marginRight: 25 }}>Create an account
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
        borderColor: '#1BB55C',
        color: '#1BB55C',
        fontFamily: 'Cochin',
        fontSize: 16
    },
    btnContainer: {
        backgroundColor: '#1BB55C',
        marginTop: 12,
        borderRadius: 20,
        width: '70%',
        alignSelf: 'center'
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

const mapStateToProps = state => ({
    userState: state.user
})

const mapDispatchToProps = dispatch => ({
    updateLoading: (loading: boolean) => {
        dispatch(updateUserLoading(loading));
        // console.log('called');
    },
    setUsers: (user: IUser) => {
        dispatch(setUser(user));
        // console.log('user',user);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);