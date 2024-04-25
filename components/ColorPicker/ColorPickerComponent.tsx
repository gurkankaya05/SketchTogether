import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import ColorPicker, {
  Panel1,
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
  returnedResults,
} from 'reanimated-color-picker';

const ColorPickerComponent = () => {
  const onSelectColor = useCallback((c: returnedResults) => {
    console.log(c);
  }, []);

  return (
    <View>
      <ColorPicker style={{ width: '70%' }} onComplete={onSelectColor}>
        <Swatches swatchStyle={{ backgroundColor: 'blue' }} />
      </ColorPicker>
    </View>
  );
};

export default ColorPickerComponent;

const styles = StyleSheet.create({});
