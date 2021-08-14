import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';

export const EmptyAnimation = (props: {width?: number; height?: number, message?: string}) => {
    const {width, height} = props;
    return (
        <View style={{alignItems:"center"}}>
            <LottieView
              source={require('../utils/lottieFiles/empty.json')}
              autoPlay
              loop
              style={{width: width || 300, height: height || 300}}
            />
            {props.message && <Text>{props.message}</Text>}
        </View>
    );
  };