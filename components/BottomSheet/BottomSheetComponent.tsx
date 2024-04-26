import { StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import ColorPickerComponent from '../ColorPicker/ColorPickerComponent';
import CloseButton from './CloseButton';

type BottomSheetComponentProps = {
  isVisible: boolean;
  onClose: () => void;
  onColorSelected: (hex: string) => void;
};
const BottomSheetComponent = (props: BottomSheetComponentProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['30%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  useEffect(() => {
    if (props.isVisible) {
      handlePresentModalPress();
    } else {
      handleClose();
    }
  }, [props.isVisible, handlePresentModalPress, handleClose]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        props.onClose();
      }
    },
    [props.onClose]
  );

  const onColorSelected = useCallback(
    (h: string) => {
      props.onColorSelected(h);
      handleClose();
    },
    [handleClose, props.onColorSelected]
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onChange={handleSheetChanges}
      backgroundStyle={{ backgroundColor: 'white' }}>
      <BottomSheetView style={styles.contentContainer}>
        <CloseButton onClose={handleClose} />
        <ColorPickerComponent onColorSelected={onColorSelected} />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BottomSheetComponent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
