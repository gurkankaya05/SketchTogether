import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';

type ColorPickerIconProps = {
  onPress: () => void;
};
const ColorPickerIcon = (props: ColorPickerIconProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Image source={require('../../assets/colorpicker.png')} style={styles.image} />
    </TouchableOpacity>
  );
};

export default ColorPickerIcon;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 35,
    height: 35,
    borderRadius: 30,
    bottom: 80,
    right: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
