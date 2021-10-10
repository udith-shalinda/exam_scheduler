import React from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { Button, Overlay, Text } from 'react-native-elements';
import { colors } from '../utils/theam.json';

export interface errorMessageType {
  isVisible: boolean,
  message: string,
  onOkay: Function
}

export const ErrorAnimation = (props: {errorMsg: errorMessageType, width?: number; height?: number }) => {
  return (
    <Overlay isVisible={props.errorMsg.isVisible} overlayStyle={{ backgroundColor: colors.secondary_color }} onBackdropPress={()=> props.errorMsg.onOkay()}>
      <View style={{ alignItems: "center" }}>
        <LottieView
          source={require('../utils/lottieFiles/error.json')}
          autoPlay
          loop
          style={{ width: props.width || 300, height: props.height || 300 }}
        />
        <Text style={{ color: colors.main_color, fontWeight: 'bold' }}>{props.errorMsg.message}</Text>
        <View >
          <Button buttonStyle={styles.btnContainer} title="Okay" onPress={()=> props.errorMsg.onOkay()} />
        </View>
      </View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: colors.main_color,
    marginTop: 12,
    borderRadius: 50,
    paddingHorizontal: 15,
  }
});