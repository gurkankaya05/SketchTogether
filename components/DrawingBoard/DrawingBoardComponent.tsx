import { Canvas, Path } from '@shopify/react-native-skia';
import React, { Fragment, forwardRef } from 'react';
import {
  DrawingBoardProps,
  DrawingBoardRef,
  useDrawingBoardComponent,
} from './hooks/useDrawingBoardComponent';

const DrawingBoardComponent = forwardRef<DrawingBoardRef, DrawingBoardProps>(
  ({ onStart, onActive }: DrawingBoardProps, ref) => {
    const { paths, touchHandler, otherPaths } = useDrawingBoardComponent({
      ref,
      onActive,
      onStart,
    });

    return (
      <Canvas style={{ flex: 1 }} onTouch={touchHandler}>
        {paths.map((path, index) => (
          <Path key={index} path={path} color={'black'} style={'stroke'} strokeWidth={2} />
        ))}
        {otherPaths.map((info, index) => (
          <Fragment key={`${info.user}-${index}`}>
            {info.paths.map((path, i2) => (
              <Path key={i2} path={path} color={info.color} style={'stroke'} strokeWidth={2} />
            ))}
          </Fragment>
        ))}
      </Canvas>
    );
  }
);

export default DrawingBoardComponent;
