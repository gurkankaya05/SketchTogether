import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type CloseButtonProps = {
  onClose: () => void;
};
const CloseButton = (props: CloseButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.onClose}>
      <MaterialCommunityIcons name="close" size={24} />
    </TouchableOpacity>
  );
};

export default CloseButton;

const styles = StyleSheet.create({ button: { alignSelf: 'flex-end', marginEnd: 24 } });
