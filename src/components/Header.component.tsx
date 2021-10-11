import React from 'react';
import { Header, Icon } from "react-native-elements";
import { storeToken } from '../services/commen/asyncStorage.service';
import { colors } from './../utils/theam.json';


export const ToolBarHeader = ({title, setUsers, setToken, navigation, isLogoutAv, isBackAv }: {title: string, setUsers?: Function, setToken?: Function, navigation: any, isLogoutAv: boolean, isBackAv: boolean }) => {
    const logOut = () => {
        if(setToken && setUsers){
            setToken(null);
            setUsers(null);
            storeToken('');
            navigation.navigate('AllExams');
        }else{
            console.log('failed');
            
        }
    }

    return (
        <Header
            leftComponent={isBackAv ? <Icon type="font-awesome-5" name="angle-left" size={23} color={colors.secondary_color} onPress={() => { navigation.goBack() }}></Icon> : <></>}
            centerComponent={{ text: title, style: { color: '#fff', fontSize: 20, textAlign: 'left' } }}
            rightComponent={isLogoutAv ? <Icon type="font-awesome-5" name="sign-out-alt" size={18} color={colors.secondary_color} onPress={() => { logOut() }}></Icon> : <></>}
            backgroundColor={colors.dark_main_color}
            containerStyle={{
                backgroundColor: colors.main_color
            }}
        />
    )
}
