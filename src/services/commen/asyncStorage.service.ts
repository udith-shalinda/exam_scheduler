import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if(value){
        return value;
    }else{
        return null;
    }
  } catch (e) {
    return null;
  }
};
