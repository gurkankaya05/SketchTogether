import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import DrawingBoardComponent from '~/components/DrawingBoard/DrawingBoardComponent';
import { useChannel } from './hooks/useChannel';
import BottomSheetComponent from '~/components/BottomSheet/BottomSheetComponent';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ColorPickerIcon from '~/components/ColorpickerIcon/ColorPickerIcon';

export default function Page() {
  const { channel } = useLocalSearchParams();
  const [customColor, setCustomColor] = useState<string>('#000');
  const { isConnected, drawingRef, onDrawingActive, onDrawingStart } = useChannel(
    channel,
    customColor
  );
  const [isBottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Stack.Screen />
        {isConnected && (
          <DrawingBoardComponent
            ref={drawingRef}
            onStart={onDrawingStart}
            onActive={onDrawingActive}
            color={customColor}
          />
        )}
        <ColorPickerIcon onPress={() => setBottomSheetVisible(!isBottomSheetVisible)} />
        {isBottomSheetVisible && (
          <BottomSheetComponent
            isVisible={isBottomSheetVisible}
            onClose={() => setBottomSheetVisible(false)}
            onColorSelected={setCustomColor}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
}
