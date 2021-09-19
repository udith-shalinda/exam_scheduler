import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export const LoadingAnimation = (props: {width?: number; height?: number}) => {
    const {width, height} = props;
    return (
        <View style={{alignItems:"center"}}>
            <LottieView
              source={require('../utils/lottieFiles/loading_blue.json')}
              autoPlay
              loop
              style={{width: width || 100, height: height || 100}}
            />
        </View>
    );
  };