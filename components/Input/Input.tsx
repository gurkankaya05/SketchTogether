import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { memo } from 'react';

type InputProps = {
  placeholder: string;
  title: string;
  keyboardType: KeyboardTypeOptions;
  onChangeText: (value: string) => void;
};
const Input = (props: InputProps) => {
  return (
    <View style={{ marginTop: 12 }}>
      <Text allowFontScaling={false} style={styles.title}>
        {props.title}
      </Text>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default memo(Input);

const styles = StyleSheet.create({
  title: { color: 'gray', fontSize: 16, padding: 8 },

  input: {
    alignSelf: 'center',
    borderWidth: 2,
    width: '100%',
    padding: 16,
    borderColor: '#efefef',
    borderRadius: 24,
  },
});
