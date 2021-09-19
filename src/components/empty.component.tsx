import React from 'react';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';
import { Text } from 'react-native-elements';
import {colors} from './../utils/theam.json';

export const EmptyAnimation = (props: {width?: number; height?: number, message?: string}) => {
    const {width, height} = props;
    return (
        <View style={{alignItems:"center"}}>
            <LottieView
              source={require('../utils/lottieFiles/empty_blue.json')}
              autoPlay
              loop
              style={{width: width || 300, height: height || 300}}
            />
            {props.message && <Text style={{color: colors.main_color, fontWeight:'bold'}}>{props.message}</Text>}
        </View>
    );
  };