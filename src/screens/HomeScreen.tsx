import * as React from 'react';
import { connect } from 'react-redux'
import { View, Text, Button, Pressable, Alert } from 'react-native';
import { IUser, setUser, updateUserLoading } from '../redux/user/user.action';
import { tailwind } from './../../tailwind';

const HomeScreen = ({ navigation, updateLoading, userState, setUsers }) => {

  React.useEffect(() => {
   if(navigation.canGoBack()){
     navigation.goBack();
   }else{
     navigation.navigate('Login')
   } 
  }, [])
  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable onPress={() => navigation.navigate('Details')}>
        <Text  style={tailwind('flex bg-red-500 text-white font-bold py-2 px-4 rounded')}>Name {userState.user? userState.user.name: ''}</Text>
      </Pressable>
      <Text>Email {userState.user? userState.user.email: ''}</Text>
      <Text>Username {userState.user? userState.user.username: ''}</Text>

     
      <Button
        color="red"
        accessibilityLabel="hello there"
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button
        title="set User"
        onPress={() => setUsers({name: 'udith', email: 'udith@tes.com', age: 23})}
      />
       <Button
        title="log User"
        onPress={() => Alert.alert(
          "Alert Title",
          "My Alert Msg",
          [
            {
              text: "Ask me later",
              onPress: () => console.log("Ask me later pressed")
            },
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        )
        }
      />
    </View>
  );
}
const mapStateToProps = state => ({
  userState: state.user
})

const mapDispatchToProps = dispatch => ({
  updateLoading: (loading:boolean)  => {
    dispatch(updateUserLoading(loading));
    // console.log('called');
  },
  setUsers: (user:IUser)  => {
    dispatch(setUser(user));
    // console.log('user',user);
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);