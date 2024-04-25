import { useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetComponent from '~/components/BottomSheet/BottomSheetComponent';
import ColorPickerComponent from '~/components/ColorPicker/ColorPickerComponent';
import Input from '~/components/Input/Input';

export default function Home() {
  const router = useRouter();
  const [channel, setChannel] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);
  const onJoin = useCallback(() => {
    router.navigate(`channel/${channel}`);
  }, [channel]);

  const closeKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableNativeFeedback onPress={closeKeyboard} style={[styles.container]}>
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View style={styles.inputContainer}>
            <Input
              title="Room ID"
              placeholder="Enter room id"
              keyboardType="numeric"
              onChangeText={setChannel}
            />
            <Input
              title="Name"
              placeholder="Enter your name"
              keyboardType="default"
              onChangeText={setName}
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={onJoin} activeOpacity={0.8} style={styles.button}>
              <Text allowFontScaling={false} style={styles.buttonText}>
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableNativeFeedback>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  inputContainer: {
    alignSelf: 'center',
    width: '80%',
    marginVertical: 8,
    justifyContent: 'space-around',
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#FF0075',
    alignSelf: 'center',
    width: '80%',
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
  },
});
