import { SkPath, Skia, TouchInfo, useTouchHandler } from '@shopify/react-native-skia';
import { useCallback, useImperativeHandle, useState } from 'react';

export type DrawingBoardProps = {
  onStart: (x: number, y: number) => void;
  onActive: (x1: number, y1: number, x2: number, y2: number, color: string) => void;
  ref: React.ForwardedRef<DrawingBoardRef>;
  color: string;
};

export type DrawingBoardRef = {
  receivedStart: (x: number, y: number, user: string, color: string) => void;
  receivedActive: (x1: number, y1: number, x2: number, y2: number, user: string) => void;
};

export const useDrawingBoardComponent = ({ ref, onActive, onStart, color }: DrawingBoardProps) => {
  const [paths, setPaths] = useState<{ paths: SkPath; color: string }[]>([]);
  const [otherPaths, setOtherPaths] = useState<{ paths: SkPath[]; user: string; color: string }[]>(
    []
  );

  useImperativeHandle(ref, () => ({
    receivedStart: onOtherDrawingStart,
    receivedActive: onOtherDrawingActive,
  }));

  const onOtherDrawingStart = (x: number, y: number, user: string, color: string) => {
    setOtherPaths((old) => {
      const userPaths = old.find((path) => path.user === user);
      if (userPaths) {
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);

        const arr = [...userPaths.paths, newPath];

        return [...old.filter((path) => path.user !== user), { paths: arr, user, color }];
      } else {
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [...old, { paths: [newPath], user, color }];
      }
    });
  };

  const onOtherDrawingActive = (x1: number, y1: number, x2: number, y2: number, user: string) => {
    setOtherPaths((currentPaths) => {
      const userPaths = currentPaths.find((path) => path.user === user);

      if (userPaths) {
        const currentPath = userPaths.paths[userPaths.paths.length - 1];
        currentPath.quadTo(x1, y1, x2, y2);
        return [
          ...currentPaths.filter((path) => path.user !== user),
          {
            user,
            color: userPaths.color,
            paths: [...userPaths.paths.slice(0, userPaths.paths.length - 1), currentPath],
          },
        ];
      } else {
        return currentPaths;
      }
    });
  };

  const onDrawingStart = useCallback(
    (touchInfo: TouchInfo) => {
      setPaths((oldPaths) => {
        const { x, y } = touchInfo;
        onStart(x, y);
        const newPath = Skia.Path.Make();
        newPath.moveTo(x, y);
        return [...oldPaths, { paths: newPath, color: color }];
      });
    },
    [color]
  );

  const onDrawingActive = useCallback((touchInfo: TouchInfo) => {
    setPaths((oldPaths) => {
      const { x, y } = touchInfo;
      const currentPath = oldPaths[oldPaths.length - 1];
      const lastPoint = currentPath.paths.getLastPt();
      const xMid = (lastPoint.x + x) / 2;
      const yMid = (lastPoint.y + y) / 2;

      onActive(lastPoint.x, lastPoint.y, xMid, yMid, color);

      currentPath.paths.quadTo(lastPoint.x, lastPoint.y, xMid, yMid);
      return [...oldPaths.slice(0, oldPaths.length - 1), currentPath];
    });
  }, []);

  const touchHandler = useTouchHandler(
    {
      onActive: onDrawingActive,
      onStart: onDrawingStart,
    },
    [onDrawingActive, onDrawingStart]
  );

  return {
    paths,
    touchHandler,
    otherPaths,
  };
};
