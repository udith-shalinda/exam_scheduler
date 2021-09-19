import * as React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import { IUser, setUser, updateUserLoading } from '../redux/user/user.action';
import { colors } from './../utils/theam.json';
import LottieView from 'lottie-react-native';
import { Text } from 'react-native-elements';


const HomeScreen = ({ navigation, updateLoading, userState, setUsers }: any) => {


  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(navigation.canGoBack());
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('Login')
        }
      }, 2000);
    });
    return unsubscribe;
  }, [navigation]);



  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main_color }}>
      <LottieView
        source={require('../utils/lottieFiles/init_schedular.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 25, color: colors.secondary_color, fontWeight: 'bold' }}>Exam Scheduler</Text>
    </View>
  );
}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);